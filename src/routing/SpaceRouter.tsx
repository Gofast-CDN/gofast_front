import SpaceLayout from "@/layouts/SpaceLayout";
import Home from "@/pages/Home";
import MySpace from "@/pages/MySpace";
import NotFound from "@/pages/NotFound";
import { Route, Routes } from "react-router-dom";

export default function SpaceRouter() {
  return (
    <Routes>
      <Route element={<SpaceLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/my-space" element={<MySpace />} />
        <Route path="/my-space/:id" element={<MySpace />} />
        <Route path="/*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
