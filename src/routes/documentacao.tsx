import { createFileRoute } from "@tanstack/react-router";
import { DocumentacaoPage } from "@/components/focusplan/DocumentacaoPage";
export const Route = createFileRoute("/documentacao")({
  head: () => ({
    meta: [
      { title: "Documentação — FocusPlan" },
      { name: "description", content: "Documentação completa do FocusPlan: problema, solução, arquitetura, fluxo do usuário e tecnologias." },
    ],
  }),
  component: DocumentacaoPage,
});
