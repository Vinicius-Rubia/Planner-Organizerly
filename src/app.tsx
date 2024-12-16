import { ThemeProvider } from "./components/theme-provider";

export function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="planner-organizerly-theme">
      <div>Planner Organizerly</div>
    </ThemeProvider>
  );
}
