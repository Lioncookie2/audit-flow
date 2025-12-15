import { Link } from "react-router-dom";
import { ArrowRight, Shield, Zap, FileSpreadsheet, BarChart3, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">D</span>
            </div>
            <span className="text-xl font-bold text-foreground">DataRev</span>
          </div>
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost">
              <Link to="/login">Logg inn</Link>
            </Button>
            <Button asChild variant="accent">
              <Link to="/registrer">Kom i gang</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="gradient-hero text-primary-foreground py-24 px-6">
        <div className="container max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-medium mb-6 animate-fade-in">
            <Shield className="h-4 w-4" />
            Bygget for norske revisorer
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-delay-1">
            Moderne revisjonsanalyse
            <br />
            <span className="text-accent">på sekunder</span>
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8 animate-fade-in-delay-2">
            Erstatt tung manuell Excel-analyse med et raskt, intuitivt og revisjonsrettet 
            analyseverktøy. Importer SAF-T, analyser og eksporter – alt på ett sted.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-3">
            <Button asChild variant="hero" size="xl">
              <Link to="/registrer">
                Start gratis prøveperiode
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="hero-outline" size="xl">
              <Link to="/demo">Se demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Alt du trenger for effektiv revisjon
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Fra import til ferdig analyse – DataRev håndterer hele arbeidsflyten
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: FileSpreadsheet,
                title: "SAF-T Import",
                description: "Dra og slipp XML-filer. Automatisk parsing av kontoplan, bilag, transaksjoner, kunder og leverandører."
              },
              {
                icon: BarChart3,
                title: "Ferdige analyser",
                description: "Saldolister, kontospesifikasjoner og bilagsvisninger klare til bruk. Ingen oppsett nødvendig."
              },
              {
                icon: Zap,
                title: "Avanserte søk",
                description: "Fleksibel spørring uten SQL-kunnskap. Filtrer på konto, beløp, MVA-kode, kunde og mer."
              },
              {
                icon: Shield,
                title: "Automatisk kontroll",
                description: "MMC-modulen sjekker automatisk for ubalanserte bilag, duplikater og andre avvik."
              },
              {
                icon: Users,
                title: "Organisasjoner & klienter",
                description: "Strukturer arbeidet ditt med organisasjoner, klienter og datasett per regnskapsår."
              },
              {
                icon: FileSpreadsheet,
                title: "Excel-eksport",
                description: "Eksporter til revisjons-Excel med hovedbok, kostnadsanalyse, kunde- og leverandørlister."
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={idx} 
                  className="rounded-xl border border-border bg-card p-6 shadow-card card-interactive"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 mb-4">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Klar til å effektivisere revisjonen?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Kom i gang gratis. Ingen kredittkort nødvendig.
          </p>
          <Button asChild variant="accent" size="xl">
            <Link to="/registrer">
              Start gratis prøveperiode
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">D</span>
              </div>
              <span className="font-semibold text-foreground">DataRev</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 DataRev. Moderne analyseverktøy for revisjonsdata.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
