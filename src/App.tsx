import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardRouter from "./routing/DashboardRouter";

// Lazy-loaded components for public routes only
const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const Trash = React.lazy(() => import("./pages/Trash"));

// Non-lazy NotFound since it's used in multiple places
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/trash" element={<Trash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/:userId/*" element={<DashboardRouter />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
