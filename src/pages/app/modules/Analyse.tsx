import { Link, useParams } from "react-router-dom";
import { FileSpreadsheet, BookOpen, FileText } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { ModuleTabs } from "@/components/layout/ModuleTabs";

const analyseModuler = [
  {
    id: "saldoliste",
    title: "Saldoliste",
    description: "Oversikt over alle kontoer med inngående balanse, debet, kredit og utgående balanse. Filtrer på periode og sorter etter behov.",
    icon: FileSpreadsheet,
    features: ["Kontonummer og navn", "IB, Debet, Kredit, UB", "Periodisk filtrering", "Eksporterbar"]
  },
  {
    id: "kontospesifikasjon",
    title: "Kontospesifikasjon",
    description: "Velg en konto og se alle tilhørende bilag og transaksjoner. Dobbeltklikk på en linje for å gå til bilagsspesifikasjon.",
    icon: BookOpen,
    features: ["Velg konto fra liste", "Se alle posteringer", "Drill-down til bilag", "Filtrer på beløp"]
  },
  {
    id: "bilagsspesifikasjon",
    title: "Bilagsspesifikasjon",
    description: "Detaljert visning av ett bilag med alle linjer. Kontroller debet/kredit-balanse og se tilknyttede dokumenter.",
    icon: FileText,
    features: ["Alle linjer per bilag", "Debet/kredit-kontroll", "Dokumentvedlegg", "Historikk"]
  }
];

export default function Analyse() {
  const { orgId, klientId, datasettId } = useParams();
  const baseUrl = `/app/organisasjoner/${orgId}/klienter/${klientId}/datasett`;
  const analyseBaseUrl = `${baseUrl}/${datasettId}/analyse`;

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userName="Ola Nordmann" 
        userRole="ADMIN"
        breadcrumbs={[
          { label: "Organisasjoner", href: "/app/organisasjoner" },
          { label: "Revisor AS", href: `/app/organisasjoner/${orgId}/klienter` },
          { label: "Bedrift AS", href: `${baseUrl}` },
          { label: "2024" }
        ]}
      />
      <ModuleTabs baseUrl={baseUrl} />
      
      <div className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Analyse</h1>
            <p className="text-muted-foreground mt-1">
              Velg en analysemodul for å utforske regnskapsdataene
            </p>
          </div>

          {/* Analysis Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {analyseModuler.map((modul) => {
              const Icon = modul.icon;
              return (
                <Link
                  key={modul.id}
                  to={`${analyseBaseUrl}/${modul.id}`}
                  className="group rounded-xl border border-border bg-card p-6 shadow-card card-interactive"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 mb-4 group-hover:bg-accent/20 transition-colors">
                    <Icon className="h-7 w-7 text-accent" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                    {modul.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {modul.description}
                  </p>
                  
                  <ul className="space-y-1">
                    {modul.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
