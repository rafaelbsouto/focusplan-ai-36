import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Clock, Sparkles, Target } from "lucide-react";
import { useFocusPlan } from "@/lib/focusplan/store";
import type { PlanItem } from "@/lib/focusplan/types";
import {
  priorityClass, priorityLabel, studyTypeLabel, weekdayLabel,
} from "@/lib/focusplan/labels";

export function ActivityModal({ item, onClose }: { item: PlanItem | null; onClose: () => void }) {
  const { disciplines, updatePlanItem, togglePlanItem } = useFocusPlan();
  const [objective, setObjective] = useState(item?.objective ?? "");
  const disc = item ? disciplines.find((d) => d.id === item.disciplineId) : undefined;

  if (!item) return null;

  const toggleCheck = (id: string) => {
    const next = (item.checklist ?? []).map((c) => (c.id === id ? { ...c, done: !c.done } : c));
    updatePlanItem(item.id, { checklist: next });
  };

  return (
    <Dialog open={!!item} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full" style={{ background: disc?.color }} />
            {disc?.name}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{weekdayLabel[item.day]} · {item.start} – {item.end}</span>
            <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${priorityClass[item.priority]}`}>
              Prioridade {priorityLabel[item.priority]}
            </span>
            <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">
              {studyTypeLabel[item.type]}
            </span>
          </div>

          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm">
            <div className="mb-1 flex items-center gap-1.5 font-semibold text-primary">
              <Sparkles className="h-4 w-4" /> Justificativa da IA
            </div>
            <p className="text-muted-foreground">{item.justification}</p>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-1.5 text-sm font-medium">
              <Target className="h-4 w-4" /> Objetivo da sessão
            </label>
            <Textarea
              rows={2}
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              onBlur={() => updatePlanItem(item.id, { objective })}
            />
            {item.content && <p className="text-xs text-muted-foreground">{item.content}</p>}
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">Checklist</div>
            <ul className="space-y-2">
              {(item.checklist ?? []).map((c) => (
                <li key={c.id} className="flex items-center gap-3 rounded-lg border border-border bg-background px-3 py-2">
                  <Checkbox checked={c.done} onCheckedChange={() => toggleCheck(c.id)} />
                  <span className={`text-sm ${c.done ? "line-through text-muted-foreground" : ""}`}>{c.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <Button
            className={`w-full ${item.done ? "" : "bg-gradient-primary"}`}
            variant={item.done ? "outline" : "default"}
            onClick={() => { togglePlanItem(item.id); onClose(); }}
          >
            <CheckCircle2 className="mr-2 h-4 w-4" />
            {item.done ? "Marcar como pendente" : "Marcar como concluída"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
