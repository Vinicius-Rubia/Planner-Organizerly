import { Header } from "@/components/header";
import { Outlet } from "react-router-dom";

export function BaseLayout() {
  return (
    <>
      <Header />
      <div className="m-10">
        <Outlet />
      </div>
    </>
  );
}
