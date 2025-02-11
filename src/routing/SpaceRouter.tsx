import SpaceLayout from "@/layouts/SpaceLayout";
import MySpace from "@/pages/MySpace";
import NotFound from "@/pages/NotFound";
import { Route, Routes } from "react-router-dom";

export default function SpaceRouter() {
  return (
    <Routes>
      <Route element={<SpaceLayout />}>
        <Route path="/" element={<MySpace />} />
        <Route path="/:id" element={<MySpace />} />
        <Route path="/*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
