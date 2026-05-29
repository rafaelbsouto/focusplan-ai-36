import { createFileRoute } from "@tanstack/react-router";
import { LoginPage } from "@/components/focusplan/AuthPages";
export const Route = createFileRoute("/login")({ component: LoginPage });
