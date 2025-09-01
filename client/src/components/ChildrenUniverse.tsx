import { Card, CardContent } from "@/components/ui/card";

export function ChildrenUniverse() {
  const activities = [
    {
      title: "Parcuri Tematice",
      description: "Montagne russe, atracții, carusel, și zone de joacă pentru toate vârstele",
      icon: "fas fa-rocket",
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
    },
    {
      title: "Parcuri Acvatice",
      description: "Piscine pentru copii, tobogane, petreceri dance în izvoare termale",
      icon: "fas fa-swimmer",
      image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
    },
    {
      title: "STEM & Robotică",
      description: "Laboratoare educaționale cu mini-roboți pentru învățare interactivă",
      icon: "fas fa-robot",
      image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
    },
    {
      title: "Parcuri Aventură",
      description: "Eco-trasee, tiroliene, turnuri de escaladă în natură",
      icon: "fas fa-tree",
      image: "https://images.unsplash.com/photo-1527334919515-b8dee906a34b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
    },
    {
      title: "Hub-uri Culturale",
      description: "Teatru, cinema 4D, ateliere creative pentru dezvoltare artistică",
      icon: "fas fa-masks-theater",
      image: "https://images.unsplash.com/photo-1503095396549-807759245b35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
    },
    {
      title: "Satul Fermă pentru Copii",
      description: "Ponei, animale, grădini, educație farm-to-table pentru copii",
      icon: "fas fa-horse",
      image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
    }
  ];

  return (
    <section id="children" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display" data-testid="children-title">
            Universul Copiilor
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="children-description">
            <span className="text-primary font-semibold">"Children First – without children, the project has no heart."</span><br />
            Centrul de greutate al întregului proiect
          </p>
        </div>
        
        {/* Children's Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {activities.map((activity, index) => (
            <Card 
              key={activity.title} 
              className="hover:scale-105 transition-transform copyright-protected"
              data-testid={`activity-card-${index}`}
            >
              <CardContent className="p-0">
                <img 
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                  data-testid={`activity-image-${index}`}
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 flex items-center" data-testid={`activity-title-${index}`}>
                    <i className={`${activity.icon} text-primary mr-3`}></i>
                    {activity.title}
                  </h3>
                  <p className="text-muted-foreground" data-testid={`activity-description-${index}`}>
                    {activity.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Economic Impact for Children's Universe */}
        <Card className="bg-card rounded-xl p-8 nda-protected">
          <h3 className="text-2xl font-semibold mb-6 text-center font-display" data-testid="children-impact-title">
            Impact Economic - Universul Copiilor
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2" data-testid="children-revenue">€200-300M</div>
              <div className="text-sm text-muted-foreground">Venituri anuale estimate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2" data-testid="children-jobs">15,000+</div>
              <div className="text-sm text-muted-foreground">Locuri de muncă create</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2" data-testid="children-visitors">500K+</div>
              <div className="text-sm text-muted-foreground">Vizitatori anual</div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
