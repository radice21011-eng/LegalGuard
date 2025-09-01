import { Card, CardContent } from "@/components/ui/card";

export function Transport() {
  const transportRoutes = [
    {
      type: "Tren de Mare Viteză",
      route: "Timișoara → Reșița → Moldova Nouă → Herculane",
      icon: "fas fa-train",
      color: "bg-primary"
    },
    {
      type: "Tren Panoramic",
      route: "Oravița → Anina → Cheile Nerei",
      icon: "fas fa-mountain",
      color: "bg-emerald-500"
    },
    {
      type: "Legătură Internațională",
      route: "Naidaș → Belgrad",
      icon: "fas fa-globe",
      color: "bg-blue-500"
    }
  ];

  const gondolaRoutes = [
    {
      type: "Gondola Reșița-Semenic",
      description: "Acces schi și aventură",
      icon: "fas fa-cable-car",
      color: "bg-orange-500"
    },
    {
      type: "Gondola Herculane-Cernei",
      description: "Acces spa și wellness",
      icon: "fas fa-hot-tub",
      color: "bg-purple-500"
    },
    {
      type: "Gondola + Pod Venice Island",
      description: "Moldova Nouă → Insula Venice",
      icon: "fas fa-water",
      color: "bg-cyan-500"
    }
  ];

  const economicStats = [
    { label: "Venituri transport anuale", value: "€120-180M" },
    { label: "Locuri muncă transport", value: "8,000+" },
    { label: "Pasageri anual", value: "5M+" },
    { label: "Energie verde", value: "100%" }
  ];

  return (
    <section id="transport" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display" data-testid="transport-title">
            Transport & Conectivitate
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="transport-description">
            Rețea integrată de transport modern: trenuri de mare viteză, gondole și căi ferate panoramice
          </p>
        </div>
        
        {/* Transport Network Visualization */}
        <Card className="bg-card rounded-xl p-8 mb-12 nda-protected">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Transport Routes */}
            <div>
              <h3 className="text-xl font-semibold mb-6" data-testid="transport-routes-title">
                Rețeaua de Transport
              </h3>
              <div className="space-y-4">
                {transportRoutes.map((route, index) => (
                  <div 
                    key={route.type} 
                    className="flex items-center p-4 bg-muted rounded-lg"
                    data-testid={`transport-route-${index}`}
                  >
                    <div className={`${route.color} p-3 rounded-lg mr-4`}>
                      <i className={`${route.icon} text-white`}></i>
                    </div>
                    <div>
                      <div className="font-medium" data-testid={`transport-route-type-${index}`}>
                        {route.type}
                      </div>
                      <div className="text-sm text-muted-foreground" data-testid={`transport-route-path-${index}`}>
                        {route.route}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Gondola Network */}
            <div>
              <h3 className="text-xl font-semibold mb-6" data-testid="gondola-routes-title">
                Rețeaua de Gondole
              </h3>
              <div className="space-y-4">
                {gondolaRoutes.map((gondola, index) => (
                  <div 
                    key={gondola.type} 
                    className="flex items-center p-4 bg-muted rounded-lg"
                    data-testid={`gondola-route-${index}`}
                  >
                    <div className={`${gondola.color} p-3 rounded-lg mr-4`}>
                      <i className={`${gondola.icon} text-white`}></i>
                    </div>
                    <div>
                      <div className="font-medium" data-testid={`gondola-route-type-${index}`}>
                        {gondola.type}
                      </div>
                      <div className="text-sm text-muted-foreground" data-testid={`gondola-route-description-${index}`}>
                        {gondola.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
        
        {/* Transport Economic Impact */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {economicStats.map((stat, index) => (
            <Card key={stat.label} className="text-center copyright-protected">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-primary mb-2" data-testid={`transport-stat-value-${index}`}>
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground" data-testid={`transport-stat-label-${index}`}>
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
