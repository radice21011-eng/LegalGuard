import { Card, CardContent } from "@/components/ui/card";

export function Robotics() {
  const roboticsCategories = [
    {
      title: "Tesla Optimus Humanoizi",
      description: "Asistență SPA, hoteluri, turism și servicii clienți automatizate",
      locations: "SPA, Hoteluri, Tourism",
      icon: "fas fa-android",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
    },
    {
      title: "Brațe Robotice Industriale",
      description: "Fabrica EV și uzina de materiale Tesla pentru producție automată",
      locations: "Fabrici, Uzine",
      icon: "fas fa-robot",
      image: "https://images.unsplash.com/photo-1567789884554-0b844b597180?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
    },
    {
      title: "Drone de Transport Greu",
      description: "Construcție gondole, acoperișuri, inspecții și transport materiale",
      locations: "Construcții, Inspecții",
      icon: "fas fa-helicopter",
      image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
    },
    {
      title: "Roboți Marini",
      description: "Întreținerea canalelor Venice și portului Baziaș pe Dunăre",
      locations: "Baziaș, Canale Venice",
      icon: "fas fa-fish",
      image: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
    },
    {
      title: "Roboți Patrulatori",
      description: "Inspecții poduri și securitate monumente în teren dificil",
      locations: "Poduri, Monumente",
      icon: "fas fa-dog",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
    },
    {
      title: "Trenuri Autonome",
      description: "Operare automată cu echipe robotice de întreținere",
      locations: "Toate rutele",
      icon: "fas fa-train",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
    }
  ];

  return (
    <section id="robotics" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display" data-testid="robotics-title">
            Integrarea Roboticii
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="robotics-description">
            Tehnologii robotice avansate pentru optimizarea operațiunilor și serviciilor turistice
          </p>
        </div>
        
        {/* Robotics Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {roboticsCategories.map((category, index) => (
            <Card 
              key={category.title} 
              className="hover:shadow-lg transition-shadow copyright-protected"
              data-testid={`robotics-card-${index}`}
            >
              <CardContent className="p-0">
                <img 
                  src={category.image}
                  alt={category.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                  data-testid={`robotics-image-${index}`}
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 flex items-center" data-testid={`robotics-title-${index}`}>
                    <i className={`${category.icon} text-primary mr-3`}></i>
                    {category.title}
                  </h3>
                  <p className="text-muted-foreground mb-4" data-testid={`robotics-description-${index}`}>
                    {category.description}
                  </p>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Locații:</span>
                    <span data-testid={`robotics-locations-${index}`}>{category.locations}</span>
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
