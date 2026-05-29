import { useState } from "react";
import { Sparkles, Wand2 } from "lucide-react";
import { AppShell } from "@/components/focusplan/AppShell";
import { ActivityModal } from "@/components/focusplan/ActivityModal";
import { useFocusPlan } from "@/lib/focusplan/store";
import {
  priorityClass, priorityLabel, studyTypeLabel, weekdayLabel, weekdayOrder,
} from "@/lib/focusplan/labels";
import type { PlanItem } from "@/lib/focusplan/types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function PlanoPage() {
  const { plan, disciplines, generate } = useFocusPlan();
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<PlanItem | null>(null);

  const runGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      generate();
      setLoading(false);
      toast.success("Plano gerado pela IA!");
    }, 900);
  };

  const grouped = weekdayOrder
    .map((day) => ({ day, items: plan.filter((p) => p.day === day).sort((a, b) => a.start.localeCompare(b.start)) }))
    .filter((g) => g.items.length > 0);

  return (
    <AppShell
      title="Plano inteligente"
      subtitle="A IA combina suas disciplinas, prazos e disponibilidade para gerar a semana ideal."
      actions={
        <Button onClick={runGenerate} disabled={loading} className="bg-gradient-primary shadow-glow">
          <Wand2 className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          {loading ? "Gerando..." : "Gerar plano com IA"}
        </Button>
      }
    >
      {plan.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-16 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
            <Sparkles className="h-6 w-6 text-primary-foreground" />
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Clique em <strong>Gerar plano com IA</strong> para criar sua semana de estudos.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {grouped.map((g) => (
            <div key={g.day} className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
              <div className="flex items-center justify-between border-b border-border bg-muted/30 px-5 py-3">
                <h3 className="font-semibold">{weekdayLabel[g.day]}</h3>
                <span className="text-xs text-muted-foreground">{g.items.length} atividade(s)</span>
              </div>
              <ul className="divide-y divide-border">
                {g.items.map((item) => {
                  const disc = disciplines.find((d) => d.id === item.disciplineId);
                  return (
                    <li
                      key={item.id}
                      onClick={() => setSelected(item)}
                      className="grid cursor-pointer grid-cols-1 gap-3 px-5 py-4 transition-colors hover:bg-muted/30 md:grid-cols-12 md:items-center"
                    >
                      <div className="md:col-span-2 text-sm font-medium tabular-nums">{item.start} – {item.end}</div>
                      <div className="md:col-span-4 flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ background: disc?.color }} />
                        <span className="font-medium">{disc?.name}</span>
                      </div>
                      <div className="md:col-span-2 text-sm text-muted-foreground">{studyTypeLabel[item.type]}</div>
                      <div className="md:col-span-1">
                        <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${priorityClass[item.priority]}`}>
                          {priorityLabel[item.priority]}
                        </span>
                      </div>
                      <div className="md:col-span-3 truncate text-xs text-muted-foreground">
                        <Sparkles className="mr-1 inline h-3 w-3 text-primary" />
                        {item.justification}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      )}
      <ActivityModal item={selected} onClose={() => setSelected(null)} />
    </AppShell>
  );
}
