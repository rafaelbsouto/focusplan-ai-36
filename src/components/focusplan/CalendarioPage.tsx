import { useMemo, useState } from "react";
import { AppShell } from "@/components/focusplan/AppShell";
import { ActivityModal } from "@/components/focusplan/ActivityModal";
import { useFocusPlan } from "@/lib/focusplan/store";
import { studyTypeLabel, weekdayOrder } from "@/lib/focusplan/labels";
import { WEEKDAYS, type PlanItem } from "@/lib/focusplan/types";
import { CheckCircle2 } from "lucide-react";

function toMinutes(t: string) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

export function CalendarioPage() {
  const { plan, disciplines } = useFocusPlan();
  const [selected, setSelected] = useState<PlanItem | null>(null);

  const { startMin, endMin } = useMemo(() => {
    if (plan.length === 0) return { startMin: 8 * 60, endMin: 22 * 60 };
    const starts = plan.map((p) => toMinutes(p.start));
    const ends = plan.map((p) => toMinutes(p.end));
    return {
      startMin: Math.min(...starts, 8 * 60),
      endMin: Math.max(...ends, 22 * 60),
    };
  }, [plan]);

  const totalMin = endMin - startMin;
  const hours = [];
  for (let m = Math.floor(startMin / 60) * 60; m <= endMin; m += 60) hours.push(m);

  return (
    <AppShell title="Calendário de estudos" subtitle="Sua semana visual, com blocos por disciplina.">
      <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-card">
        <div className="min-w-[900px]">
          <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-border bg-muted/30">
            <div />
            {weekdayOrder.map((d) => (
              <div key={d} className="border-l border-border px-3 py-3 text-center text-sm font-semibold">
                {WEEKDAYS.find((w) => w.id === d)?.short}
              </div>
            ))}
          </div>
          <div className="relative grid grid-cols-[60px_repeat(7,1fr)]" style={{ height: `${(totalMin / 60) * 60}px` }}>
            {/* Hour lines */}
            <div className="relative">
              {hours.map((m) => (
                <div
                  key={m}
                  className="absolute left-0 right-0 pr-2 text-right text-xs text-muted-foreground"
                  style={{ top: `${((m - startMin) / totalMin) * 100}%` }}
                >
                  {String(Math.floor(m / 60)).padStart(2, "0")}:00
                </div>
              ))}
            </div>
            {weekdayOrder.map((day) => (
              <div key={day} className="relative border-l border-border">
                {hours.map((m) => (
                  <div
                    key={m}
                    className="absolute left-0 right-0 border-t border-dashed border-border/60"
                    style={{ top: `${((m - startMin) / totalMin) * 100}%` }}
                  />
                ))}
                {plan
                  .filter((p) => p.day === day)
                  .map((item) => {
                    const disc = disciplines.find((d) => d.id === item.disciplineId);
                    const s = toMinutes(item.start);
                    const e = toMinutes(item.end);
                    const top = ((s - startMin) / totalMin) * 100;
                    const height = ((e - s) / totalMin) * 100;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setSelected(item)}
                        className="absolute left-1 right-1 overflow-hidden rounded-lg border p-2 text-left text-xs shadow-card transition-transform hover:scale-[1.02]"
                        style={{
                          top: `${top}%`,
                          height: `${height}%`,
                          background: `${disc?.color}1a`,
                          borderColor: `${disc?.color}55`,
                          color: disc?.color,
                        }}
                      >
                        <div className="flex items-center gap-1 font-semibold text-foreground">
                          {item.done && <CheckCircle2 className="h-3 w-3 text-success" />}
                          {item.start}
                        </div>
                        <div className="truncate font-medium text-foreground">{disc?.name}</div>
                        <div className="truncate text-[10px] opacity-80">{studyTypeLabel[item.type]}</div>
                      </button>
                    );
                  })}
              </div>
            ))}
          </div>
        </div>
      </div>
      <ActivityModal item={selected} onClose={() => setSelected(null)} />
    </AppShell>
  );
}
