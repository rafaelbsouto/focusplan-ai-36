import { createFileRoute } from "@tanstack/react-router";
import { DisciplinasPage } from "@/components/focusplan/DisciplinasPage";
export const Route = createFileRoute("/disciplinas")({ component: DisciplinasPage });
