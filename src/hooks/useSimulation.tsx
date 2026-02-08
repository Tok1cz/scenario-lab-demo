import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  type ReactNode,
} from "react";
import type { components } from "../api-schema/generated";

type HiringSimResponse = components["schemas"]["HiringSimResponse"];

/* ------------------------------------------------------------------ */
/*  Form data shape                                                   */
/* ------------------------------------------------------------------ */

export interface FormData {
  hireType: string;
  cashBuffer: string;
  teamSize: string;
  utilization: string;
  hireCost: string;
  startTiming: string;
  billability: string;
  utilizationDownside: string;
  paymentRisk: string;
}

const INITIAL_FORM: FormData = {
  hireType: "",
  cashBuffer: "",
  teamSize: "",
  utilization: "",
  hireCost: "",
  startTiming: "",
  billability: "",
  utilizationDownside: "",
  paymentRisk: "",
};

/** Conservative defaults matching landing page copy */
const DEFAULT_FORM: FormData = {
  hireType: "capacity",
  cashBuffer: "3-6",
  teamSize: "10",
  utilization: "stretched",
  hireCost: "6-8",
  startTiming: "1month",
  billability: "medium",
  utilizationDownside: "moderate",
  paymentRisk: "medium",
};

/* ------------------------------------------------------------------ */
/*  State                                                             */
/* ------------------------------------------------------------------ */

interface SimulationState {
  formData: FormData;
  /** Whether the user chose "Quick run" (landing defaults) vs. "Customize" */
  isQuickRun: boolean;
  /** Current customizer step (1-4) */
  currentStep: number;
  /** Simulation lifecycle */
  status: "idle" | "loading" | "success" | "error";
  result: HiringSimResponse | null;
  error: string | null;
}

const INITIAL_STATE: SimulationState = {
  formData: INITIAL_FORM,
  isQuickRun: false,
  currentStep: 1,
  status: "idle",
  result: null,
  error: null,
};

/* ------------------------------------------------------------------ */
/*  Actions                                                           */
/* ------------------------------------------------------------------ */

type Action =
  | { type: "SET_FIELD"; field: keyof FormData; value: string }
  | { type: "SET_STEP"; step: number }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "QUICK_RUN" }
  | { type: "START_SIMULATION" }
  | { type: "SIMULATION_SUCCESS"; result: HiringSimResponse }
  | { type: "SIMULATION_ERROR"; error: string }
  | { type: "RESET" };

function reducer(state: SimulationState, action: Action): SimulationState {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        formData: { ...state.formData, [action.field]: action.value },
      };
    case "SET_STEP":
      return { ...state, currentStep: action.step };
    case "NEXT_STEP":
      return { ...state, currentStep: Math.min(state.currentStep + 1, 4) };
    case "PREV_STEP":
      return { ...state, currentStep: Math.max(state.currentStep - 1, 1) };
    case "QUICK_RUN":
      return {
        ...state,
        formData: DEFAULT_FORM,
        isQuickRun: true,
        status: "loading",
      };
    case "START_SIMULATION":
      return { ...state, status: "loading", error: null };
    case "SIMULATION_SUCCESS":
      return { ...state, status: "success", result: action.result };
    case "SIMULATION_ERROR":
      return { ...state, status: "error", error: action.error };
    case "RESET":
      return INITIAL_STATE;
    default:
      return state;
  }
}

/* ------------------------------------------------------------------ */
/*  Context                                                           */
/* ------------------------------------------------------------------ */

interface SimulationContextValue {
  state: SimulationState;
  updateField: (field: keyof FormData, value: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  quickRun: () => void;
  startSimulation: () => void;
  setResult: (result: HiringSimResponse) => void;
  setError: (error: string) => void;
  reset: () => void;
}

const SimulationContext = createContext<SimulationContextValue | null>(null);

export function SimulationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const updateField = useCallback(
    (field: keyof FormData, value: string) =>
      dispatch({ type: "SET_FIELD", field, value }),
    [],
  );

  const nextStep = useCallback(() => dispatch({ type: "NEXT_STEP" }), []);
  const prevStep = useCallback(() => dispatch({ type: "PREV_STEP" }), []);
  const quickRun = useCallback(() => dispatch({ type: "QUICK_RUN" }), []);
  const startSimulation = useCallback(
    () => dispatch({ type: "START_SIMULATION" }),
    [],
  );
  const setResult = useCallback(
    (result: HiringSimResponse) =>
      dispatch({ type: "SIMULATION_SUCCESS", result }),
    [],
  );
  const setError = useCallback(
    (error: string) => dispatch({ type: "SIMULATION_ERROR", error }),
    [],
  );
  const reset = useCallback(() => dispatch({ type: "RESET" }), []);

  return (
    <SimulationContext.Provider
      value={{
        state,
        updateField,
        nextStep,
        prevStep,
        quickRun,
        startSimulation,
        setResult,
        setError,
        reset,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
}

export function useSimulation() {
  const ctx = useContext(SimulationContext);
  if (!ctx) {
    throw new Error("useSimulation must be used within SimulationProvider");
  }
  return ctx;
}
