import { createFileRoute } from "@tanstack/react-router";
import { CalendarioPage } from "@/components/focusplan/CalendarioPage";
export const Route = createFileRoute("/calendario")({ component: CalendarioPage });
