import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FetchOptions, httpClient } from "./lib/http-client";
import DashboardRouter from "./routing/DashboardRouter";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./routing/ProtectedRoute";
import { AuthProvider } from "./hooks/auth/AuthContext";
import Home from "./pages/Home"; // Page d'accueil
import CaptchaPage from "./pages/CaptchaPage"; // Page CAPTCHA
import Login from "./pages/Login";
import Register from "./pages/Register";
import Trash from "./pages/Trash";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
      queryFn: async ({ queryKey }) => {
        const [endpoint, options] = queryKey as [
          string,
          FetchOptions | undefined,
        ];
        return httpClient(endpoint, options);
      },
    },
  },
});

function App() {
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  // Vérification de l'état du CAPTCHA au chargement du composant
  useEffect(() => {
    const isVerified = localStorage.getItem("recaptcha_verified") === "true";
    setIsCaptchaVerified(isVerified);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Le Router englobe tout */}
      <Router>
        <AuthProvider>
          <Routes>
            {/* Routes publiques */}
            <Route path="/trash" element={<Trash />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Si le CAPTCHA n'est pas validé, redirige vers la page CAPTCHA */}
            {!isCaptchaVerified ? (
              <>
                <Route path="/captcha" element={<CaptchaPage setIsVerified={setIsCaptchaVerified} />} />
                {/* Redirection vers la page CAPTCHA pour toute autre route */}
                <Route
  path="*"
  element={<Navigate to="/captcha" state={{ from: location.pathname }} />}
/>


              </>
            ) : (
              <>
                {/* Routes protégées */}
                <Route path="/" element={<Home />} />
                <Route
                  path="/:userId/*"
                  element={
                    isCaptchaVerified ? (
                      <ProtectedRoute>
                        <DashboardRouter />
                      </ProtectedRoute>
                    ) : (
                      <Navigate to="/captcha" />
                    )
                  }
                />
              </>
            )}

            {/* Page non trouvée */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
