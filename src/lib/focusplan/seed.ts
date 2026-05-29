import type { Assessment, AvailabilitySlot, Discipline } from "./types";

const today = new Date();
const inDays = (n: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() + n);
  return d.toISOString();
};

export const seedDisciplines: Discipline[] = [
  {
    id: "d1",
    name: "Engenharia de Software",
    professor: "Prof. Marta Lima",
    difficulty: "dificil",
    weeklyHours: 5,
    color: "#6366F1",
  },
  {
    id: "d2",
    name: "Inteligência Artificial",
    professor: "Prof. Rafael Souza",
    difficulty: "dificil",
    weeklyHours: 6,
    color: "#8B5CF6",
  },
  {
    id: "d3",
    name: "Banco de Dados",
    professor: "Profa. Camila Reis",
    difficulty: "medio",
    weeklyHours: 4,
    color: "#10B981",
  },
  {
    id: "d4",
    name: "Apps Baseados em IA na Nuvem",
    professor: "Prof. André Costa",
    difficulty: "medio",
    weeklyHours: 4,
    color: "#0EA5E9",
  },
];

export const seedAssessments: Assessment[] = [
  {
    id: "a1",
    title: "Projeto FocusPlan",
    disciplineId: "d1",
    type: "projeto",
    dueDate: inDays(5),
    weight: 9,
    status: "em_andamento",
    notes: "Entrega final com documentação completa.",
  },
  {
    id: "a2",
    title: "Prova de IA Generativa",
    disciplineId: "d2",
    type: "prova",
    dueDate: inDays(7),
    weight: 10,
    status: "pendente",
    notes: "Conteúdo: LLMs, embeddings, RAG.",
  },
  {
    id: "a3",
    title: "Atividade de Observabilidade",
    disciplineId: "d1",
    type: "atividade",
    dueDate: inDays(2),
    weight: 5,
    status: "pendente",
  },
  {
    id: "a4",
    title: "Entrega de Arquitetura com IA",
    disciplineId: "d4",
    type: "projeto",
    dueDate: inDays(10),
    weight: 8,
    status: "pendente",
  },
];

export const seedAvailability: AvailabilitySlot[] = [
  { id: "s1", day: "segunda", start: "19:00", end: "21:00" },
  { id: "s2", day: "terca", start: "20:00", end: "22:00" },
  { id: "s3", day: "quarta", start: "18:00", end: "20:00" },
  { id: "s4", day: "quinta", start: "19:00", end: "21:00" },
  { id: "s5", day: "sexta", start: "18:00", end: "19:00" },
  { id: "s6", day: "sabado", start: "09:00", end: "12:00" },
];
