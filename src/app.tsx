import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/sonner";
import { PlannerProvider } from "./contexts/planner-context";
import { StudyProvider } from "./contexts/study-context";
import { Router } from "./routes/router";

export function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="planner-organizerly-theme">
      <PlannerProvider>
        <StudyProvider>
          <Router />
          <Toaster />
        </StudyProvider>
      </PlannerProvider>
    </ThemeProvider>
  );
}
