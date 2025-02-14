import DashboardLayout from "@/layouts/DashboardLayout";
import NotFound from "@/pages/NotFound";
import { Route, Routes } from "react-router-dom";
import SpaceRouter from "./SpaceRouter";
import React from "react";

const Trash = React.lazy(() => import("../pages/Trash"));

export default function DashboardRouter() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/*" element={<SpaceRouter />} />
        <Route path="/trash" element={<Trash />} />
        <Route path="/settings" element={<div>settings</div>} />
        <Route path="/*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
