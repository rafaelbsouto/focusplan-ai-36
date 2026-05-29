import { Link } from "@tanstack/react-router";
import {
  Brain,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
              <Brain className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight">FocusPlan</span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#como-funciona" className="hover:text-foreground">Como funciona</a>
            <a href="#beneficios" className="hover:text-foreground">Benefícios</a>
            <Link to="/documentacao" className="hover:text-foreground">Documentação</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link to="/login">Entrar</Link>
            </Button>
            <Button asChild size="sm" className="bg-gradient-primary shadow-glow">
              <Link to="/signup">Começar grátis</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-20 md:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Powered by IA
            </div>
            <h1 className="mt-6 text-balance text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              Transforme sua rotina de estudos em um{" "}
              <span className="text-gradient">plano inteligente com IA</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-base text-muted-foreground md:text-lg">
              Cadastre suas disciplinas, informe seus prazos e deixe o FocusPlan organizar sua
              semana de estudos com mais clareza, foco e produtividade.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="bg-gradient-primary shadow-glow">
                <Link to="/signup">Começar agora</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#como-funciona">Ver como funciona</a>
              </Button>
            </div>
          </div>

          {/* Preview card */}
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="rounded-3xl border border-border/60 bg-card/80 p-2 shadow-elevated backdrop-blur">
              <div className="overflow-hidden rounded-2xl border border-border/60 bg-gradient-soft">
                <div className="grid gap-4 p-6 md:grid-cols-3">
                  {[
                    { icon: Target, label: "Disciplinas", value: "4" },
                    { icon: Calendar, label: "Provas próximas", value: "3" },
                    { icon: Clock, label: "Horas planejadas", value: "12h" },
                  ].map((m) => (
                    <div key={m.label} className="rounded-xl border border-border/60 bg-card p-4 shadow-card">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                          <m.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-2xl font-semibold">{m.value}</div>
                          <div className="text-xs text-muted-foreground">{m.label}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mx-6 mb-6 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary-glow/10 p-5">
                  <div className="flex items-start gap-3">
                    <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <div className="text-sm font-semibold">Sugestão da IA</div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Você tem uma prova de Engenharia de Software em 5 dias. Recomendamos
                        priorizar revisão teórica e exercícios práticos nos próximos 3 dias.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="como-funciona" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Em 3 passos</h2>
          <p className="mt-3 text-muted-foreground">
            Configure uma vez e deixe o FocusPlan cuidar do resto.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { n: "01", t: "Cadastre disciplinas e provas", d: "Adicione carga horária, dificuldade e prazos." },
            { n: "02", t: "Informe sua disponibilidade", d: "Defina os dias e horários livres para estudar." },
            { n: "03", t: "Receba seu plano inteligente", d: "A IA monta a semana priorizando o que importa." },
          ].map((s) => (
            <div key={s.n} className="rounded-2xl border border-border/60 bg-card p-6 shadow-card">
              <div className="text-sm font-semibold text-gradient">{s.n}</div>
              <h3 className="mt-3 text-lg font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section id="beneficios" className="bg-secondary/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Benefícios reais</h2>
            <p className="mt-3 text-muted-foreground">
              Construído para quem leva estudo a sério.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Sparkles, t: "Organização automática", d: "Distribuição inteligente das suas disciplinas ao longo da semana." },
              { icon: Target, t: "Priorização por prazo", d: "Provas próximas e tópicos difíceis ganham mais tempo." },
              { icon: Calendar, t: "Visualização em calendário", d: "Sua semana inteira em blocos claros e coloridos." },
              { icon: TrendingUp, t: "Menos procrastinação", d: "Saiba exatamente o que estudar agora — sem hesitar." },
              { icon: Brain, t: "Apoio de IA", d: "Justificativas em linguagem natural para cada recomendação." },
              { icon: CheckCircle2, t: "Acompanhe progresso", d: "Métricas semanais e análise do desempenho." },
            ].map((b) => (
              <div key={b.t} className="rounded-2xl border border-border/60 bg-card p-6 shadow-card">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground">
                  <b.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold">{b.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="overflow-hidden rounded-3xl bg-gradient-primary p-10 text-center text-primary-foreground shadow-elevated md:p-16">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Monte seu plano de estudos agora
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base opacity-90">
            Comece em segundos. Sem cartão de crédito. Cancele quando quiser.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-7">
            <Link to="/signup">Criar minha conta gratuita</Link>
          </Button>
        </div>
      </section>

      <footer className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground md:flex-row">
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4 text-primary" />
            <span>© {new Date().getFullYear()} FocusPlan</span>
          </div>
          <div className="flex gap-6">
            <Link to="/documentacao">Documentação</Link>
            <Link to="/login">Entrar</Link>
            <Link to="/signup">Criar conta</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
