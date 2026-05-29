import { createFileRoute } from "@tanstack/react-router";
import { SignupPage } from "@/components/focusplan/AuthPages";
export const Route = createFileRoute("/signup")({ component: SignupPage });
