import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  BookOpen,
  Brain,
  Calendar,
  CalendarCheck,
  ClipboardList,
  FileText,
  LayoutDashboard,
  LogOut,
  Sparkles,
  TrendingUp,
  Clock4,
} from "lucide-react";
import { useEffect, type ReactNode } from "react";
import { useFocusPlan } from "@/lib/focusplan/store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/disciplinas", label: "Disciplinas", icon: BookOpen },
  { to: "/avaliacoes", label: "Provas e entregas", icon: ClipboardList },
  { to: "/disponibilidade", label: "Disponibilidade", icon: Clock4 },
  { to: "/plano", label: "Plano inteligente", icon: Sparkles },
  { to: "/calendario", label: "Calendário", icon: Calendar },
  { to: "/progresso", label: "Progresso", icon: TrendingUp },
  { to: "/documentacao", label: "Documentação", icon: FileText },
] as const;

export function AppShell({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const { user, logout } = useFocusPlan();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!user) navigate({ to: "/login" });
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-gradient-soft">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
        <div className="flex h-16 items-center gap-2 px-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
            <Brain className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-base font-bold tracking-tight">FocusPlan</span>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {nav.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-sidebar-border p-3">
          <div className="flex items-center gap-3 rounded-lg px-2 py-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-primary text-sm font-semibold text-primary-foreground">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium">{user.name}</div>
              <div className="truncate text-xs text-muted-foreground">{user.email}</div>
            </div>
            <button
              onClick={() => {
                logout();
                navigate({ to: "/" });
              }}
              className="rounded-md p-1.5 text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
              title="Sair"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile top */}
        <div className="flex h-14 items-center justify-between border-b border-border bg-card px-4 lg:hidden">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
              <Brain className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold">FocusPlan</span>
          </Link>
          <Button size="sm" variant="ghost" onClick={() => { logout(); navigate({ to: "/" }); }}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>

        {/* Mobile nav scroll */}
        <div className="overflow-x-auto border-b border-border bg-card px-4 py-2 lg:hidden">
          <div className="flex gap-1">
            {nav.map((item) => {
              const active = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium",
                    active ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                  )}
                >
                  <item.icon className="h-3.5 w-3.5" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        <main className="flex-1 px-4 py-6 md:px-8 md:py-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h1>
                {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
              </div>
              {actions}
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export { CalendarCheck };
