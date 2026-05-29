import { useState } from "react";
import { Plus, Trash2, Clock4 } from "lucide-react";
import { AppShell } from "@/components/focusplan/AppShell";
import { useFocusPlan } from "@/lib/focusplan/store";
import { WEEKDAYS, type Weekday } from "@/lib/focusplan/types";
import { weekdayOrder } from "@/lib/focusplan/labels";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export function DisponibilidadePage() {
  const { availability, addAvailability, removeAvailability } = useFocusPlan();
  const [form, setForm] = useState({ day: "segunda" as Weekday, start: "19:00", end: "21:00" });

  const submit = () => {
    if (form.start >= form.end) {
      toast.error("Horário inicial deve ser anterior ao final.");
      return;
    }
    addAvailability(form);
    toast.success("Horário adicionado!");
  };

  const grouped = weekdayOrder.map((day) => ({
    day,
    label: WEEKDAYS.find((w) => w.id === day)!.label,
    slots: availability.filter((s) => s.day === day).sort((a, b) => a.start.localeCompare(b.start)),
  }));

  return (
    <AppShell
      title="Disponibilidade semanal"
      subtitle="Informe quando você pode estudar — a IA usa isso para montar seu plano."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <h3 className="font-semibold">Adicionar horário</h3>
          <p className="mt-1 text-sm text-muted-foreground">Defina um bloco de estudo livre.</p>
          <div className="mt-5 space-y-4">
            <div className="grid gap-2">
              <Label>Dia da semana</Label>
              <Select value={form.day} onValueChange={(v) => setForm({ ...form, day: v as Weekday })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {WEEKDAYS.map((w) => <SelectItem key={w.id} value={w.id}>{w.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-2">
                <Label>Início</Label>
                <Input type="time" value={form.start} onChange={(e) => setForm({ ...form, start: e.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label>Fim</Label>
                <Input type="time" value={form.end} onChange={(e) => setForm({ ...form, end: e.target.value })} />
              </div>
            </div>
            <Button onClick={submit} className="w-full bg-gradient-primary">
              <Plus className="mr-2 h-4 w-4" /> Adicionar
            </Button>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-3">
          {grouped.map((g) => (
            <div key={g.day} className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{g.label}</h4>
                <span className="text-xs text-muted-foreground">
                  {g.slots.length === 0 ? "Descanso / sem horário" : `${g.slots.length} bloco(s)`}
                </span>
              </div>
              {g.slots.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {g.slots.map((s) => (
                    <div key={s.id} className="group flex items-center gap-2 rounded-full border border-border bg-accent/40 py-1 pl-3 pr-1.5 text-sm">
                      <Clock4 className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="font-medium">{s.start} – {s.end}</span>
                      <button
                        onClick={() => { removeAvailability(s.id); toast.success("Removido."); }}
                        className="rounded-full p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
