import { Link } from "react-router-dom";
import { Building2, Plus, Users, ChevronRight, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const mockOrganisasjoner = [
  { id: "1", navn: "Revisor AS", orgnr: "912 345 678", antallKlienter: 5, rolle: "ADMIN" },
  { id: "2", navn: "Revisjon Nord", orgnr: "923 456 789", antallKlienter: 3, rolle: "ANSATT" },
  { id: "3", navn: "Økonomi Partner", orgnr: "934 567 890", antallKlienter: 4, rolle: "ADMIN" },
];

export default function Organisasjoner() {
  return (
    <div className="py-8 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Mine organisasjoner</h1>
            <p className="text-muted-foreground mt-1">
              Velg en organisasjon for å se klienter og datasett
            </p>
          </div>
          <Button asChild variant="accent">
            <Link to="/app/organisasjoner/ny">
              <Plus className="h-4 w-4 mr-2" />
              Ny organisasjon
            </Link>
          </Button>
        </div>

        {/* Organizations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockOrganisasjoner.map((org) => (
            <Link
              key={org.id}
              to={`/app/organisasjoner/${org.id}/klienter`}
              className="group rounded-xl border border-border bg-card p-6 shadow-card card-interactive"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <Badge variant={org.rolle === "ADMIN" ? "default" : "secondary"}>
                  {org.rolle}
                </Badge>
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-accent transition-colors">
                {org.navn}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Org.nr: {org.orgnr}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{org.antallKlienter} klienter</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State (hidden when there are organizations) */}
        {mockOrganisasjoner.length === 0 && (
          <div className="text-center py-16">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted mx-auto mb-4">
              <Building2 className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Ingen organisasjoner ennå
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Opprett din første organisasjon for å begynne å administrere klienter og importere revisjonsdata.
            </p>
            <Button asChild variant="accent">
              <Link to="/app/organisasjoner/ny">
                <Plus className="h-4 w-4 mr-2" />
                Opprett organisasjon
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
