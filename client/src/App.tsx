import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Copyright } from "@/components/ui/Copyright";
import { GDPRBanner } from "@/components/ui/GDPRBanner";
import { useCopyright } from "@/hooks/useCopyright";
import { useGDPR } from "@/hooks/useGDPR";
import Home from "@/pages/Home";
import Legal from "@/pages/Legal";
import Privacy from "@/pages/Privacy";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/legal" component={Legal} />
      <Route path="/privacy" component={Privacy} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const { isViolated } = useCopyright();
  const { hasConsent, showBanner } = useGDPR();

  if (isViolated) {
    return (
      <div className="fixed inset-0 bg-black text-white flex items-center justify-center z-[9999] font-sans">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-6">⚠️ COPYRIGHT VIOLATION DETECTED</h1>
          <p className="text-lg mb-4">This content is protected by copyright law.</p>
          <p className="mb-2"><strong>Owner:</strong> Ervin Remus Radosavlevici</p>
          <p className="mb-6"><strong>Contact:</strong> ervin210@icloud.com</p>
          <p className="text-gray-400">All rights reserved. Unauthorized use is prohibited.</p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="relative">
          <Copyright />
          <Router />
          {showBanner && <GDPRBanner />}
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
