import { useState } from "react";
import { Plus, Trash2, BookOpen } from "lucide-react";
import { AppShell } from "@/components/focusplan/AppShell";
import { useFocusPlan } from "@/lib/focusplan/store";
import { difficultyLabel } from "@/lib/focusplan/labels";
import type { Difficulty } from "@/lib/focusplan/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const PALETTE = ["#6366F1", "#8B5CF6", "#EC4899", "#F97316", "#10B981", "#0EA5E9", "#F59E0B", "#14B8A6"];

export function DisciplinasPage() {
  const { disciplines, addDiscipline, removeDiscipline } = useFocusPlan();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    professor: "",
    difficulty: "medio" as Difficulty,
    weeklyHours: 4,
    color: PALETTE[0],
  });

  const submit = () => {
    if (!form.name.trim()) {
      toast.error("Informe o nome da disciplina.");
      return;
    }
    addDiscipline(form);
    toast.success("Disciplina adicionada!");
    setOpen(false);
    setForm({ name: "", professor: "", difficulty: "medio", weeklyHours: 4, color: PALETTE[0] });
  };

  return (
    <AppShell
      title="Disciplinas"
      subtitle="Cadastre as matérias que você precisa estudar."
      actions={
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary">
              <Plus className="mr-2 h-4 w-4" /> Nova disciplina
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cadastrar disciplina</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="grid gap-2">
                <Label>Nome</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ex: Cálculo I" />
              </div>
              <div className="grid gap-2">
                <Label>Professor</Label>
                <Input value={form.professor} onChange={(e) => setForm({ ...form, professor: e.target.value })} placeholder="Nome do professor" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Dificuldade</Label>
                  <Select value={form.difficulty} onValueChange={(v) => setForm({ ...form, difficulty: v as Difficulty })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="facil">Fácil</SelectItem>
                      <SelectItem value="medio">Médio</SelectItem>
                      <SelectItem value="dificil">Difícil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Horas / semana</Label>
                  <Input type="number" min={1} max={40} value={form.weeklyHours} onChange={(e) => setForm({ ...form, weeklyHours: Number(e.target.value) })} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Cor</Label>
                <div className="flex flex-wrap gap-2">
                  {PALETTE.map((c) => (
                    <button
                      key={c}
                      onClick={() => setForm({ ...form, color: c })}
                      className={`h-8 w-8 rounded-full border-2 transition-transform ${form.color === c ? "scale-110 border-foreground" : "border-transparent"}`}
                      style={{ background: c }}
                    />
                  ))}
                </div>
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
      {disciplines.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
          <BookOpen className="mx-auto h-10 w-10 text-muted-foreground" />
          <p className="mt-3 text-sm text-muted-foreground">Nenhuma disciplina cadastrada.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {disciplines.map((d) => (
            <div key={d.id} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-card">
              <div className="absolute inset-x-0 top-0 h-1" style={{ background: d.color }} />
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="truncate text-base font-semibold">{d.name}</h3>
                  <p className="mt-0.5 truncate text-sm text-muted-foreground">{d.professor || "—"}</p>
                </div>
                <button
                  onClick={() => { removeDiscipline(d.id); toast.success("Removida."); }}
                  className="rounded-md p-1.5 text-muted-foreground opacity-0 transition-opacity hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">{difficultyLabel[d.difficulty]}</span>
                <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">{d.weeklyHours}h / semana</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </AppShell>
  );
}
