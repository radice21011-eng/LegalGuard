import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";

export default function Legal() {
  const { data: copyrightDoc } = useQuery({
    queryKey: ["/api/legal/copyright"],
  });

  const { data: ndaDoc } = useQuery({
    queryKey: ["/api/legal/nda"],
  });

  const { data: termsDoc } = useQuery({
    queryKey: ["/api/legal/terms"],
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 font-display" data-testid="legal-page-title">
            Documente Legale & Protecție
          </h1>
          
          {/* Copyright Section */}
          <Card className="mb-8 border-2 border-destructive/20 nda-protected" id="copyright">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="bg-destructive p-3 rounded-lg mr-4">
                  <i className="fas fa-shield-alt text-white"></i>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold" data-testid="copyright-section-title">
                    Copyright & NDA Protection
                  </h2>
                  <div className="text-sm text-muted-foreground">Protecție proprietate intelectuală</div>
                </div>
              </div>
              
              <div className="space-y-4 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="text-destructive font-semibold" data-testid="copyright-status">ACTIV</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Versiune:</span>
                    <span data-testid="copyright-version">2025.1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Proprietar:</span>
                    <span data-testid="copyright-owner">Ervin Remus Radosavlevici</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Contact:</span>
                    <span data-testid="copyright-contact">ervin210@icloud.com</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-destructive/10 rounded-lg">
                <h3 className="font-semibold text-destructive mb-2">Termeni Copyright</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Toate drepturile de autor aparțin exclusiv lui Ervin Remus Radosavlevici</li>
                  <li>• Reproducerea, distribuirea sau modificarea conținutului este strict interzisă</li>
                  <li>• Încălcarea drepturilor va rezulta în acțiuni legale și blocarea accesului</li>
                  <li>• Pentru licențe comerciale, contactați: ervin210@icloud.com</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* GDPR Section */}
          <Card className="mb-8 border-2 border-emerald-500/20" id="gdpr">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="bg-emerald-500 p-3 rounded-lg mr-4">
                  <i className="fas fa-user-shield text-white"></i>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold" data-testid="gdpr-section-title">
                    GDPR Compliance
                  </h2>
                  <div className="text-sm text-muted-foreground">Protecția datelor conform UE</div>
                </div>
              </div>
              
              <div className="space-y-4 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="text-emerald-500 font-semibold" data-testid="gdpr-status">CONFORM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Versiune:</span>
                    <span data-testid="gdpr-version">GDPR 2.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ultima actualizare:</span>
                    <span data-testid="gdpr-updated">2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span>DPO Contact:</span>
                    <span data-testid="gdpr-dpo">ervin210@icloud.com</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-emerald-500/10 rounded-lg">
                <h3 className="font-semibold text-emerald-500 mb-2">Drepturile GDPR</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Dreptul la informare și acces la datele personale</li>
                  <li>• Dreptul la rectificarea datelor inexacte</li>
                  <li>• Dreptul la ștergerea datelor ("dreptul de a fi uitat")</li>
                  <li>• Dreptul la portabilitatea datelor</li>
                  <li>• Dreptul de a face reclamații la autoritatea de supraveghere</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Government Correspondence */}
          <Card className="mb-8 border-2 border-blue-500/20">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="bg-blue-500 p-3 rounded-lg mr-4">
                  <i className="fas fa-university text-white"></i>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold" data-testid="government-section-title">
                    Corespondență Guvernamentală
                  </h2>
                  <div className="text-sm text-muted-foreground">Documente oficiale și aprobare</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                  <div>
                    <div className="font-semibold">Ministerul Mediului, Apelor și Pădurilor</div>
                    <div className="text-sm text-muted-foreground">Scrisoare oficială pentru hub-ul de reciclare Baziaș</div>
                  </div>
                  <span className="text-blue-500 font-semibold" data-testid="ministry-status">TRIMIS</span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                  <div>
                    <div className="font-semibold">Primăria Moldova Nouă</div>
                    <div className="text-sm text-muted-foreground">Propunere dezvoltare și colaborare locală</div>
                  </div>
                  <span className="text-blue-500 font-semibold" data-testid="mayor-status">TRIMIS</span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                  <div>
                    <div className="font-semibold">Consiliul Județean Caraș-Severin</div>
                    <div className="text-sm text-muted-foreground">Includere în strategia de dezvoltare județeană</div>
                  </div>
                  <span className="text-yellow-500 font-semibold" data-testid="county-status">ÎN EVALUARE</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Terms of Service */}
          <Card className="border-2 border-primary/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-6" data-testid="terms-section-title">
                Termeni și Condiții de Utilizare
              </h2>
              
              <div className="space-y-6 text-sm text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">1. Proprietate Intelectuală</h3>
                  <p>Toate elementele acestui proiect, inclusiv dar fără a se limita la texte, imagini, diagrame, planuri și concepte, sunt proprietatea exclusivă a lui Ervin Remus Radosavlevici și sunt protejate de legile drepturilor de autor naționale și internaționale.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-2">2. Utilizare Permisă</h3>
                  <p>Accesul la acest site este permis exclusiv în scopuri informative. Orice altă utilizare necesită autorizare scrisă prealabilă de la proprietar.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-2">3. Confidențialitate</h3>
                  <p>Informațiile prezentate sunt confidențiale și protejate prin acorduri NDA. Divulgarea neautorizată constituie încălcare contractuală și legală.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-2">4. Sancțiuni</h3>
                  <p>Încălcarea acestor termeni va rezulta în: blocarea imediată a accesului, urmărire penală pentru încălcarea drepturilor de autor, și daune materiale și morale.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-2">5. Contact Legal</h3>
                  <p>Pentru orice întrebări legale sau solicitări de licențiere, contactați: <strong>ervin210@icloud.com</strong></p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
