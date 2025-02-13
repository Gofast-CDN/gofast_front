import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

export default function CaptchaPage({ setIsVerified }) {
  const navigate = useNavigate();
  const location = useLocation();
  const recaptchaRef = React.useRef();

  const handleVerification = async () => {
    const token = recaptchaRef.current.getValue();
    if (!token) {
      alert("Veuillez valider le reCAPTCHA pour continuer.");
      return;
    }

    try {
      const response = await fetch("http://localhost:80/api/v1/captcha/verify-recaptcha", {
        method: "POST",
        body: JSON.stringify({ token }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      if (result.success) {
        localStorage.setItem("recaptcha_verified", "true");
        setIsVerified(true);

        // Rediriger l'utilisateur vers la page précédente ou la page d'accueil par défaut
        const from = location.state?.from || "/";
        navigate(from, { replace: true });
      } else {
        alert("Échec de la validation reCAPTCHA.");
      }
    } catch (error) {
      console.error("Erreur de vérification reCAPTCHA", error);
    }
  };

  return (
    <div>
      <h1>Veuillez valider le reCAPTCHA pour accéder au site</h1>
      <ReCAPTCHA
        sitekey="6LeQLdYqAAAAAGPM4Qn7q3Fys1xuijRoRDG6niho" // Remplace par ta clé publique reCAPTCHA v2
        ref={recaptchaRef}
      />
      <button onClick={handleVerification}>Valider</button>
    </div>
  );
}
