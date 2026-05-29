import { useMemo } from "react";
import { AppShell } from "@/components/focusplan/AppShell";
import { useFocusPlan } from "@/lib/focusplan/store";
import { daysUntil, formatDate } from "@/lib/focusplan/labels";
import { CheckCircle2, Clock, Sparkles, Target, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function ProgressoPage() {
  const { plan, disciplines, assessments } = useFocusPlan();

  const stats = useMemo(() => {
    const totalMin = plan.reduce((acc, p) => {
      const [sh, sm] = p.start.split(":").map(Number);
      const [eh, em] = p.end.split(":").map(Number);
      return acc + (eh * 60 + em - sh * 60 - sm);
    }, 0);
    const doneMin = plan
      .filter((p) => p.done)
      .reduce((acc, p) => {
        const [sh, sm] = p.start.split(":").map(Number);
        const [eh, em] = p.end.split(":").map(Number);
        return acc + (eh * 60 + em - sh * 60 - sm);
      }, 0);
    const completion = totalMin === 0 ? 0 : Math.round((doneMin / totalMin) * 100);

    const byDiscipline = disciplines.map((d) => {
      const items = plan.filter((p) => p.disciplineId === d.id);
      const min = items.reduce((acc, p) => {
        const [sh, sm] = p.start.split(":").map(Number);
        const [eh, em] = p.end.split(":").map(Number);
        return acc + (eh * 60 + em - sh * 60 - sm);
      }, 0);
      return { discipline: d, hours: Math.round((min / 60) * 10) / 10, items: items.length };
    }).sort((a, b) => b.hours - a.hours);

    return {
      totalHours: Math.round((totalMin / 60) * 10) / 10,
      doneHours: Math.round((doneMin / 60) * 10) / 10,
      completion,
      doneActivities: plan.filter((p) => p.done).length,
      totalActivities: plan.length,
      byDiscipline,
    };
  }, [plan, disciplines]);

  const upcoming = [...assessments]
    .filter((a) => a.status !== "concluido")
    .sort((a, b) => daysUntil(a.dueDate) - daysUntil(b.dueDate))
    .slice(0, 5);

  const analysis =
    stats.completion >= 70
      ? `Você concluiu ${stats.completion}% do plano desta semana. Excelente ritmo — mantenha o foco nas disciplinas com provas mais próximas.`
      : stats.completion >= 40
        ? `Você concluiu ${stats.completion}% do plano. Bom progresso, mas reserve mais tempo para as entregas próximas.`
        : `Você concluiu apenas ${stats.completion}% do plano. Recomendamos revisar sua disponibilidade e priorizar entregas urgentes.`;

  return (
    <AppShell title="Relatórios e progresso" subtitle="Acompanhe sua evolução semanal.">
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { icon: Clock, label: "Horas estudadas", value: `${stats.doneHours}h / ${stats.totalHours}h` },
          { icon: CheckCircle2, label: "Atividades concluídas", value: `${stats.doneActivities} / ${stats.totalActivities}` },
          { icon: Target, label: "Conclusão semanal", value: `${stats.completion}%` },
          { icon: TrendingUp, label: "Entregas próximas", value: upcoming.length },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground">
              <s.icon className="h-5 w-5" />
            </div>
            <div className="text-2xl font-bold tracking-tight">{s.value}</div>
            <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-card">
          <h3 className="font-semibold">Distribuição por disciplina</h3>
          <div className="mt-5 space-y-4">
            {stats.byDiscipline.map((b) => {
              const max = Math.max(...stats.byDiscipline.map((x) => x.hours), 1);
              const pct = (b.hours / max) * 100;
              return (
                <div key={b.discipline.id}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-medium">{b.discipline.name}</span>
                    <span className="text-muted-foreground">{b.hours}h · {b.items} atividades</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: b.discipline.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-primary-glow/10 p-6 shadow-card">
            <div className="mb-2 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Análise da IA</h3>
            </div>
            <Progress value={stats.completion} className="mb-3" />
            <p className="text-sm text-muted-foreground">{analysis}</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h3 className="font-semibold">Entregas próximas</h3>
            <ul className="mt-4 space-y-3">
              {upcoming.map((a) => {
                const disc = disciplines.find((d) => d.id === a.disciplineId);
                const days = daysUntil(a.dueDate);
                return (
                  <li key={a.id} className="flex items-start gap-3 text-sm">
                    <span className="mt-1.5 h-2 w-2 rounded-full" style={{ background: disc?.color }} />
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-medium">{a.title}</div>
                      <div className="text-xs text-muted-foreground">{formatDate(a.dueDate)} · em {days}d</div>
                    </div>
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
