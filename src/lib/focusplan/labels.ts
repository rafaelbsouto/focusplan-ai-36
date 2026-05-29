import type { AssessmentStatus, AssessmentType, Difficulty, Priority, StudyType, Weekday } from "./types";

export const difficultyLabel: Record<Difficulty, string> = {
  facil: "Fácil",
  medio: "Médio",
  dificil: "Difícil",
};

export const assessmentTypeLabel: Record<AssessmentType, string> = {
  prova: "Prova",
  atividade: "Atividade",
  projeto: "Projeto",
  apresentacao: "Apresentação",
};

export const statusLabel: Record<AssessmentStatus, string> = {
  pendente: "Pendente",
  em_andamento: "Em andamento",
  concluido: "Concluído",
};

export const studyTypeLabel: Record<StudyType, string> = {
  teoria: "Teoria",
  revisao: "Revisão",
  exercicio: "Exercício",
  simulado: "Simulado",
};

export const priorityLabel: Record<Priority, string> = {
  baixa: "Baixa",
  media: "Média",
  alta: "Alta",
};

export const priorityClass: Record<Priority, string> = {
  alta: "bg-destructive/10 text-destructive border-destructive/20",
  media: "bg-warning/10 text-warning-foreground border-warning/30",
  baixa: "bg-success/10 text-success border-success/30",
};

export const statusClass: Record<AssessmentStatus, string> = {
  pendente: "bg-muted text-muted-foreground border-border",
  em_andamento: "bg-primary/10 text-primary border-primary/20",
  concluido: "bg-success/10 text-success border-success/30",
};

export const weekdayLabel: Record<Weekday, string> = {
  segunda: "Segunda-feira",
  terca: "Terça-feira",
  quarta: "Quarta-feira",
  quinta: "Quinta-feira",
  sexta: "Sexta-feira",
  sabado: "Sábado",
  domingo: "Domingo",
};

export const weekdayOrder: Weekday[] = [
  "segunda", "terca", "quarta", "quinta", "sexta", "sabado", "domingo",
];

export function daysUntil(iso: string): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const due = new Date(iso);
  due.setHours(0, 0, 0, 0);
  return Math.ceil((due.getTime() - now.getTime()) / 86400000);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function todayWeekday(): Weekday {
  const map: Weekday[] = ["domingo", "segunda", "terca", "quarta", "quinta", "sexta", "sabado"];
  return map[new Date().getDay()];
}
