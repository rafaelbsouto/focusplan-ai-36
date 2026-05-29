import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

const stats = [
  { label: "Snapshot", k: "Disciplinas", v: "04" },
  { label: "Agenda", k: "Provas próximas", v: "03" },
  { label: "Esforço", k: "Horas planejadas", v: "12h" },
];

const steps = [
  {
    n: "01",
    t: "Cadastre disciplinas e provas",
    d: "Adicione carga horária, dificuldade e prazos para cada matéria do semestre.",
  },
  {
    n: "02",
    t: "Informe sua disponibilidade",
    d: "Defina dias e janelas livres para o sistema respeitar sua rotina real.",
  },
  {
    n: "03",
    t: "Receba seu plano semanal",
    d: "O motor de regras prioriza prazos curtos e disciplinas difíceis primeiro.",
  },
];

const principles = [
  {
    t: "Organização orientada a prazos",
    d: "Provas em menos de três dias sobem no ranking de prioridade automaticamente.",
  },
  {
    t: "Distribuição por dificuldade",
    d: "Matérias marcadas como difíceis recebem blocos maiores e mais frequentes.",
  },
  {
    t: "Calendário visual semanal",
    d: "Sua semana inteira em blocos editoriais — sem cores aleatórias nem ruído.",
  },
  {
    t: "Justificativas legíveis",
    d: "Cada recomendação vem acompanhada da razão por trás da escolha.",
  },
  {
    t: "Progresso mensurável",
    d: "Métricas semanais comparam o planejado com o efetivamente executado.",
  },
  {
    t: "Documentação aberta",
    d: "Arquitetura, regras de priorização e fluxo de dados publicados na íntegra.",
  },
];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top meta bar */}
      <div className="border-b border-primary/15">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <span className="font-mono text-[10px] uppercase tracking-editorial text-primary/60">
            FocusPlan · Edição 01 · Planejamento Acadêmico
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-editorial text-primary/40 md:inline">
            Atualizado em {new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
          </span>
        </div>
      </div>

      {/* Nav */}
      <header className="border-b border-primary/15">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link to="/" className="flex items-baseline gap-2">
            <span className="font-display text-xl font-extrabold tracking-tight">FocusPlan</span>
            <span className="font-mono text-[10px] uppercase tracking-editorial text-accent">
              v1.0
            </span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#metodo" className="text-primary/70 transition-colors hover:text-primary">
              Método
            </a>
            <a href="#principios" className="text-primary/70 transition-colors hover:text-primary">
              Princípios
            </a>
            <Link to="/documentacao" className="text-primary/70 transition-colors hover:text-primary">
              Documentação
            </Link>
            <Link to="/login" className="text-primary/70 transition-colors hover:text-primary">
              Entrar
            </Link>
          </nav>
          <Link
            to="/signup"
            className="group inline-flex items-center gap-2 bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-editorial text-primary-foreground transition-colors hover:bg-primary-glow"
          >
            Começar
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </header>

      {/* Hero — editorial high density */}
      <section className="border-b border-primary/15">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 lg:grid-cols-12 lg:items-end lg:py-24">
          {/* Left column */}
          <div className="space-y-10 lg:col-span-8">
            <div className="flex items-center gap-4 border-b border-primary/15 pb-4">
              <span className="font-mono text-[10px] font-bold uppercase tracking-editorial text-accent">
                Edição 01 / Planejamento Acadêmico
              </span>
              <div className="h-px flex-1 bg-primary/15" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-editorial text-primary/40">
                2024
              </span>
            </div>

            <h1 className="font-display text-5xl font-extrabold leading-[0.92] tracking-tighter text-primary md:text-7xl lg:text-[7.5rem]">
              Transforme sua
              <br />
              rotina de estudos
              <br />
              <span className="text-accent">com precisão.</span>
            </h1>

            <div className="grid grid-cols-1 gap-8 pt-2 md:grid-cols-2">
              <p className="max-w-md text-lg leading-relaxed text-primary-glow">
                Cadastre suas disciplinas, informe seus prazos e deixe o FocusPlan organizar sua
                semana com clareza editorial, foco absoluto e produtividade orientada a dados.
              </p>
              <div className="flex flex-col gap-3">
                <Link
                  to="/signup"
                  className="bg-primary px-8 py-4 text-center text-xs font-bold uppercase tracking-editorial text-primary-foreground transition-colors hover:bg-primary-glow"
                >
                  Começar agora
                </Link>
                <a
                  href="#metodo"
                  className="border border-primary px-8 py-4 text-center text-xs font-bold uppercase tracking-editorial text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  Ver como funciona
                </a>
              </div>
            </div>
          </div>

          {/* Right column — stats sidebar */}
          <aside className="space-y-8 border-l-0 pl-0 lg:col-span-4 lg:border-l lg:border-primary lg:pl-8">
            <div className="space-y-6">
              {stats.map((s) => (
                <div key={s.k}>
                  <span className="mb-1 block font-mono text-[10px] font-bold uppercase tracking-editorial text-accent">
                    {s.label}
                  </span>
                  <div className="flex items-baseline justify-between border-b border-primary/15 pb-2">
                    <span className="text-sm font-semibold text-primary-glow">{s.k}</span>
                    <span className="font-display text-4xl font-extrabold text-primary">{s.v}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Insight box */}
            <div className="bg-primary p-6 text-primary-foreground">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-2 w-2 bg-accent" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-editorial">
                  Sugestão analítica
                </span>
              </div>
              <p className="text-xs leading-relaxed text-primary-foreground/80">
                Você tem uma prova de Engenharia de Software em 5 dias. Recomendamos priorizar
                revisão teórica e exercícios práticos nos próximos 3 dias.
              </p>
              <div className="mt-6 flex justify-end">
                <div className="font-mono text-[9px] text-accent">LOG_REF: FP-992</div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Método / steps */}
      <section id="metodo" className="border-b border-primary/15">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="font-mono text-[10px] font-bold uppercase tracking-editorial text-accent">
                §1 — Método
              </span>
              <h2 className="mt-4 font-display text-4xl font-extrabold leading-[0.95] tracking-tight text-primary md:text-5xl">
                Configure uma vez. <span className="text-accent">Estude por meses.</span>
              </h2>
              <p className="mt-6 max-w-sm text-base leading-relaxed text-primary-glow">
                O FocusPlan reduz o planejamento semanal a três decisões objetivas. O resto fica
                a cargo do motor de regras.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-px bg-primary/15 lg:col-span-8 md:grid-cols-3">
              {steps.map((s) => (
                <article key={s.n} className="bg-background p-8">
                  <span className="font-mono text-xs font-bold tracking-editorial text-accent">
                    {s.n}
                  </span>
                  <h3 className="mt-6 font-display text-xl font-bold tracking-tight text-primary">
                    {s.t}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-primary-glow">{s.d}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Princípios */}
      <section id="principios" className="border-b border-primary/15 bg-secondary/40">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="flex items-end justify-between border-b border-primary/15 pb-6">
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-editorial text-accent">
                §2 — Princípios
              </span>
              <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-primary md:text-5xl">
                Seis decisões de projeto.
              </h2>
            </div>
            <span className="hidden font-mono text-[10px] uppercase tracking-editorial text-primary/40 md:inline">
              06 · seções
            </span>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {principles.map((p, i) => (
              <article key={p.t} className="border-t border-primary pt-5">
                <span className="font-mono text-[10px] font-bold uppercase tracking-editorial text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold tracking-tight text-primary">
                  {p.t}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-primary-glow">{p.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Closing manifesto / CTA */}
      <section className="border-b border-primary/15">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-24 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <span className="font-mono text-[10px] font-bold uppercase tracking-editorial text-accent">
              §3 — Colofão
            </span>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-[0.95] tracking-tight text-primary md:text-6xl">
              Estudar bem é, antes de tudo,
              <br />
              <span className="text-accent">decidir bem antes de começar.</span>
            </h2>
          </div>
          <div className="space-y-4 lg:col-span-4">
            <Link
              to="/signup"
              className="block bg-primary px-8 py-4 text-center text-xs font-bold uppercase tracking-editorial text-primary-foreground transition-colors hover:bg-primary-glow"
            >
              Criar minha conta
            </Link>
            <Link
              to="/documentacao"
              className="block border border-primary px-8 py-4 text-center text-xs font-bold uppercase tracking-editorial text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Ler a documentação
            </Link>
            <p className="pt-2 text-xs text-primary/60">
              Sem cartão de crédito. Conta gratuita, sem limites artificiais.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-10 md:flex-row md:items-center">
          <div className="flex items-baseline gap-3">
            <span className="font-display text-base font-extrabold tracking-tight text-primary">
              FocusPlan
            </span>
            <span className="font-mono text-[10px] uppercase tracking-editorial text-primary/50">
              Intelligent Systems · © {new Date().getFullYear()}
            </span>
          </div>
          <div className="flex gap-8 text-xs font-medium text-primary/70">
            <Link to="/documentacao" className="hover:text-primary">
              Documentação
            </Link>
            <Link to="/login" className="hover:text-primary">
              Entrar
            </Link>
            <Link to="/signup" className="hover:text-primary">
              Criar conta
            </Link>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-editorial text-primary/40">
            SEC_ID · 992-FP
          </span>
        </div>
      </footer>
    </div>
  );
}
