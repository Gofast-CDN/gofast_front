import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import useLocation
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FetchOptions, httpClient } from "./lib/http-client";
import DashboardRouter from "./routing/DashboardRouter";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./routing/ProtectedRoute";
import { AuthProvider } from "./hooks/auth/AuthContext";
import { CaptchaProvider } from "@/hooks/captcha/CaptchaContext";
import { CaptchaGuard } from "./components/guards/CaptchaGuard";

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

const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const Trash = React.lazy(() => import("./pages/Trash"));
const CaptchaPage = React.lazy(() => import("./pages/CaptchaPage"));

// App component that handles routes and context
function App() {
  const [isCaptchaVerified, setIsCaptchaVerified] = useState<boolean | null>(
    null
  ); // Change state type to `null | boolean`

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
        <CaptchaProvider>
          <AuthProvider>
            <Routes>
              {/* Public routes */}
              <Route path="/trash" element={<Trash />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/captcha" element={<CaptchaPage />} />

              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/:userId/*"
                element={
                  <CaptchaGuard>
                    <ProtectedRoute>
                      <DashboardRouter />
                    </ProtectedRoute>
                  </CaptchaGuard>
                }
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </CaptchaProvider>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
