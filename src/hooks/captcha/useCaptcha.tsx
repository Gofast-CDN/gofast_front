import { useContext } from "react";
import { CaptchaContext } from "./CaptchaContext";
import { CaptchaContextType } from "@/types/captcha";

export function useCaptcha(): CaptchaContextType {
  const context = useContext(CaptchaContext);
  if (!context) {
    throw new Error("useCaptcha must be used within CaptchaProvider");
  }
  return context;
}
