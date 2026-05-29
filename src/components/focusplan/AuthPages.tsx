import { Link, useNavigate } from "@tanstack/react-router";
import { Brain } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFocusPlan } from "@/lib/focusplan/store";
import { toast } from "sonner";

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-gradient-primary p-12 text-primary-foreground lg:flex lg:flex-col lg:justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
            <Brain className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold">FocusPlan</span>
        </Link>
        <div>
          <h2 className="max-w-md text-3xl font-bold leading-tight">
            "Estudar com clareza mudou tudo. O plano aparece pronto e eu só executo."
          </h2>
          <p className="mt-4 text-sm opacity-80">Ana C. — estudante de Engenharia</p>
        </div>
        <div className="text-xs opacity-70">© FocusPlan</div>
      </div>
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground">
              <Brain className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold">FocusPlan</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>
        </div>
      </div>
    </div>
  );
}

export function LoginPage() {
  const { login } = useFocusPlan();
  const navigate = useNavigate();
  const [email, setEmail] = useState("aluno@focusplan.com");
  const [password, setPassword] = useState("focusplan");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    login(email);
    toast.success("Bem-vindo de volta!");
    navigate({ to: "/dashboard" });
  };

  return (
    <AuthShell
      title="Entrar no FocusPlan"
      subtitle="Acesse seu painel e continue seu plano de estudos."
      footer={
        <>
          Ainda não tem conta?{" "}
          <Link to="/signup" className="font-medium text-primary hover:underline">
            Criar conta
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Senha</Label>
            <Link to="/forgot-password" className="text-xs text-muted-foreground hover:text-foreground">
              Esqueci minha senha
            </Link>
          </div>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <Button type="submit" className="w-full bg-gradient-primary">
          Entrar
        </Button>
      </form>
    </AuthShell>
  );
}

export function SignupPage() {
  const { login } = useFocusPlan();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    login(email, name || undefined);
    toast.success("Conta criada com sucesso!");
    navigate({ to: "/dashboard" });
  };

  return (
    <AuthShell
      title="Criar sua conta"
      subtitle="Comece em segundos. Sem cartão de crédito."
      footer={
        <>
          Já tem conta?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Entrar
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <Button type="submit" className="w-full bg-gradient-primary">
          Criar conta
        </Button>
      </form>
    </AuthShell>
  );
}

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast.success("Se o e-mail existir, enviaremos um link.");
  };

  return (
    <AuthShell
      title="Recuperar senha"
      subtitle="Enviaremos um link para redefinir sua senha."
      footer={
        <Link to="/login" className="font-medium text-primary hover:underline">
          Voltar para o login
        </Link>
      }
    >
      {sent ? (
        <div className="rounded-xl border border-border bg-card p-5 text-sm text-muted-foreground">
          Enviamos instruções para <strong className="text-foreground">{email}</strong>. Verifique sua
          caixa de entrada.
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <Button type="submit" className="w-full bg-gradient-primary">
            Enviar link
          </Button>
        </form>
      )}
    </AuthShell>
  );
}
