import { createContext, useEffect, useState, ReactNode } from "react";

interface CaptchaContextType {
  isCaptchaVerified: boolean | null;
  setVerified: (verified: boolean) => void;
  resetVerification: () => void;
}

export const CaptchaContext = createContext<CaptchaContextType | null>(null);

export function CaptchaProvider({ children }: { children: ReactNode }) {
  const [isCaptchaVerified, setIsCaptchaVerified] = useState<boolean | null>(
    null
  );

  useEffect(() => {
    const isVerified = localStorage.getItem("recaptcha_verified") === "true";
    setIsCaptchaVerified(isVerified);
  }, []);

  const setVerified = (verified: boolean) => {
    localStorage.setItem("recaptcha_verified", String(verified));
    setIsCaptchaVerified(verified);
  };

  const resetVerification = () => {
    localStorage.removeItem("recaptcha_verified");
    setIsCaptchaVerified(false);
  };

  return (
    <CaptchaContext.Provider
      value={{
        isCaptchaVerified,
        setVerified,
        resetVerification,
      }}
    >
      {isCaptchaVerified === null ? null : children}
    </CaptchaContext.Provider>
  );
}
