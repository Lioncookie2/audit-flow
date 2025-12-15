import { Link } from "react-router-dom";
import { Building2, Users, Database, FileText, Upload, BarChart3, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/StatCard";
import { InfoCard } from "@/components/dashboard/InfoCard";

export default function Dashboard() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-hero text-primary-foreground py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-accent/20 mb-6 animate-fade-in">
              <span className="text-4xl font-bold text-accent">D</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-delay-1">
              Velkommen til DataRev
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mb-8 animate-fade-in-delay-2">
              Moderne analyseverktøy for revisjonsdata. Erstatt tung manuell Excel-analyse med struktur, 
              hastighet og norske revisjonsstandard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay-3">
              <Button asChild variant="hero" size="xl">
                <Link to="/app/organisasjoner">
                  Gå til mine organisasjoner
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="hero-outline" size="xl">
                <Link to="/app/hjelp">Lær mer</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-6 -mt-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Organisasjoner"
              value={3}
              icon={Building2}
              description="Aktive organisasjoner"
              className="animate-fade-in-delay-1"
            />
            <StatCard
              title="Klienter"
              value={12}
              icon={Users}
              description="Totalt antall klienter"
              className="animate-fade-in-delay-2"
            />
            <StatCard
              title="Datasett"
              value={28}
              icon={Database}
              description="Importerte SAF-T filer"
              className="animate-fade-in-delay-3"
            />
          </div>
        </div>
      </section>

      {/* Info Cards Section */}
      <section className="py-12 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            Hvordan DataRev hjelper deg
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoCard
              icon={FileText}
              title="Hva er DataRev?"
              description="DataRev er et web-basert analyseverktøy designet spesifikt for norske revisorer. 
                          Importer SAF-T Regnskap (XML) og få umiddelbar tilgang til strukturerte data 
                          klare for revisjon og analyse."
            />
            <InfoCard
              icon={Upload}
              title="Hvordan fungerer import?"
              description="Last opp SAF-T XML-filer med enkel dra-og-slipp. DataRev parser automatisk 
                          kontoplan, bilag, transaksjoner, kunder og leverandører. Alt klart på sekunder."
            />
            <InfoCard
              icon={BarChart3}
              title="Fordeler for revisorer"
              description="Spar timer med ferdigbygde analysevisninger. Saldolister, kontospesifikasjoner, 
                          bilagsoversikter og avanserte søk. Eksporter direkte til revisjons-Excel."
            />
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            Kom i gang
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Ny organisasjon", href: "/app/organisasjoner/ny", icon: Building2 },
              { label: "Importer SAF-T", href: "/app/import", icon: Upload },
              { label: "Se analyser", href: "/app/analyse", icon: BarChart3 },
              { label: "Mine klienter", href: "/app/organisasjoner", icon: Users },
            ].map((action) => (
              <Link
                key={action.label}
                to={action.href}
                className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card hover:bg-secondary hover:border-accent/30 transition-all duration-200 group"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                  <action.icon className="h-5 w-5 text-accent" />
                </div>
                <span className="font-medium text-foreground">{action.label}</span>
                <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
