export type Difficulty = "facil" | "medio" | "dificil";
export type AssessmentType = "prova" | "atividade" | "projeto" | "apresentacao";
export type AssessmentStatus = "pendente" | "em_andamento" | "concluido";
export type StudyType = "teoria" | "revisao" | "exercicio" | "simulado";
export type Priority = "baixa" | "media" | "alta";
export type Weekday =
  | "segunda"
  | "terca"
  | "quarta"
  | "quinta"
  | "sexta"
  | "sabado"
  | "domingo";

export const WEEKDAYS: { id: Weekday; label: string; short: string }[] = [
  { id: "segunda", label: "Segunda-feira", short: "Seg" },
  { id: "terca", label: "Terça-feira", short: "Ter" },
  { id: "quarta", label: "Quarta-feira", short: "Qua" },
  { id: "quinta", label: "Quinta-feira", short: "Qui" },
  { id: "sexta", label: "Sexta-feira", short: "Sex" },
  { id: "sabado", label: "Sábado", short: "Sáb" },
  { id: "domingo", label: "Domingo", short: "Dom" },
];

export interface Discipline {
  id: string;
  name: string;
  professor: string;
  difficulty: Difficulty;
  weeklyHours: number;
  color: string; // hex
}

export interface Assessment {
  id: string;
  title: string;
  disciplineId: string;
  type: AssessmentType;
  dueDate: string; // ISO
  weight: number; // 1-10
  status: AssessmentStatus;
  notes?: string;
}

export interface AvailabilitySlot {
  id: string;
  day: Weekday;
  start: string; // HH:MM
  end: string; // HH:MM
}

export interface PlanItem {
  id: string;
  day: Weekday;
  start: string;
  end: string;
  disciplineId: string;
  type: StudyType;
  priority: Priority;
  justification: string;
  done: boolean;
  objective?: string;
  content?: string;
  checklist?: { id: string; label: string; done: boolean }[];
}
