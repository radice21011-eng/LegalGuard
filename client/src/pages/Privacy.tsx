import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function Privacy() {
  const { toast } = useToast();

  const { data: privacyDoc } = useQuery({
    queryKey: ["/api/legal/privacy"],
  });

  const handleGDPRRequest = async (requestType: string) => {
    try {
      const email = prompt("Vă rugăm să introduceți adresa de email:");
      if (!email) return;

      await apiRequest("POST", "/api/gdpr/request", {
        email,
        requestType,
        details: { source: "privacy_page" }
      });

      toast({
        title: "Cerere GDPR trimisă",
        description: "Cererea dvs. a fost înregistrată și va fi procesată în maxim 30 de zile.",
      });
    } catch (error) {
      toast({
        title: "Eroare",
        description: "A apărut o eroare la trimiterea cererii GDPR.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 font-display" data-testid="privacy-page-title">
            Politica de Confidențialitate & GDPR
          </h1>
          
          {/* Introduction */}
          <Card className="mb-8 border-2 border-emerald-500/20">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="bg-emerald-500 p-3 rounded-lg mr-4">
                  <i className="fas fa-shield-alt text-white"></i>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold" data-testid="privacy-intro-title">
                    Protecția Datelor Personale
                  </h2>
                  <div className="text-sm text-muted-foreground">Conform GDPR - Regulamentul UE 2016/679</div>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-4" data-testid="privacy-intro-text">
                Această politică de confidențialitate explică cum colectăm, utilizăm, stocăm și protejăm 
                informațiile dvs. personale în conformitate cu Regulamentul General privind Protecția Datelor (GDPR) 
                și legile aplicabile de protecție a datelor din România.
              </p>
              
              <div className="bg-emerald-500/10 p-4 rounded-lg">
                <p className="text-sm">
                  <strong>Operator de date:</strong> Ervin Remus Radosavlevici<br />
                  <strong>Contact DPO:</strong> ervin210@icloud.com<br />
                  <strong>Ultima actualizare:</strong> 1 septembrie 2025
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Data Collection */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-6" data-testid="data-collection-title">
                1. Ce Date Colectăm
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Date de Identificare</h3>
                  <ul className="text-sm text-muted-foreground space-y-2 ml-4">
                    <li>• Numele complet (furnizat voluntar prin formulare de contact)</li>
                    <li>• Adresa de email (pentru comunicare și răspunsuri)</li>
                    <li>• Informații de contact (telefon, adresa - doar dacă sunt furnizate)</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-3">Date Tehnice</h3>
                  <ul className="text-sm text-muted-foreground space-y-2 ml-4">
                    <li>• Adresa IP (pentru securitate și prevenirea abuzurilor)</li>
                    <li>• Informații despre browser și dispozitiv</li>
                    <li>• Date de utilizare și navigare (cookies esențiale)</li>
                    <li>• Logs de acces pentru auditurile de securitate</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-3">Date de Comunicare</h3>
                  <ul className="text-sm text-muted-foreground space-y-2 ml-4">
                    <li>• Mesajele trimise prin formulare de contact</li>
                    <li>• Corespondența email</li>
                    <li>• Feedback și comentarii (doar dacă sunt furnizate)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Usage */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-6" data-testid="data-usage-title">
                2. Cum Utilizăm Datele
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-primary p-2 rounded-lg mr-4 mt-1">
                    <i className="fas fa-envelope text-white text-sm"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold">Comunicare</h3>
                    <p className="text-sm text-muted-foreground">
                      Pentru a răspunde la întrebările dvs., solicitările de investiție și cererile de informații despre proiect.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary p-2 rounded-lg mr-4 mt-1">
                    <i className="fas fa-shield text-white text-sm"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold">Securitate</h3>
                    <p className="text-sm text-muted-foreground">
                      Pentru protecția site-ului împotriva accesului neautorizat, spam-ului și încălcărilor de securitate.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary p-2 rounded-lg mr-4 mt-1">
                    <i className="fas fa-gavel text-white text-sm"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold">Conformitate Legală</h3>
                    <p className="text-sm text-muted-foreground">
                      Pentru îndeplinirea obligațiilor legale, inclusiv auditurile de securitate și protecția proprietății intelectuale.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary p-2 rounded-lg mr-4 mt-1">
                    <i className="fas fa-chart-line text-white text-sm"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold">Îmbunătățirea Serviciilor</h3>
                    <p className="text-sm text-muted-foreground">
                      Pentru analiza utilizării site-ului și îmbunătățirea experienței utilizatorilor (doar date anonimizate).
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* GDPR Rights */}
          <Card className="mb-8 border-2 border-blue-500/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-6" data-testid="gdpr-rights-title">
                3. Drepturile Dvs. GDPR
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-blue-500/10 rounded-lg">
                    <h3 className="font-semibold mb-2">Dreptul la Informare</h3>
                    <p className="text-sm text-muted-foreground">
                      Aveți dreptul să știți ce date colectăm și cum le utilizăm.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-500/10 rounded-lg">
                    <h3 className="font-semibold mb-2">Dreptul de Acces</h3>
                    <p className="text-sm text-muted-foreground">
                      Puteți solicita o copie a datelor personale pe care le deținem despre dvs.
                    </p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="mt-2"
                      onClick={() => handleGDPRRequest("access")}
                      data-testid="button-gdpr-access"
                    >
                      Solicitare Acces
                    </Button>
                  </div>
                  
                  <div className="p-4 bg-blue-500/10 rounded-lg">
                    <h3 className="font-semibold mb-2">Dreptul la Rectificare</h3>
                    <p className="text-sm text-muted-foreground">
                      Puteți cere corectarea datelor inexacte sau incomplete.
                    </p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="mt-2"
                      onClick={() => handleGDPRRequest("rectification")}
                      data-testid="button-gdpr-rectification"
                    >
                      Solicitare Rectificare
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-red-500/10 rounded-lg">
                    <h3 className="font-semibold mb-2">Dreptul la Ștergere</h3>
                    <p className="text-sm text-muted-foreground">
                      "Dreptul de a fi uitat" - puteți solicita ștergerea datelor dvs.
                    </p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="mt-2"
                      onClick={() => handleGDPRRequest("deletion")}
                      data-testid="button-gdpr-deletion"
                    >
                      Solicitare Ștergere
                    </Button>
                  </div>
                  
                  <div className="p-4 bg-green-500/10 rounded-lg">
                    <h3 className="font-semibold mb-2">Dreptul la Portabilitate</h3>
                    <p className="text-sm text-muted-foreground">
                      Puteți solicita datele într-un format structurat și lizibil.
                    </p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="mt-2"
                      onClick={() => handleGDPRRequest("portability")}
                      data-testid="button-gdpr-portability"
                    >
                      Solicitare Portabilitate
                    </Button>
                  </div>
                  
                  <div className="p-4 bg-yellow-500/10 rounded-lg">
                    <h3 className="font-semibold mb-2">Dreptul la Restricționare</h3>
                    <p className="text-sm text-muted-foreground">
                      Puteți solicita limitarea procesării datelor în anumite circumstanțe.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cookies */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-6" data-testid="cookies-title">
                4. Politica de Cookies
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Cookies Esențiale</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Aceste cookies sunt necesare pentru funcționarea de bază a site-ului și nu pot fi dezactivate.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                    <li>• Cookie-uri de sesiune pentru autentificare</li>
                    <li>• Preferințe de limbă</li>
                    <li>• Protecție CSRF și securitate</li>
                    <li>• Consimțământ GDPR</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Cookies de Securitate</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Utilizate pentru protecția împotriva atacurilor și monitorizarea activității suspecte.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                    <li>• Rate limiting pentru prevenirea spam-ului</li>
                    <li>• Detectarea încălcărilor de copyright</li>
                    <li>• Monitorizarea accesului neautorizat</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-6" data-testid="security-title">
                5. Securitatea Datelor
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Măsuri Tehnice</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Criptare SSL/TLS pentru toate conexiunile</li>
                    <li>• Backup-uri regulate și securizate</li>
                    <li>• Actualizări de securitate automate</li>
                    <li>• Monitorizare 24/7 a sistemelor</li>
                    <li>• Protecție împotriva atacurilor DDoS</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Măsuri Organizaționale</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Acces restricționat la datele personale</li>
                    <li>• Politici stricte de confidențialitate</li>
                    <li>• Audit regulat al activităților</li>
                    <li>• Formare în protecția datelor</li>
                    <li>• Proceduri de răspuns la incidente</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact & Complaints */}
          <Card className="border-2 border-primary/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-6" data-testid="contact-complaints-title">
                6. Contact și Reclamații
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4">Contact pentru Protecția Datelor</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>DPO:</strong> Ervin Remus Radosavlevici</div>
                    <div><strong>Email:</strong> ervin210@icloud.com</div>
                    <div><strong>Timp de răspuns:</strong> Maxim 72 de ore</div>
                    <div><strong>Procesare cereri GDPR:</strong> Maxim 30 de zile</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-4">Autoritatea de Supraveghere</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div><strong>Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP)</strong></div>
                    <div>B-dul G-ral. Gheorghe Magheru nr. 28-30, Sector 1, București</div>
                    <div>Tel: +40.318.059.211</div>
                    <div>Email: anspdcp@dataprotection.ro</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                <p className="text-sm">
                  <strong>Notă:</strong> Aveți dreptul să depuneți o plângere la autoritatea de supraveghere 
                  dacă considerați că prelucrarea datelor dvs. personale încalcă GDPR.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
