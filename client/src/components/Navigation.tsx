import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState("RO");

  const toggleLanguage = () => {
    setLanguage(prev => prev === "RO" ? "EN" : "RO");
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-b border-border z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-xl font-bold text-primary hover:text-accent transition-colors">
              Moldova Nouă 2025
            </Link>
            <div className="hidden md:block text-sm text-muted-foreground copyright-protected">
              © 2025 Ervin Remus Radosavlevici
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => scrollToSection('overview')}
              className="text-sm hover:text-primary transition-colors"
              data-testid="nav-overview"
            >
              Prezentare
            </button>
            <button 
              onClick={() => scrollToSection('sites')}
              className="text-sm hover:text-primary transition-colors"
              data-testid="nav-sites"
            >
              Situri
            </button>
            <button 
              onClick={() => scrollToSection('children')}
              className="text-sm hover:text-primary transition-colors"
              data-testid="nav-children"
            >
              Copii
            </button>
            <button 
              onClick={() => scrollToSection('transport')}
              className="text-sm hover:text-primary transition-colors"
              data-testid="nav-transport"
            >
              Transport
            </button>
            <button 
              onClick={() => scrollToSection('robotics')}
              className="text-sm hover:text-primary transition-colors"
              data-testid="nav-robotics"
            >
              Robotică
            </button>
            <button 
              onClick={() => scrollToSection('economics')}
              className="text-sm hover:text-primary transition-colors"
              data-testid="nav-economics"
            >
              Economic
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-sm hover:text-primary transition-colors"
              data-testid="nav-contact"
            >
              Contact
            </button>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="text-sm"
              data-testid="button-language-toggle"
            >
              {language === "RO" ? "EN" : "RO"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
              data-testid="button-mobile-menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-border py-4">
            <div className="flex flex-col space-y-2">
              <button 
                onClick={() => scrollToSection('overview')}
                className="text-left text-sm hover:text-primary transition-colors py-2"
                data-testid="mobile-nav-overview"
              >
                Prezentare
              </button>
              <button 
                onClick={() => scrollToSection('sites')}
                className="text-left text-sm hover:text-primary transition-colors py-2"
                data-testid="mobile-nav-sites"
              >
                Situri
              </button>
              <button 
                onClick={() => scrollToSection('children')}
                className="text-left text-sm hover:text-primary transition-colors py-2"
                data-testid="mobile-nav-children"
              >
                Copii
              </button>
              <button 
                onClick={() => scrollToSection('transport')}
                className="text-left text-sm hover:text-primary transition-colors py-2"
                data-testid="mobile-nav-transport"
              >
                Transport
              </button>
              <button 
                onClick={() => scrollToSection('robotics')}
                className="text-left text-sm hover:text-primary transition-colors py-2"
                data-testid="mobile-nav-robotics"
              >
                Robotică
              </button>
              <button 
                onClick={() => scrollToSection('economics')}
                className="text-left text-sm hover:text-primary transition-colors py-2"
                data-testid="mobile-nav-economics"
              >
                Economic
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-left text-sm hover:text-primary transition-colors py-2"
                data-testid="mobile-nav-contact"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
