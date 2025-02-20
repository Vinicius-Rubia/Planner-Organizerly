import { CreatePlannerDialog } from "./create-planner-dialog";

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground pt-4 p-10 space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="size-5 rounded-md bg-primary-foreground" />
          <h3 className="text-xl leading-none tracking-tighter font-semibold">
            Planner Organizerly
          </h3>
        </div>
        <CreatePlannerDialog />
      </div>
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold uppercase">
          Organize seus estudos
        </h1>
        <p className="text-lg text-secondary/80">
          O objetivo é facilitar o gerenciamento de seus estdos de forma prática
          e eficiente.
        </p>
      </div>
    </header>
  );
}
