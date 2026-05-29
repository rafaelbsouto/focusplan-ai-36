import { createFileRoute } from "@tanstack/react-router";
import { ForgotPasswordPage } from "@/components/focusplan/AuthPages";
export const Route = createFileRoute("/forgot-password")({ component: ForgotPasswordPage });
