import { Button } from "@/components/ui/button";
import { useGDPR } from "@/hooks/useGDPR";

export function GDPRBanner() {
  const { acceptGDPR, showPrivacyPolicy } = useGDPR();

  return (
    <div className="gdpr-banner show border-t border-border" data-testid="gdpr-banner">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            <p data-testid="gdpr-message">
              🍪 Acest site folosește cookies și respectă GDPR. Datele dvs. sunt protejate conform regulamentelor UE.
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={acceptGDPR}
              className="bg-primary text-primary-foreground px-4 py-2 hover:bg-primary/90 transition-colors"
              data-testid="button-gdpr-accept"
            >
              Accept
            </Button>
            <Button 
              variant="outline"
              onClick={showPrivacyPolicy}
              className="border-border px-4 py-2 hover:bg-muted transition-colors"
              data-testid="button-gdpr-privacy"
            >
              Politica de confidențialitate
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
