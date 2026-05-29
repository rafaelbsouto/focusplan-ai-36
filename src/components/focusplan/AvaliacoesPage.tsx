import { useState } from "react";
import { Plus, Trash2, ClipboardList } from "lucide-react";
import { AppShell } from "@/components/focusplan/AppShell";
import { useFocusPlan } from "@/lib/focusplan/store";
import {
  assessmentTypeLabel,
  daysUntil,
  formatDate,
  statusClass,
  statusLabel,
} from "@/lib/focusplan/labels";
import type { AssessmentStatus, AssessmentType } from "@/lib/focusplan/types";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export function AvaliacoesPage() {
  const { assessments, disciplines, addAssessment, updateAssessment, removeAssessment } = useFocusPlan();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    disciplineId: disciplines[0]?.id ?? "",
    type: "prova" as AssessmentType,
    dueDate: new Date().toISOString().slice(0, 10),
    weight: 5,
    status: "pendente" as AssessmentStatus,
    notes: "",
  });

  const sorted = [...assessments].sort((a, b) => daysUntil(a.dueDate) - daysUntil(b.dueDate));

  const submit = () => {
    if (!form.title.trim() || !form.disciplineId) {
      toast.error("Preencha título e disciplina.");
      return;
    }
    addAssessment({ ...form, dueDate: new Date(form.dueDate).toISOString() });
    toast.success("Avaliação cadastrada!");
    setOpen(false);
  };

  return (
    <AppShell
      title="Provas e entregas"
      subtitle="Cadastre suas avaliações e acompanhe os prazos."
      actions={
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary"><Plus className="mr-2 h-4 w-4" />Nova avaliação</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Cadastrar avaliação</DialogTitle></DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="grid gap-2">
                <Label>Título</Label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Ex: Prova de IA" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Disciplina</Label>
                  <Select value={form.disciplineId} onValueChange={(v) => setForm({ ...form, disciplineId: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {disciplines.map((d) => <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Tipo</Label>
                  <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v as AssessmentType })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prova">Prova</SelectItem>
                      <SelectItem value="atividade">Atividade</SelectItem>
                      <SelectItem value="projeto">Projeto</SelectItem>
                      <SelectItem value="apresentacao">Apresentação</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 grid gap-2">
                  <Label>Data de entrega</Label>
                  <Input type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
                </div>
                <div className="grid gap-2">
                  <Label>Peso</Label>
                  <Input type="number" min={1} max={10} value={form.weight} onChange={(e) => setForm({ ...form, weight: Number(e.target.value) })} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Observações</Label>
                <Textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
              <Button onClick={submit} className="bg-gradient-primary">Salvar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      }
    >
      {sorted.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
          <ClipboardList className="mx-auto h-10 w-10 text-muted-foreground" />
          <p className="mt-3 text-sm text-muted-foreground">Nenhuma avaliação cadastrada.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
          <div className="hidden grid-cols-12 gap-4 border-b border-border bg-muted/40 px-5 py-3 text-xs font-medium uppercase tracking-wide text-muted-foreground md:grid">
            <div className="col-span-4">Título</div>
            <div className="col-span-2">Disciplina</div>
            <div className="col-span-1">Tipo</div>
            <div className="col-span-2">Prazo</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-1 text-right">Ações</div>
          </div>
          <ul className="divide-y divide-border">
            {sorted.map((a) => {
              const disc = disciplines.find((d) => d.id === a.disciplineId);
              const days = daysUntil(a.dueDate);
              const overdue = days < 0 && a.status !== "concluido";
              return (
                <li key={a.id} className="grid grid-cols-1 gap-3 px-5 py-4 md:grid-cols-12 md:items-center md:gap-4">
                  <div className="col-span-4">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: disc?.color }} />
                      <span className="font-medium">{a.title}</span>
                    </div>
                    {a.notes && <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{a.notes}</p>}
                  </div>
                  <div className="col-span-2 text-sm text-muted-foreground">{disc?.name ?? "—"}</div>
                  <div className="col-span-1 text-sm">{assessmentTypeLabel[a.type]}</div>
                  <div className="col-span-2">
                    <div className={`text-sm ${overdue ? "font-semibold text-destructive" : ""}`}>
                      {formatDate(a.dueDate)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {overdue ? `${Math.abs(days)}d em atraso` : days === 0 ? "Hoje" : `em ${days}d`}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <Select value={a.status} onValueChange={(v) => updateAssessment(a.id, { status: v as AssessmentStatus })}>
                      <SelectTrigger className={`h-8 w-full text-xs ${statusClass[a.status]}`}><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {(["pendente", "em_andamento", "concluido"] as AssessmentStatus[]).map((s) => (
                          <SelectItem key={s} value={s}>{statusLabel[s]}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <button
                      onClick={() => { removeAssessment(a.id); toast.success("Removida."); }}
                      className="rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </AppShell>
  );
}
