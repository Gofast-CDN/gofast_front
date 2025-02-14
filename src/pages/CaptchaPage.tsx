import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCaptcha } from "@/hooks/captcha/useCaptcha";

export default function CaptchaPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setVerified } = useCaptcha();
  const recaptchaRef = React.useRef<ReCAPTCHA | null>(null);

  const handleVerification = async () => {
    const token = recaptchaRef.current?.getValue();
    if (!token) {
      alert("Veuillez valider le reCAPTCHA pour continuer.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:80/api/v1/captcha/verify-recaptcha",
        {
          method: "POST",
          body: JSON.stringify({ token }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const result = await response.json();
      if (result.success) {
        setVerified(true);
        const from = location.state?.from || "/login";
        void navigate(from, { replace: true });
      } else {
        alert("Échec de la validation reCAPTCHA.");
      }
    } catch (error) {
      console.error("Erreur de vérification reCAPTCHA", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold text-center">
            Valider le CAPTCHA pour accéder au site
          </h1>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <ReCAPTCHA
            sitekey="6LeQLdYqAAAAAGPM4Qn7q3Fys1xuijRoRDG6niho"
            ref={recaptchaRef}
          />
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={handleVerification}>Valider</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
