import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "",
    message: ""
  });
  
  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: (data: typeof formData) => apiRequest("POST", "/api/contact", data),
    onSuccess: () => {
      toast({
        title: "Mesaj trimis cu succes",
        description: "Vă vom contacta în cel mai scurt timp.",
      });
      setFormData({ name: "", email: "", type: "", message: "" });
    },
    onError: () => {
      toast({
        title: "Eroare",
        description: "A apărut o eroare la trimiterea mesajului.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  const investmentOpportunities = [
    {
      sector: "Sector Industrial",
      description: "Fabrica EV, Centru Date, Uzină Tesla - ROI 25-35%",
      color: "text-primary"
    },
    {
      sector: "Sector Turism",
      description: "Venice Island, Universul Copiilor, SPA - ROI 18-28%",
      color: "text-emerald-500"
    },
    {
      sector: "Transport & Infrastructură",
      description: "Trenuri, Gondole, Conectivitate - ROI 15-22%",
      color: "text-blue-500"
    },
    {
      sector: "Hub Reciclare Verde",
      description: "Baziaș Circular Economy - ROI 20-30%",
      color: "text-green-500"
    }
  ];

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display" data-testid="contact-title">
            Contact & Investitori
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="contact-description">
            Pentru informații detaliate, colaborări sau oportunități de investiție
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <Card className="bg-card rounded-xl p-8">
              <h3 className="text-2xl font-semibold mb-6" data-testid="contact-info-title">
                Informații Contact
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="bg-primary p-3 rounded-lg mr-4">
                    <i className="fas fa-user text-white"></i>
                  </div>
                  <div>
                    <div className="font-semibold">Fondator & Vizionar</div>
                    <div className="text-muted-foreground" data-testid="contact-founder">
                      Ervin Remus Radosavlevici
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-primary p-3 rounded-lg mr-4">
                    <i className="fas fa-envelope text-white"></i>
                  </div>
                  <div>
                    <div className="font-semibold">Email Principal</div>
                    <div className="text-muted-foreground" data-testid="contact-email-primary">
                      ervin210@icloud.com
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-primary p-3 rounded-lg mr-4">
                    <i className="fas fa-envelope-open text-white"></i>
                  </div>
                  <div>
                    <div className="font-semibold">Email Alternativ</div>
                    <div className="text-muted-foreground" data-testid="contact-email-secondary">
                      radosavlevici.ervin@gmail.com
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-primary p-3 rounded-lg mr-4">
                    <i className="fas fa-map-marker-alt text-white"></i>
                  </div>
                  <div>
                    <div className="font-semibold">Locație Proiect</div>
                    <div className="text-muted-foreground" data-testid="contact-location">
                      Moldova Nouă, Caraș-Severin
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Legal Notice */}
              <div className="mt-8 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <div className="text-sm text-destructive font-medium mb-2">
                  <i className="fas fa-exclamation-triangle mr-2"></i>
                  Notă Legală
                </div>
                <div className="text-xs text-muted-foreground" data-testid="legal-notice">
                  Toate comunicările sunt confidențiale și protejate prin NDA. 
                  Reproducerea sau distribuirea informațiilor fără autorizare este interzisă.
                </div>
              </div>
            </Card>
            
            {/* Investment Opportunities */}
            <Card className="bg-card rounded-xl p-8">
              <h3 className="text-2xl font-semibold mb-6" data-testid="investment-title">
                Oportunități Investiție
              </h3>
              
              <div className="space-y-4 mb-6">
                {investmentOpportunities.map((opportunity, index) => (
                  <div 
                    key={opportunity.sector} 
                    className="p-4 bg-muted/50 rounded-lg"
                    data-testid={`investment-opportunity-${index}`}
                  >
                    <div className={`font-semibold mb-2 ${opportunity.color}`} data-testid={`investment-sector-${index}`}>
                      {opportunity.sector}
                    </div>
                    <div className="text-sm text-muted-foreground" data-testid={`investment-description-${index}`}>
                      {opportunity.description}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <div className="text-lg font-semibold text-primary mb-2">Investiție Minimă</div>
                <div className="text-2xl font-bold" data-testid="minimum-investment">€50M</div>
                <div className="text-sm text-muted-foreground mt-2">Pentru un sector complet</div>
              </div>
              
              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Nume complet"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                    data-testid="input-contact-name"
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                    data-testid="input-contact-email"
                  />
                </div>
                
                <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger data-testid="select-contact-type">
                    <SelectValue placeholder="Tipul mesajului" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="investment">Oportunitate Investiție</SelectItem>
                    <SelectItem value="partnership">Parteneriat</SelectItem>
                    <SelectItem value="legal">Chestiuni Legale</SelectItem>
                    <SelectItem value="general">Informații Generale</SelectItem>
                  </SelectContent>
                </Select>
                
                <Textarea
                  placeholder="Mesajul dvs..."
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  rows={4}
                  required
                  data-testid="textarea-contact-message"
                />
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={contactMutation.isPending}
                  data-testid="button-contact-submit"
                >
                  {contactMutation.isPending ? "Se trimite..." : "Trimite Mesaj"}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
