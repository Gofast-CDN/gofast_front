import { createContext } from "react";

export interface CaptchaContextType {
  isCaptchaVerified: boolean | null;
  setVerified: (verified: boolean) => void;
  resetVerification: () => void;
}

export const CaptchaContext = createContext<CaptchaContextType | null>(null);
