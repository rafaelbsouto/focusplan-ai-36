import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type {
  Assessment,
  AvailabilitySlot,
  Discipline,
  PlanItem,
} from "./types";
import { seedAssessments, seedAvailability, seedDisciplines } from "./seed";
import { generatePlan } from "./ai";

const KEY = "focusplan_state_v1";
const AUTH_KEY = "focusplan_auth_v1";

interface State {
  disciplines: Discipline[];
  assessments: Assessment[];
  availability: AvailabilitySlot[];
  plan: PlanItem[];
}

interface AuthUser {
  name: string;
  email: string;
}

interface Ctx extends State {
  user: AuthUser | null;
  login: (email: string, name?: string) => void;
  logout: () => void;
  addDiscipline: (d: Omit<Discipline, "id">) => void;
  updateDiscipline: (id: string, d: Partial<Discipline>) => void;
  removeDiscipline: (id: string) => void;
  addAssessment: (a: Omit<Assessment, "id">) => void;
  updateAssessment: (id: string, a: Partial<Assessment>) => void;
  removeAssessment: (id: string) => void;
  addAvailability: (s: Omit<AvailabilitySlot, "id">) => void;
  updateAvailability: (id: string, s: Partial<AvailabilitySlot>) => void;
  removeAvailability: (id: string) => void;
  generate: () => void;
  togglePlanItem: (id: string) => void;
  updatePlanItem: (id: string, patch: Partial<PlanItem>) => void;
  resetSeed: () => void;
}

const Context = createContext<Ctx | null>(null);

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function loadState(): State {
  if (typeof window === "undefined") {
    return { disciplines: seedDisciplines, assessments: seedAssessments, availability: seedAvailability, plan: [] };
  }
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as State;
  } catch {}
  const initial: State = {
    disciplines: seedDisciplines,
    assessments: seedAssessments,
    availability: seedAvailability,
    plan: [],
  };
  initial.plan = generatePlan(initial.disciplines, initial.assessments, initial.availability);
  return initial;
}

function loadUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

export function FocusPlanProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(() => loadState());
  const [user, setUser] = useState<AuthUser | null>(() => loadUser());

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  useEffect(() => {
    try {
      if (user) localStorage.setItem(AUTH_KEY, JSON.stringify(user));
      else localStorage.removeItem(AUTH_KEY);
    } catch {}
  }, [user]);

  const login = useCallback((email: string, name?: string) => {
    const userName = name || email.split("@")[0].replace(/[._-]/g, " ");
    setUser({ email, name: userName.charAt(0).toUpperCase() + userName.slice(1) });
  }, []);
  const logout = useCallback(() => setUser(null), []);

  const addDiscipline = (d: Omit<Discipline, "id">) =>
    setState((s) => ({ ...s, disciplines: [...s.disciplines, { ...d, id: uid() }] }));
  const updateDiscipline = (id: string, d: Partial<Discipline>) =>
    setState((s) => ({ ...s, disciplines: s.disciplines.map((x) => (x.id === id ? { ...x, ...d } : x)) }));
  const removeDiscipline = (id: string) =>
    setState((s) => ({ ...s, disciplines: s.disciplines.filter((x) => x.id !== id) }));

  const addAssessment = (a: Omit<Assessment, "id">) =>
    setState((s) => ({ ...s, assessments: [...s.assessments, { ...a, id: uid() }] }));
  const updateAssessment = (id: string, a: Partial<Assessment>) =>
    setState((s) => ({ ...s, assessments: s.assessments.map((x) => (x.id === id ? { ...x, ...a } : x)) }));
  const removeAssessment = (id: string) =>
    setState((s) => ({ ...s, assessments: s.assessments.filter((x) => x.id !== id) }));

  const addAvailability = (slot: Omit<AvailabilitySlot, "id">) =>
    setState((s) => ({ ...s, availability: [...s.availability, { ...slot, id: uid() }] }));
  const updateAvailability = (id: string, slot: Partial<AvailabilitySlot>) =>
    setState((s) => ({ ...s, availability: s.availability.map((x) => (x.id === id ? { ...x, ...slot } : x)) }));
  const removeAvailability = (id: string) =>
    setState((s) => ({ ...s, availability: s.availability.filter((x) => x.id !== id) }));

  const generate = () =>
    setState((s) => ({ ...s, plan: generatePlan(s.disciplines, s.assessments, s.availability) }));

  const togglePlanItem = (id: string) =>
    setState((s) => ({ ...s, plan: s.plan.map((p) => (p.id === id ? { ...p, done: !p.done } : p)) }));

  const updatePlanItem = (id: string, patch: Partial<PlanItem>) =>
    setState((s) => ({ ...s, plan: s.plan.map((p) => (p.id === id ? { ...p, ...patch } : p)) }));

  const resetSeed = () => {
    const init: State = {
      disciplines: seedDisciplines,
      assessments: seedAssessments,
      availability: seedAvailability,
      plan: [],
    };
    init.plan = generatePlan(init.disciplines, init.assessments, init.availability);
    setState(init);
  };

  const value = useMemo<Ctx>(
    () => ({
      ...state,
      user,
      login,
      logout,
      addDiscipline,
      updateDiscipline,
      removeDiscipline,
      addAssessment,
      updateAssessment,
      removeAssessment,
      addAvailability,
      updateAvailability,
      removeAvailability,
      generate,
      togglePlanItem,
      updatePlanItem,
      resetSeed,
    }),
    [state, user, login, logout],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useFocusPlan() {
  const ctx = useContext(Context);
  if (!ctx) throw new Error("useFocusPlan must be used inside FocusPlanProvider");
  return ctx;
}
