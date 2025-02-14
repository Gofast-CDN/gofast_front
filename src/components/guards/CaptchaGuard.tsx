import { Navigate, useLocation } from "react-router-dom";
import { useCaptcha } from "@/hooks/captcha/useCaptcha";

export function CaptchaGuard({ children }: { children: React.ReactNode }) {
  const { isCaptchaVerified } = useCaptcha();
  const location = useLocation();

  if (!isCaptchaVerified) {
    return (
      <Navigate to="/captcha" state={{ from: location.pathname }} replace />
    );
  }

  return <>{children}</>;
}
