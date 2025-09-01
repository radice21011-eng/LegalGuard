import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Site {
  code: string;
  name: string;
  location: string;
  focus: string;
  status: string;
}

interface InteractiveMapProps {
  sites: Site[];
}

export function InteractiveMap({ sites }: InteractiveMapProps) {
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);

  const sitePositions = {
    "MN-CORE": { top: "45%", left: "35%" },
    "RS-HUB": { top: "40%", left: "45%" },
    "HC-SPA": { top: "55%", left: "40%" },
    "SM-SKI": { top: "35%", left: "50%" },
    "CN-NE": { top: "50%", left: "55%" },
    "BZ-PORT": { top: "48%", left: "32%" }
  };

  const showSiteInfo = (siteCode: string) => {
    const site = sites.find(s => s.code === siteCode);
    if (site) {
      setSelectedSite(site);
    }
  };

  return (
    <>
      <Card className="relative bg-card rounded-xl p-8 mb-12 nda-protected">
        <div className="relative w-full h-96 bg-muted rounded-lg overflow-hidden" data-testid="interactive-map">
          <img 
            src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600" 
            alt="Map of Banat region showing development sites" 
            className="w-full h-full object-cover opacity-60"
            data-testid="map-background"
          />
          
          {/* Interactive Markers */}
          {sites.map(site => {
            const position = sitePositions[site.code as keyof typeof sitePositions];
            if (!position) return null;
            
            return (
              <div
                key={site.code}
                className="map-marker"
                style={position}
                onClick={() => showSiteInfo(site.code)}
                title={`${site.name} - ${site.focus}`}
                data-testid={`map-marker-${site.code}`}
              />
            );
          })}
          
          <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3">
            <div className="text-sm font-medium mb-2" data-testid="map-legend-title">Harta Interactivă</div>
            <div className="text-xs text-muted-foreground" data-testid="map-legend-instruction">
              Click pe markeri pentru detalii
            </div>
          </div>
        </div>
      </Card>

      {/* Site Details Modal */}
      <Dialog open={!!selectedSite} onOpenChange={() => setSelectedSite(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle data-testid="modal-site-title">
              {selectedSite?.name} ({selectedSite?.code})
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground">Locație</div>
              <div data-testid="modal-site-location">{selectedSite?.location}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Focus</div>
              <div data-testid="modal-site-focus">{selectedSite?.focus}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Status</div>
              <div data-testid="modal-site-status">{selectedSite?.status}</div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
