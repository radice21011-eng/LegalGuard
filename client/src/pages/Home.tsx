import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { DevelopmentSites } from "@/components/DevelopmentSites";
import { ChildrenUniverse } from "@/components/ChildrenUniverse";
import { Transport } from "@/components/Transport";
import { Robotics } from "@/components/Robotics";
import { Economics } from "@/components/Economics";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <Hero />
      <DevelopmentSites />
      <ChildrenUniverse />
      <Transport />
      <Robotics />
      <Economics />
      <Contact />
      
      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-xl font-bold text-primary mb-4">Moldova Nouă 2025</div>
              <p className="text-sm text-muted-foreground mb-4">
                Proiect vizionar pentru dezvoltarea durabilă a regiunii Banat
              </p>
              <div className="text-xs text-muted-foreground copyright-protected">
                © 2025 Ervin Remus Radosavlevici<br />
                Toate drepturile rezervate
              </div>
            </div>
            
            <div>
              <div className="font-semibold mb-4">Sectoare</div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#children" className="hover:text-primary transition-colors">Universul Copiilor</a></li>
                <li><a href="#transport" className="hover:text-primary transition-colors">Transport</a></li>
                <li><a href="#robotics" className="hover:text-primary transition-colors">Robotică</a></li>
                <li><a href="#economics" className="hover:text-primary transition-colors">Economic</a></li>
              </ul>
            </div>
            
            <div>
              <div className="font-semibold mb-4">Legal</div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/legal" className="hover:text-primary transition-colors">Termeni și Condiții</a></li>
                <li><a href="/privacy" className="hover:text-primary transition-colors">Politica Confidențialitate</a></li>
                <li><a href="/legal#copyright" className="hover:text-primary transition-colors">Copyright & NDA</a></li>
                <li><a href="/legal#gdpr" className="hover:text-primary transition-colors">GDPR</a></li>
              </ul>
            </div>
            
            <div>
              <div className="font-semibold mb-4">Contact</div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>ervin210@icloud.com</div>
                <div>radosavlevici.ervin@gmail.com</div>
                <div>Moldova Nouă, România</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center">
            <div className="text-sm text-muted-foreground">
              Acest site respectă GDPR și utilizează măsuri avansate de securitate pentru protecția datelor.
              <br />
              Conținutul este protejat prin drepturi de autor și acorduri NDA.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
