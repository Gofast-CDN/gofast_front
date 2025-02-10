import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardRouter from "./routing/DashboardRouter";

// Lazy-loaded components
const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />

        <Route path="/dashboard/*" element={<DashboardRouter />} />
      </Routes>
    </Router>
  );
}

export default App;
