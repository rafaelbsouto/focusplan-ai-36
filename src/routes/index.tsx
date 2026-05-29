import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/focusplan/LandingPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FocusPlan — Plano de estudos inteligente com IA" },
      {
        name: "description",
        content:
          "Organize suas disciplinas, provas e horários. A IA monta seu plano semanal com prioridade e justificativa.",
      },
    ],
  }),
  component: LandingPage,
});
