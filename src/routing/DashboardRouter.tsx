import DashboardLayout from "@/layouts/DashboardLayout";
import FolderDetails from "@/pages/FolderDetails";
import NotFound from "@/pages/NotFound";
import { Route, Routes } from "react-router-dom";

export default function DashboardRouter() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<div>home</div>} />
        <Route path="/my-space" element={<div>my space</div>} />
        <Route path="/folders/:id" element={<FolderDetails />} />
        <Route path="/trash" element={<div>trash</div>} />
        <Route path="/settings" element={<div>settings</div>} />
        <Route path="/*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
