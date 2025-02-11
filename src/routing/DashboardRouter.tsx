import DashboardLayout from "@/layouts/DashboardLayout";
import NotFound from "@/pages/NotFound";
import { Route, Routes } from "react-router-dom";
import SpaceRouter from "./SpaceRouter";

export default function DashboardRouter() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<div>home</div>} />
        <Route path="/my-space/*" element={<SpaceRouter />} />
        <Route path="/trash" element={<div>trash</div>} />
        <Route path="/settings" element={<div>settings</div>} />
        <Route path="/*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
