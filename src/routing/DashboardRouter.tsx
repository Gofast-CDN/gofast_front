import DashboardLayout from "@/layouts/DashboardLayout";
import FolderDetails from "@/pages/FolderDetails";
import MySpace from "@/pages/MySpace";
import NotFound from "@/pages/NotFound";
import { Route, Routes } from "react-router-dom";

export default function DashboardRouter() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<div>home</div>} />
        <Route path="/my-space" element={<MySpace />} />
        <Route path="/my-space/:id" element={<FolderDetails />} />
        <Route path="/trash" element={<div>trash</div>} />
        <Route path="/settings" element={<div>settings</div>} />
        <Route path="/*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
