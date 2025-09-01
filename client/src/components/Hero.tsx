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
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-display" data-testid="hero-title">
            Moldova Nouă
          </h1>
          <h2 className="text-2xl md:text-4xl font-semibold mb-4 text-muted-foreground font-display" data-testid="hero-subtitle">
            Master Blueprint 2025
          </h2>
          <p className="text-lg md:text-xl mb-8 text-muted-foreground max-w-2xl mx-auto" data-testid="hero-description">
            Proiect vizionar de dezvoltare integrată: Turism • Industrie • Transport • Robotică • Copii • Patrimoniu
          </p>
          
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
          
          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <div className="text-2xl font-bold text-primary" data-testid="stat-sites">10</div>
              <div className="text-sm text-muted-foreground">Situri de dezvoltare</div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <div className="text-2xl font-bold text-primary" data-testid="stat-revenue">€2.1B+</div>
              <div className="text-sm text-muted-foreground">Venituri anuale</div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: "0.6s" }}>
              <div className="text-2xl font-bold text-primary" data-testid="stat-jobs">50K+</div>
              <div className="text-sm text-muted-foreground">Locuri de muncă</div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: "0.8s" }}>
              <div className="text-2xl font-bold text-primary" data-testid="stat-sustainability">100%</div>
              <div className="text-sm text-muted-foreground">Sustenabil</div>
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
