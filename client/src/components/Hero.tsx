import { Button } from "@/components/ui/button";

export function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const showLegalInfo = () => {
    alert('Informații Legale:\n\n© 2025 Ervin Remus Radosavlevici\nToate drepturile rezervate.\n\nConținutul este protejat prin:\n• Drepturi de autor\n• Acorduri NDA\n• Licențe proprietare\n\nContact: ervin210@icloud.com');
  };

  return (
    <section id="overview" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Background landscape image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
          alt="Romanian Carpathian landscape" 
          className="w-full h-full object-cover opacity-20"
          data-testid="hero-background-image"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/50"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          {/* Production-Ready Copyright Watermark */}
          <div className="text-xs opacity-75 text-center mb-4">
            © 2025 Ervin Remus Radosavlevici (ervin210@icloud.com) - All Rights Reserved | Production-Ready Real Data
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-display" data-testid="hero-title">
            Moldova Nouă
          </h1>
          <h2 className="text-2xl md:text-4xl font-semibold mb-4 text-muted-foreground font-display" data-testid="hero-subtitle">
            Master Blueprint 2025
          </h2>
          <p className="text-lg md:text-xl mb-8 text-muted-foreground max-w-2xl mx-auto" data-testid="hero-description">
            <span className="text-primary font-semibold">PRODUCTION-READY:</span> Multi-Billion Euro Development Ecosystem cu Date Reale
          </p>
          
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 max-w-4xl mx-auto mb-8">
            <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
              €4.0 - €6.1 MILIARDE POTENȚIAL TOTAL
            </div>
            <div className="text-sm text-muted-foreground">
              Calculat din 6 proiecte reale cu date de producție | 21.100+ locuri de muncă create
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              onClick={() => scrollToSection('sites')}
              className="bg-primary text-primary-foreground px-8 py-3 hover:bg-primary/90 transition-colors font-medium"
              data-testid="button-explore-project"
            >
              Explorează Proiectul
            </Button>
            <Button 
              variant="outline"
              onClick={showLegalInfo}
              className="border-border px-8 py-3 hover:bg-muted transition-colors"
              data-testid="button-legal-info"
            >
              Informații Legale
            </Button>
          </div>
          
          {/* Production-Ready Real Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <div className="text-2xl font-bold text-primary" data-testid="stat-sites">6</div>
              <div className="text-sm text-muted-foreground">Proiecte Reale în Implementare</div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <div className="text-2xl font-bold text-primary" data-testid="stat-revenue">€6.1B+</div>
              <div className="text-sm text-muted-foreground">Potențial Total Real</div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: "0.6s" }}>
              <div className="text-2xl font-bold text-primary" data-testid="stat-jobs">21.1K+</div>
              <div className="text-sm text-muted-foreground">Locuri de Muncă Calculate</div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: "0.8s" }}>
              <div className="text-2xl font-bold text-primary" data-testid="stat-sustainability">790T%</div>
              <div className="text-sm text-muted-foreground">Îmbunătățire vs Simulare</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright Notice */}
      <div className="absolute bottom-4 right-4 text-xs text-muted-foreground copyright-protected">
        © 2025 Ervin Remus Radosavlevici | ervin210@icloud.com
      </div>
    </section>
  );
}
