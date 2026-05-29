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
  { t: "Organização orientada a prazos", d: "Provas em menos de três dias sobem no ranking de prioridade automaticamente." },
  { t: "Distribuição por dificuldade", d: "Matérias marcadas como difíceis recebem blocos maiores e mais frequentes." },
  { t: "Calendário visual semanal", d: "Sua semana inteira em blocos editoriais — sem cores aleatórias nem ruído." },
  { t: "Justificativas legíveis", d: "Cada recomendação vem acompanhada da razão por trás da escolha." },
  { t: "Progresso mensurável", d: "Métricas semanais comparam o planejado com o efetivamente executado." },
  { t: "Documentação aberta", d: "Arquitetura, regras de priorização e fluxo de dados publicados na íntegra." },
];

// Mock weekly plan blocks
const days = ["SEG", "TER", "QUA", "QUI", "SEX"];
const blocks: { day: number; start: number; span: number; subject: string; tag: string; tone: "ink" | "accent" | "outline" }[] = [
  { day: 0, start: 0, span: 2, subject: "Engenharia de Software", tag: "REVISÃO", tone: "ink" },
  { day: 0, start: 3, span: 1, subject: "Banco de Dados", tag: "EXERCÍCIOS", tone: "outline" },
  { day: 1, start: 1, span: 2, subject: "IA — Redes Neurais", tag: "TEORIA", tone: "accent" },
  { day: 2, start: 0, span: 1, subject: "Eng. de Software", tag: "PROVA EM 5d", tone: "ink" },
  { day: 2, start: 2, span: 2, subject: "Banco de Dados", tag: "PROJETO", tone: "outline" },
  { day: 3, start: 1, span: 3, subject: "IA — Lab", tag: "PRÁTICA", tone: "accent" },
  { day: 4, start: 0, span: 2, subject: "Revisão geral", tag: "RECAP", tone: "ink" },
  { day: 4, start: 3, span: 1, subject: "Leitura dirigida", tag: "LIVRE", tone: "outline" },
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
            <span className="font-mono text-[10px] uppercase tracking-editorial text-accent">v1.0</span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#metodo" className="text-primary/70 transition-colors hover:text-primary">Método</a>
            <a href="#plano" className="text-primary/70 transition-colors hover:text-primary">Plano da semana</a>
            <a href="#principios" className="text-primary/70 transition-colors hover:text-primary">Princípios</a>
            <Link to="/documentacao" className="text-primary/70 transition-colors hover:text-primary">Documentação</Link>
            <Link to="/login" className="text-primary/70 transition-colors hover:text-primary">Entrar</Link>
          </nav>
          <Link
            to="/signup"
            className="group inline-flex items-center gap-2 bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-editorial text-primary-foreground transition-colors hover:bg-primary-glow"
          >
            Começar
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-primary/15">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-10 flex items-center gap-4 border-b border-primary/15 pb-4">
            <span className="font-mono text-[10px] font-bold uppercase tracking-editorial text-accent">
              Edição 01 / Planejamento Acadêmico
            </span>
            <div className="h-px flex-1 bg-primary/15" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-editorial text-primary/40">
              2024
            </span>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Headline + lede */}
            <div className="space-y-8 lg:col-span-8">
              <h1 className="font-display text-[3.25rem] font-extrabold leading-[0.95] tracking-tight text-primary md:text-[4.5rem] lg:text-[5.25rem]">
                Transforme sua rotina <br className="hidden md:block" />
                de estudos{" "}
                <span className="text-accent">com precisão.</span>
              </h1>

              <div className="grid grid-cols-1 gap-8 border-t border-primary/15 pt-8 md:grid-cols-12 md:items-start">
                <p className="text-base leading-relaxed text-primary-glow md:col-span-7 md:text-lg">
                  Cadastre suas disciplinas, informe seus prazos e deixe o FocusPlan organizar sua
                  semana com clareza editorial, foco absoluto e produtividade orientada a dados.
                </p>
                <div className="flex flex-col gap-3 md:col-span-5">
                  <Link
                    to="/signup"
                    className="bg-primary px-6 py-3.5 text-center text-xs font-bold uppercase tracking-editorial text-primary-foreground transition-colors hover:bg-primary-glow"
                  >
                    Começar agora
                  </Link>
                  <a
                    href="#metodo"
                    className="border border-primary px-6 py-3.5 text-center text-xs font-bold uppercase tracking-editorial text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    Ver como funciona
                  </a>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6 lg:col-span-4 lg:border-l lg:border-primary lg:pl-8">
              <div className="space-y-5">
                {stats.map((s) => (
                  <div key={s.k}>
                    <span className="mb-1 block font-mono text-[10px] font-bold uppercase tracking-editorial text-accent">
                      {s.label}
                    </span>
                    <div className="flex items-baseline justify-between border-b border-primary/15 pb-2">
                      <span className="text-sm font-semibold text-primary-glow">{s.k}</span>
                      <span className="font-display text-3xl font-extrabold text-primary">{s.v}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-primary p-5 text-primary-foreground">
                <div className="mb-3 flex items-center gap-2">
                  <div className="h-1.5 w-1.5 bg-accent" />
                  <span className="font-mono text-[10px] font-bold uppercase tracking-editorial">
                    Sugestão analítica
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-primary-foreground/80">
                  Prova de Engenharia de Software em 5 dias. Recomendamos priorizar revisão teórica
                  e exercícios práticos nos próximos 3 dias.
                </p>
                <div className="mt-4 flex justify-end font-mono text-[9px] text-accent">
                  LOG_REF: FP-992
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Plano da semana — mockup visual */}
      <section id="plano" className="border-b border-primary/15">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-8 flex items-end justify-between border-b border-primary/15 pb-4">
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-editorial text-accent">
                Amostra · Semana 14
              </span>
              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-primary md:text-4xl">
                Sua semana, em blocos editoriais.
              </h2>
            </div>
            <span className="hidden font-mono text-[10px] uppercase tracking-editorial text-primary/50 md:inline">
              Auto-gerado · 12h planejadas
            </span>
          </div>

          <div className="overflow-x-auto">
            <div className="grid min-w-[640px] grid-cols-5 border border-primary/20 bg-background">
              {days.map((d, di) => (
                <div key={d} className="border-r border-primary/15 last:border-r-0">
                  <div className="flex items-baseline justify-between border-b border-primary/15 bg-primary/5 px-3 py-2">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-editorial text-primary">
                      {d}
                    </span>
                    <span className="font-mono text-[9px] text-primary/50">
                      {String(14 + di).padStart(2, "0")}/04
                    </span>
                  </div>
                  <div className="grid grid-rows-4 gap-1 p-1.5" style={{ height: "260px" }}>
                    {Array.from({ length: 4 }).map((_, slot) => {
                      const block = blocks.find((b) => b.day === di && b.start === slot);
                      if (!block) return <div key={slot} className="border border-dashed border-primary/10" />;
                      const tone =
                        block.tone === "ink"
                          ? "bg-primary text-primary-foreground"
                          : block.tone === "accent"
                            ? "bg-accent text-accent-foreground"
                            : "border border-primary/30 text-primary";
                      return (
                        <div
                          key={slot}
                          className={`flex flex-col justify-between p-2 text-[10px] leading-tight ${tone}`}
                          style={{ gridRow: `span ${block.span} / span ${block.span}` }}
                        >
                          <span className="font-mono text-[8px] font-bold uppercase tracking-editorial opacity-70">
                            {block.tag}
                          </span>
                          <span className="font-display text-xs font-bold">{block.subject}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-6 font-mono text-[10px] uppercase tracking-editorial text-primary/60">
            <span className="flex items-center gap-2"><span className="h-3 w-3 bg-primary" /> prioridade alta</span>
            <span className="flex items-center gap-2"><span className="h-3 w-3 bg-accent" /> aprofundamento</span>
            <span className="flex items-center gap-2"><span className="h-3 w-3 border border-primary/40" /> consolidação</span>
          </div>
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
              <h2 className="mt-4 font-display text-3xl font-extrabold leading-[1] tracking-tight text-primary md:text-4xl">
                Configure uma vez. <span className="text-accent">Estude por meses.</span>
              </h2>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-primary-glow">
                O FocusPlan reduz o planejamento semanal a três decisões objetivas. O resto fica a
                cargo do motor de regras.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-px bg-primary/15 lg:col-span-8 md:grid-cols-3">
              {steps.map((s) => (
                <article key={s.n} className="bg-background p-7">
                  <span className="font-mono text-xs font-bold tracking-editorial text-accent">{s.n}</span>
                  <h3 className="mt-5 font-display text-lg font-bold tracking-tight text-primary">
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
              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-primary md:text-4xl">
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
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-20 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <span className="font-mono text-[10px] font-bold uppercase tracking-editorial text-accent">
              §3 — Colofão
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold leading-[1] tracking-tight text-primary md:text-5xl">
              Estudar bem é, antes de tudo, <span className="text-accent">decidir bem antes de começar.</span>
            </h2>
          </div>
          <div className="space-y-3 lg:col-span-4">
            <Link
              to="/signup"
              className="block bg-primary px-6 py-3.5 text-center text-xs font-bold uppercase tracking-editorial text-primary-foreground transition-colors hover:bg-primary-glow"
            >
              Criar minha conta
            </Link>
            <Link
              to="/documentacao"
              className="block border border-primary px-6 py-3.5 text-center text-xs font-bold uppercase tracking-editorial text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Ler a documentação
            </Link>
            <p className="pt-1 text-xs text-primary/60">
              Sem cartão de crédito. Conta gratuita, sem limites artificiais.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-8 md:flex-row md:items-center">
          <div className="flex items-baseline gap-3">
            <span className="font-display text-base font-extrabold tracking-tight text-primary">FocusPlan</span>
            <span className="font-mono text-[10px] uppercase tracking-editorial text-primary/50">
              Intelligent Systems · © {new Date().getFullYear()}
            </span>
          </div>
          <div className="flex gap-8 text-xs font-medium text-primary/70">
            <Link to="/documentacao" className="hover:text-primary">Documentação</Link>
            <Link to="/login" className="hover:text-primary">Entrar</Link>
            <Link to="/signup" className="hover:text-primary">Criar conta</Link>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-editorial text-primary/40">
            SEC_ID · 992-FP
          </span>
        </div>
      </footer>
    </div>
  );
}
