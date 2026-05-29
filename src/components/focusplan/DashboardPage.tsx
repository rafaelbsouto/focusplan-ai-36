import { Link } from "@tanstack/react-router";
import { BookOpen, CalendarClock, CheckCircle2, ClipboardList, Clock, Sparkles } from "lucide-react";
import { AppShell } from "@/components/focusplan/AppShell";
import { useFocusPlan } from "@/lib/focusplan/store";
import { weeklySuggestion } from "@/lib/focusplan/ai";
import {
  daysUntil,
  formatDate,
  priorityClass,
  priorityLabel,
  studyTypeLabel,
  todayWeekday,
  weekdayLabel,
} from "@/lib/focusplan/labels";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";

export function DashboardPage() {
  const { user, disciplines, assessments, availability, plan, togglePlanItem } = useFocusPlan();

  const upcoming = useMemo(
    () =>
      assessments
        .filter((a) => a.status !== "concluido")
        .sort((a, b) => daysUntil(a.dueDate) - daysUntil(b.dueDate)),
    [assessments],
  );

  const today = todayWeekday();
  const todayItems = useMemo(() => plan.filter((p) => p.day === today), [plan, today]);

  const plannedHours = useMemo(() => {
    const total = plan.reduce((acc, p) => {
      const [sh, sm] = p.start.split(":").map(Number);
      const [eh, em] = p.end.split(":").map(Number);
      return acc + (eh * 60 + em - sh * 60 - sm) / 60;
    }, 0);
    return Math.round(total * 10) / 10;
  }, [plan]);

  const stats = [
    { icon: BookOpen, label: "Disciplinas", value: disciplines.length, accent: "from-indigo-500 to-violet-500" },
    { icon: CalendarClock, label: "Provas próximas", value: upcoming.length, accent: "from-rose-500 to-orange-500" },
    { icon: ClipboardList, label: "Tarefas pendentes", value: assessments.filter((a) => a.status === "pendente").length, accent: "from-amber-500 to-yellow-500" },
    { icon: Clock, label: "Horas planejadas", value: `${plannedHours}h`, accent: "from-emerald-500 to-teal-500" },
  ];

  const suggestion = weeklySuggestion(disciplines, assessments);
  const hello = `Olá, ${user?.name?.split(" ")[0] ?? "estudante"} 👋`;

  return (
    <AppShell
      title={hello}
      subtitle={`Aqui está sua visão geral de hoje (${weekdayLabel[today]}).`}
      actions={
        <Button asChild className="bg-gradient-primary">
          <Link to="/plano">
            <Sparkles className="mr-2 h-4 w-4" />
            Ver plano inteligente
          </Link>
        </Button>
      }
    >
      {availability.length === 0 && (
        <div className="mb-6 rounded-xl border border-warning/40 bg-warning/10 p-4 text-sm">
          Você ainda não cadastrou horários disponíveis.{" "}
          <Link to="/disponibilidade" className="font-semibold underline">
            Configurar agora
          </Link>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${s.accent} text-white`}>
              <s.icon className="h-5 w-5" />
            </div>
            <div className="text-2xl font-bold tracking-tight">{s.value}</div>
            <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Plano de hoje</h2>
              <p className="text-sm text-muted-foreground">Atividades sugeridas para {weekdayLabel[today]}.</p>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link to="/calendario">Ver semana</Link>
            </Button>
          </div>
          {todayItems.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
              Nada agendado para hoje. Gere seu plano em <Link to="/plano" className="font-medium text-primary">Plano inteligente</Link>.
            </div>
          ) : (
            <ul className="space-y-3">
              {todayItems.map((item) => {
                const disc = disciplines.find((d) => d.id === item.disciplineId);
                return (
                  <li
                    key={item.id}
                    className="flex items-center gap-4 rounded-xl border border-border bg-background p-4"
                  >
                    <button
                      onClick={() => togglePlanItem(item.id)}
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                        item.done ? "border-success bg-success text-success-foreground" : "border-border bg-background hover:border-primary"
                      }`}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                    </button>
                    <div className="min-w-0 flex-1">
                      <div className={`text-sm font-medium ${item.done ? "line-through text-muted-foreground" : ""}`}>
                        {item.start} – {item.end} · {disc?.name}
                      </div>
                      <div className="mt-0.5 text-xs text-muted-foreground">
                        {studyTypeLabel[item.type]} · {item.justification}
                      </div>
                    </div>
                    <span className={`hidden rounded-full border px-2 py-0.5 text-xs font-medium md:inline-flex ${priorityClass[item.priority]}`}>
                      {priorityLabel[item.priority]}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-primary-glow/10 p-6 shadow-card">
            <div className="mb-2 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Sugestão da IA</h3>
            </div>
            <p className="text-sm text-muted-foreground">{suggestion}</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h3 className="font-semibold">Próximas entregas</h3>
            <ul className="mt-4 space-y-3">
              {upcoming.slice(0, 4).map((a) => {
                const disc = disciplines.find((d) => d.id === a.disciplineId);
                const days = daysUntil(a.dueDate);
                return (
                  <li key={a.id} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full" style={{ background: disc?.color }} />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium">{a.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {disc?.name} · {formatDate(a.dueDate)}
                      </div>
                    </div>
                    <span
                      className={`shrink-0 rounded-full border px-2 py-0.5 text-xs font-medium ${
                        days <= 3 ? "border-destructive/30 bg-destructive/10 text-destructive" : "border-border bg-muted text-muted-foreground"
                      }`}
                    >
                      {days <= 0 ? "Hoje" : `${days}d`}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
