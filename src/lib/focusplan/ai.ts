import type {
  Assessment,
  AvailabilitySlot,
  Discipline,
  PlanItem,
  Priority,
  StudyType,
  Weekday,
} from "./types";

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function daysUntil(iso: string): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const due = new Date(iso);
  due.setHours(0, 0, 0, 0);
  return Math.ceil((due.getTime() - now.getTime()) / 86400000);
}

function minutesBetween(start: string, end: string) {
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  return eh * 60 + em - (sh * 60 + sm);
}

function addMinutes(time: string, mins: number) {
  const [h, m] = time.split(":").map(Number);
  const total = h * 60 + m + mins;
  const nh = Math.floor(total / 60);
  const nm = total % 60;
  return `${String(nh).padStart(2, "0")}:${String(nm).padStart(2, "0")}`;
}

interface ScoredDiscipline {
  discipline: Discipline;
  score: number;
  nextAssessment?: Assessment;
  priority: Priority;
  type: StudyType;
  justification: string;
}

function scoreDisciplines(
  disciplines: Discipline[],
  assessments: Assessment[],
): ScoredDiscipline[] {
  return disciplines.map((d) => {
    const pending = assessments
      .filter((a) => a.disciplineId === d.id && a.status !== "concluido")
      .sort((a, b) => daysUntil(a.dueDate) - daysUntil(b.dueDate));
    const next = pending[0];
    const difficultyBoost = d.difficulty === "dificil" ? 3 : d.difficulty === "medio" ? 1.5 : 0.5;
    let score = d.weeklyHours + difficultyBoost;
    let priority: Priority = "media";
    let type: StudyType = "teoria";
    let justification = `Disciplina de carga ${d.weeklyHours}h semanais e dificuldade ${d.difficulty}.`;

    if (next) {
      const days = daysUntil(next.dueDate);
      score += Math.max(0, 14 - days) * 1.5 + next.weight * 0.5;
      if (days <= 3) {
        priority = "alta";
        type = "revisao";
        justification = `Entrega "${next.title}" em ${days} dia(s) — priorize revisão teórica e exercícios.`;
      } else if (days <= 7) {
        priority = "alta";
        type = "exercicio";
        justification = `"${next.title}" se aproxima (${days} dias). Foque em prática dirigida.`;
      } else {
        priority = "media";
        type = "teoria";
        justification = `"${next.title}" em ${days} dias. Construa base teórica sólida agora.`;
      }
      if (d.difficulty === "dificil") {
        justification += " Tema de alta complexidade requer tempo extra.";
      }
    } else if (d.difficulty === "dificil") {
      priority = "media";
      type = "teoria";
    } else {
      priority = "baixa";
    }

    return { discipline: d, score, nextAssessment: next, priority, type, justification };
  });
}

export function generatePlan(
  disciplines: Discipline[],
  assessments: Assessment[],
  availability: AvailabilitySlot[],
): PlanItem[] {
  if (disciplines.length === 0 || availability.length === 0) return [];

  const scored = scoreDisciplines(disciplines, assessments).sort((a, b) => b.score - a.score);
  const items: PlanItem[] = [];

  const orderedSlots = [...availability].sort((a, b) => {
    const order: Weekday[] = ["segunda", "terca", "quarta", "quinta", "sexta", "sabado", "domingo"];
    return order.indexOf(a.day) - order.indexOf(b.day);
  });

  let sIdx = 0;
  for (const slot of orderedSlots) {
    const total = minutesBetween(slot.start, slot.end);
    let cursor = slot.start;
    let remaining = total;
    while (remaining >= 45) {
      const block = Math.min(remaining, remaining >= 90 ? 90 : 60);
      const pick = scored[sIdx % scored.length];
      sIdx++;
      const end = addMinutes(cursor, block);
      const checklist = [
        { id: uid(), label: "Ler material de apoio", done: false },
        { id: uid(), label: "Fazer resumo dos pontos-chave", done: false },
        { id: uid(), label: "Resolver exercícios", done: false },
        { id: uid(), label: "Revisar pontos difíceis", done: false },
      ];
      items.push({
        id: uid(),
        day: slot.day,
        start: cursor,
        end,
        disciplineId: pick.discipline.id,
        type: pick.type,
        priority: pick.priority,
        justification: pick.justification,
        done: false,
        objective: `Avançar em ${pick.discipline.name} com foco em ${pick.type}.`,
        content: pick.nextAssessment
          ? `Conteúdo voltado para ${pick.nextAssessment.title}.`
          : `Conteúdo base de ${pick.discipline.name}.`,
        checklist,
      });
      cursor = end;
      remaining -= block;
    }
  }
  return items;
}

export function weeklySuggestion(
  disciplines: Discipline[],
  assessments: Assessment[],
): string {
  const pending = assessments
    .filter((a) => a.status !== "concluido")
    .sort((a, b) => daysUntil(a.dueDate) - daysUntil(b.dueDate));
  if (pending.length === 0) return "Sem entregas próximas. Use a semana para revisar disciplinas difíceis.";
  const next = pending[0];
  const disc = disciplines.find((d) => d.id === next.disciplineId);
  const days = daysUntil(next.dueDate);
  return `Você tem ${next.type === "prova" ? "uma prova" : "uma entrega"} de ${disc?.name ?? "uma disciplina"} em ${days} dia(s). Recomendamos priorizar ${days <= 3 ? "revisão teórica e exercícios práticos" : "construção da base teórica e leitura aprofundada"} nos próximos dias.`;
}
