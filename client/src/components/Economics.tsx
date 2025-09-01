import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";

const defaultRevenue = [
  {
    sector: "Fabrica EV + Centru Date",
    description: "Producție, export, servicii AI/Cloud",
    minRevenue: 1200000000,
    maxRevenue: 1800000000,
    icon: "fas fa-industry",
    color: "bg-primary",
    percentage: 100
  },
  {
    sector: "Turism & Festivaluri",
    description: "Festivaluri UNTOLD-style, canale Venice, eco-turism",
    minRevenue: 400000000,
    maxRevenue: 600000000,
    icon: "fas fa-camera",
    color: "bg-emerald-500",
    percentage: 66
  },
  {
    sector: "SPA & Wellness",
    description: "Stațiuni de lux și accesibile",
    minRevenue: 250000000,
    maxRevenue: 400000000,
    icon: "fas fa-spa",
    color: "bg-purple-500",
    percentage: 50
  },
  {
    sector: "Universul Copiilor",
    description: "Parcuri tematice, acvatice, hub-uri educaționale",
    minRevenue: 200000000,
    maxRevenue: 300000000,
    icon: "fas fa-child",
    color: "bg-orange-500",
    percentage: 40
  },
  {
    sector: "Transport & Conectivitate",
    description: "Trenuri, gondole, logistică",
    minRevenue: 120000000,
    maxRevenue: 180000000,
    icon: "fas fa-train",
    color: "bg-blue-500",
    percentage: 25
  },
  {
    sector: "Ferme Pești & Agricultură",
    description: "Export + aprovizionare locală",
    minRevenue: 80000000,
    maxRevenue: 120000000,
    icon: "fas fa-seedling",
    color: "bg-green-500",
    percentage: 16
  }
];

export function Economics() {
  const { data: revenueData = defaultRevenue, isLoading } = useQuery({
    queryKey: ["/api/economics/revenue"],
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return `€${(amount / 1000000000).toFixed(1)}B`;
    } else if (amount >= 1000000) {
      return `€${(amount / 1000000).toFixed(0)}M`;
    }
    return `€${amount.toLocaleString()}`;
  };

  const totalMin = revenueData.reduce((sum, item) => sum + item.minRevenue, 0);
  const totalMax = revenueData.reduce((sum, item) => sum + item.maxRevenue, 0);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <section id="economics" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display" data-testid="economics-title">
            Impact Economic & Fluxuri de Venituri
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="economics-description">
            Proiecții financiare detaliate pentru toate sectoarele de dezvoltare
          </p>
        </div>
        
        {/* Revenue Streams Dashboard */}
        <Card className="bg-card rounded-xl p-8 mb-12 nda-protected">
          <h3 className="text-2xl font-semibold mb-8 text-center font-display" data-testid="revenue-streams-title">
            Venituri Anuale Potențiale
          </h3>
          
          <div className="space-y-6">
            {revenueData.map((item, index) => (
              <div 
                key={item.sector} 
                className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                data-testid={`revenue-item-${index}`}
              >
                <div className="flex items-center">
                  <div className={`${item.color} p-2 rounded-lg mr-4`}>
                    <i className={`${item.icon} text-white`}></i>
                  </div>
                  <div>
                    <div className="font-semibold" data-testid={`revenue-sector-${index}`}>
                      {item.sector}
                    </div>
                    <div className="text-sm text-muted-foreground" data-testid={`revenue-description-${index}`}>
                      {item.description}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary" data-testid={`revenue-amount-${index}`}>
                    {formatCurrency(item.minRevenue)}-{formatCurrency(item.maxRevenue)}
                  </div>
                  <div className="w-64 bg-muted rounded-full h-3 mt-2">
                    <div 
                      className={`revenue-bar h-3 ${item.color}`}
                      style={{ width: `${item.percentage}%` }}
                      data-testid={`revenue-bar-${index}`}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Total Revenue */}
          <div className="mt-8 p-6 bg-primary/10 rounded-lg text-center">
            <div className="text-4xl font-bold text-primary mb-2" data-testid="total-revenue">
              {formatCurrency(totalMin)}-{formatCurrency(totalMax)}
            </div>
            <div className="text-lg text-muted-foreground">Total Venituri Anuale Estimate</div>
          </div>
        </Card>
        
        {/* Recycling Hub Special Section */}
        <Card className="bg-card rounded-xl p-8 border-l-4 border-emerald-500">
          <div className="flex items-center mb-6">
            <div className="bg-emerald-500 p-3 rounded-lg mr-4">
              <i className="fas fa-recycle text-white text-xl"></i>
            </div>
            <div>
              <h3 className="text-2xl font-semibold" data-testid="recycling-hub-title">
                Baziaș Recycling & Circular Economy Hub
              </h3>
              <p className="text-muted-foreground" data-testid="recycling-hub-subtitle">
                Punctul de intrare verde al României la Dunăre
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-500 mb-2" data-testid="recycling-revenue">€300-500M</div>
              <div className="text-sm text-muted-foreground">Venituri anuale reciclare</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-500 mb-2" data-testid="recycling-jobs">3,000-5,000</div>
              <div className="text-sm text-muted-foreground">Locuri de muncă stabile</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-500 mb-2" data-testid="recycling-capacity">2-3M tone</div>
              <div className="text-sm text-muted-foreground">Capacitate reciclare anuală</div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
