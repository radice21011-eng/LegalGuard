import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { InteractiveMap } from "./InteractiveMap";
import { Badge } from "@/components/ui/badge";

const defaultSites = [
  {
    code: "MN-CORE",
    name: "Moldova Nouă",
    location: "Moldova Nouă",
    focus: "Fabrica EV, Centru de Date, Venice Island Hub, Terenuri Festival",
    status: "Concept",
    progress: 25
  },
  {
    code: "RS-HUB",
    name: "Reșița",
    location: "Reșița",
    focus: "Hub industrial, Uzină materiale Tesla, Energy Valley, Depou Tren",
    status: "Planificare",
    progress: 50
  },
  {
    code: "HC-SPA",
    name: "Băile Herculane",
    location: "Băile Herculane",
    focus: "Stațiune termală, oraș wellness, Gondola Cernei, Petreceri SPA",
    status: "Concept",
    progress: 25
  },
  {
    code: "SM-SKI",
    name: "Semenic",
    location: "Semenic",
    focus: "Stațiune schi, trasee drumeție, gondola Reșița-Semenic",
    status: "Concept",
    progress: 25
  },
  {
    code: "CN-NE",
    name: "Cheile Nerei",
    location: "Cheile Nerei – Beușnița",
    focus: "Eco-turism, acces gondola, trasee ghidate cu drone",
    status: "Concept",
    progress: 25
  },
  {
    code: "BZ-PORT",
    name: "Baziaș",
    location: "Baziaș",
    focus: "Port turistic, intrare Dunăre, hub Venice pe apă",
    status: "Concept",
    progress: 25
  }
];

export function DevelopmentSites() {
  const { data: sites = defaultSites, isLoading } = useQuery({
    queryKey: ["/api/projects"],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "concept": return "bg-primary/10 text-primary";
      case "planificare": return "bg-yellow-500/10 text-yellow-500";
      case "core": return "bg-emerald-500/10 text-emerald-500";
      default: return "bg-muted/10 text-muted-foreground";
    }
  };

  const getIcon = (code: string) => {
    switch (code) {
      case "MN-CORE": return "fas fa-industry";
      case "RS-HUB": return "fas fa-cogs";
      case "HC-SPA": return "fas fa-hot-tub";
      case "SM-SKI": return "fas fa-mountain";
      case "CN-NE": return "fas fa-leaf";
      case "BZ-PORT": return "fas fa-ship";
      default: return "fas fa-map-marker-alt";
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <section id="sites" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display" data-testid="sites-title">
            Siturile Cheie de Dezvoltare
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="sites-description">
            10 zone strategice de dezvoltare integrată pentru transformarea regiunii Banat
          </p>
        </div>
        
        {/* Interactive Map */}
        <InteractiveMap sites={sites} />
        
        {/* Sites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {sites.map((site, index) => (
            <Card 
              key={site.code} 
              className="hover:shadow-lg transition-shadow copyright-protected"
              data-testid={`site-card-${site.code}`}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <i className={`${getIcon(site.code)} text-primary text-xl`}></i>
                  </div>
                  <Badge className={getStatusColor(site.status)} data-testid={`site-status-${site.code}`}>
                    {site.status}
                  </Badge>
                </div>
                <h3 className="text-xl font-semibold mb-2" data-testid={`site-name-${site.code}`}>
                  {site.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4" data-testid={`site-focus-${site.code}`}>
                  {site.focus}
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progres</span>
                    <span className="text-primary" data-testid={`site-progress-text-${site.code}`}>
                      {site.status}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="revenue-bar h-2"
                      style={{ width: `${site.progress}%` }}
                      data-testid={`site-progress-bar-${site.code}`}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
