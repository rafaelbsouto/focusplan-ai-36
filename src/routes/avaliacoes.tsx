import { createFileRoute } from "@tanstack/react-router";
import { AvaliacoesPage } from "@/components/focusplan/AvaliacoesPage";
export const Route = createFileRoute("/avaliacoes")({ component: AvaliacoesPage });
