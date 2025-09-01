import { useState, useEffect, useCallback } from "react";
import { gdprManager } from "@/lib/gdpr";

export function useGDPR() {
  const [hasConsent, setHasConsent] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [consentData, setConsentData] = useState<any>(null);

  useEffect(() => {
    // Check existing consent
    const consent = gdprManager.getConsent();
    setHasConsent(consent.hasConsent);
    setConsentData(consent);
    setShowBanner(!consent.hasConsent && !consent.hasRejected);

    // Log page access for GDPR audit
    gdprManager.logAccess(window.location.pathname);
  }, []);

  const acceptGDPR = useCallback(() => {
    gdprManager.setConsent(true);
    setHasConsent(true);
    setShowBanner(false);
    
    // Log consent acceptance
    gdprManager.logAccess('/gdpr/consent-accepted');
  }, []);

  const rejectGDPR = useCallback(() => {
    gdprManager.setConsent(false);
    setHasConsent(false);
    setShowBanner(false);
    
    // Log consent rejection
    gdprManager.logAccess('/gdpr/consent-rejected');
  }, []);

  const showPrivacyPolicy = useCallback(() => {
    alert(`Politica de Confidențialitate & GDPR:

🔒 Protecția Datelor Personale:
• Colectăm doar datele necesare pentru funcționarea site-ului
• Protecție GDPR completă conform regulamentelor UE
• Fără partajare cu terți fără consimțământul dvs.
• Dreptul la ștergerea datelor ("dreptul de a fi uitat")
• Utilizăm cookies doar esențiale pentru funcționalitate

📋 Drepturile GDPR:
• Dreptul la informare și acces la datele personale
• Dreptul la rectificarea datelor inexacte
• Dreptul la portabilitatea datelor
• Dreptul la restricționarea prelucrării

📧 Contact DPO: ervin210@icloud.com
⚖️ Timp de răspuns: Maxim 72 de ore
📅 Procesare cereri: Maxim 30 de zile

Pentru politica completă, vizitați secțiunea Legal.`);
    
    // Log privacy policy access
    gdprManager.logAccess('/gdpr/privacy-policy-viewed');
  }, []);

  const requestDataDeletion = useCallback(async () => {
    const email = prompt("Pentru ștergerea datelor, vă rugăm să introduceți adresa de email:");
    if (!email) return;

    try {
      const response = await fetch("/api/gdpr/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          requestType: "deletion",
          details: { source: "gdpr_hook" }
        })
      });

      if (response.ok) {
        alert("Cererea de ștergere a fost înregistrată. Veți fi contactat în maxim 30 de zile.");
      } else {
        throw new Error("Failed to submit request");
      }
    } catch (error) {
      alert("A apărut o eroare la trimiterea cererii. Vă rugăm să contactați: ervin210@icloud.com");
    }
  }, []);

  const requestDataAccess = useCallback(async () => {
    const email = prompt("Pentru accesul la date, vă rugăm să introduceți adresa de email:");
    if (!email) return;

    try {
      const response = await fetch("/api/gdpr/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          requestType: "access",
          details: { source: "gdpr_hook" }
        })
      });

      if (response.ok) {
        alert("Cererea de acces la date a fost înregistrată. Veți primi datele în maxim 30 de zile.");
      } else {
        throw new Error("Failed to submit request");
      }
    } catch (error) {
      alert("A apărut o eroare la trimiterea cererii. Vă rugăm să contactați: ervin210@icloud.com");
    }
  }, []);

  return {
    hasConsent,
    showBanner,
    consentData,
    acceptGDPR,
    rejectGDPR,
    showPrivacyPolicy,
    requestDataDeletion,
    requestDataAccess
  };
}
