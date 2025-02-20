import { BaseLayout } from "@/layouts/base-layout";
import { PlannerDetails } from "@/pages/planner-details";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Planners } from "../pages/planners";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route path="/" element={<Planners />} />
          <Route path="/:plannerId" element={<PlannerDetails />} />
        </Route>

        <Route path="/*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
