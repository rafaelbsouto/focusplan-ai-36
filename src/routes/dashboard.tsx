import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage } from "@/components/focusplan/DashboardPage";
export const Route = createFileRoute("/dashboard")({ component: DashboardPage });
