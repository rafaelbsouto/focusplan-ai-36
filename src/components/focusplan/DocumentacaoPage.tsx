import { Link } from "@tanstack/react-router";
import {
  Brain, Cloud, Database, FileText, GitBranch, Lightbulb,
  Lock, Rocket, Server, Sparkles, Target, Users, Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function DocumentacaoPage() {
  return (
    <div className="min-h-screen bg-gradient-soft">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
              <Brain className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-base font-bold tracking-tight">FocusPlan</span>
          </Link>
          <Button asChild size="sm" className="bg-gradient-primary">
            <Link to="/dashboard">Abrir app</Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12 md:py-16">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground">
            <FileText className="h-3.5 w-3.5 text-primary" />
            Documentação do Projeto
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">FocusPlan</h1>
          <p className="mt-3 text-muted-foreground">
            Plano de estudos inteligente com apoio de Inteligência Artificial.
          </p>
        </div>

        <Section icon={Target} title="Problema identificado">
          <p>
            Estudantes universitários, concurseiros e profissionais em formação enfrentam dificuldade
            para organizar a rotina de estudos: múltiplas disciplinas, prazos sobrepostos,
            tópicos com diferentes níveis de complexidade e pouco tempo disponível.
            O resultado é procrastinação, ansiedade e baixo aproveitamento.
          </p>
        </Section>

        <Section icon={Lightbulb} title="Objetivo da solução">
          <p>
            O <strong>FocusPlan</strong> centraliza disciplinas, avaliações e disponibilidade
            do estudante e usa Inteligência Artificial para gerar automaticamente um plano
            semanal de estudos priorizado por prazo, dificuldade e carga horária —
            entregando clareza, foco e maior produtividade.
          </p>
        </Section>

        <Section icon={Users} title="Público-alvo">
          <ul className="list-disc space-y-1 pl-5">
            <li>Estudantes universitários</li>
            <li>Concurseiros e candidatos a vestibulares</li>
            <li>Profissionais em cursos de especialização ou pós-graduação</li>
            <li>Pessoas que querem organizar estudos autodidatas</li>
          </ul>
        </Section>

        <Section icon={Sparkles} title="Funcionalidades principais">
          <ul className="grid gap-2 md:grid-cols-2">
            {[
              "Cadastro de disciplinas com cor e dificuldade",
              "Cadastro de provas, atividades e entregas",
              "Disponibilidade semanal personalizada",
              "Geração automática de plano com IA",
              "Calendário semanal visual",
              "Detalhes da atividade com checklist",
              "Dashboard com indicadores em tempo real",
              "Relatórios de progresso e análise da IA",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2 rounded-lg border border-border bg-card p-3 text-sm">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {f}
              </li>
            ))}
          </ul>
        </Section>

        <Section icon={Brain} title="Uso de Inteligência Artificial">
          <p>A IA do FocusPlan aplica regras inteligentes para priorizar o estudo:</p>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            <li>Entregas próximas <strong>aumentam a prioridade</strong> da disciplina relacionada.</li>
            <li>Disciplinas marcadas como <strong>difíceis</strong> recebem mais tempo de estudo.</li>
            <li>Com pouca disponibilidade, a IA <strong>prioriza provas e entregas urgentes</strong>.</li>
            <li>Tarefas atrasadas são <strong>destacadas em vermelho</strong>.</li>
            <li>Cada recomendação inclui uma <strong>justificativa em linguagem natural</strong>.</li>
          </ul>
        </Section>

        <Section icon={Server} title="Arquitetura proposta">
          <div className="grid gap-4 md:grid-cols-2">
            <ArchCard icon={Rocket} title="Frontend" desc="React + TypeScript com TanStack Start, Tailwind CSS e shadcn/ui." />
            <ArchCard icon={Database} title="Banco de dados" desc="Lovable Cloud (Supabase) ou armazenamento local simulado para o MVP." />
            <ArchCard icon={Lock} title="Autenticação" desc="Login por e-mail e senha com sessão persistida." />
            <ArchCard icon={Brain} title="IA" desc="Motor de regras para gerar o plano de estudos e justificativas." />
            <ArchCard icon={Cloud} title="Deploy" desc="Lovable / Vercel — preview e produção com URL estável." />
            <ArchCard icon={GitBranch} title="Evolução" desc="Pronto para LLMs reais via Lovable AI Gateway." />
          </div>
        </Section>

        <Section icon={Workflow} title="Fluxo do usuário">
          <ol className="space-y-3">
            {[
              "Usuário cria conta e faz login",
              "Cadastra suas disciplinas com cor e dificuldade",
              "Cadastra avaliações (provas, atividades, projetos)",
              "Informa sua disponibilidade semanal",
              "Gera o plano de estudos com IA",
              "Acompanha o progresso no dashboard e nos relatórios",
            ].map((step, i) => (
              <li key={step} className="flex items-start gap-3 rounded-lg border border-border bg-card p-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-primary text-xs font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </Section>

        <Section icon={Cloud} title="Tecnologias utilizadas">
          <div className="flex flex-wrap gap-2">
            {["React 19", "TypeScript", "TanStack Start", "TanStack Router", "Tailwind CSS v4", "shadcn/ui", "Lucide Icons", "Recharts", "Sonner", "Vite 7"].map((t) => (
              <span key={t} className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium">{t}</span>
            ))}
          </div>
        </Section>

        <Section icon={Rocket} title="Possíveis evoluções futuras">
          <ul className="list-disc space-y-1 pl-5">
            <li>Integração com LLMs reais (OpenAI / Gemini) via Lovable AI Gateway</li>
            <li>Sincronização com Google Calendar e notificações por e-mail</li>
            <li>Recomendação de conteúdos (YouTube, artigos, exercícios)</li>
            <li>Modo Pomodoro integrado às sessões do plano</li>
            <li>Gamificação com streaks e conquistas</li>
            <li>App mobile (PWA)</li>
          </ul>
        </Section>

        <div className="mt-16 rounded-2xl bg-gradient-primary p-8 text-center text-primary-foreground shadow-elevated">
          <h3 className="text-2xl font-bold">Pronto para experimentar?</h3>
          <p className="mt-2 opacity-90">Abra o dashboard e veja a IA montar seu plano em segundos.</p>
          <Button asChild size="lg" variant="secondary" className="mt-5">
            <Link to="/dashboard">Abrir o FocusPlan</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}

function Section({
  icon: Icon, title, children,
}: { icon: typeof Brain; title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground">
          <Icon className="h-4 w-4" />
        </div>
        <h2 className="text-xl font-bold tracking-tight">{title}</h2>
      </div>
      <div className="text-sm leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

function ArchCard({
  icon: Icon, title, desc,
}: { icon: typeof Brain; title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-card">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-primary" />
        <h4 className="font-semibold text-foreground">{title}</h4>
      </div>
      <p className="mt-1.5 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}
