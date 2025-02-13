import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; // Import useLocation
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

// App component that handles routes and context
function App() {
  const [isCaptchaVerified, setIsCaptchaVerified] = useState<boolean | null>(null); // Change state type to `null | boolean`

  // Vérifie l'état du CAPTCHA à chaque chargement de page
  useEffect(() => {
    const isVerified = localStorage.getItem("recaptcha_verified") === "true";
    setIsCaptchaVerified(isVerified);
  }, []);

  // Si `isCaptchaVerified` est `null`, on affiche rien jusqu'à ce que la vérification se fasse
  if (isCaptchaVerified === null) {
    return null; // ou un indicateur de chargement, si tu préfères
  }

  return (
    <QueryClientProvider client={queryClient}>
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
                <Route path="*" element={<Navigate to="/captcha" />} />
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
