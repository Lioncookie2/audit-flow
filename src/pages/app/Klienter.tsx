import { Link, useParams } from "react-router-dom";
import { Users, Plus, Database, ChevronRight, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";

const mockKlienter = [
  { id: "1", navn: "Bedrift AS", orgnr: "987 654 321", antallDatasett: 3 },
  { id: "2", navn: "Handel Norge AS", orgnr: "976 543 210", antallDatasett: 2 },
  { id: "3", navn: "Service Partner", orgnr: "965 432 109", antallDatasett: 1 },
  { id: "4", navn: "Bygg og Anlegg AS", orgnr: "954 321 098", antallDatasett: 4 },
  { id: "5", navn: "Transport Logistikk", orgnr: "943 210 987", antallDatasett: 2 },
];

export default function Klienter() {
  const { orgId } = useParams();
  const orgNavn = "Revisor AS"; // Would come from API

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userName="Ola Nordmann" 
        userRole="ADMIN"
        breadcrumbs={[
          { label: "Organisasjoner", href: "/app/organisasjoner" },
          { label: orgNavn }
        ]}
      />
      
      <div className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Klienter</h1>
              <p className="text-muted-foreground mt-1">
                {orgNavn} • {mockKlienter.length} klienter
              </p>
            </div>
            <Button asChild variant="accent">
              <Link to={`/app/organisasjoner/${orgId}/klienter/ny`}>
                <Plus className="h-4 w-4 mr-2" />
                Ny klient
              </Link>
            </Button>
          </div>

          {/* Clients Table */}
          <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
            <table className="w-full table-sticky-header table-zebra">
              <thead>
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Klient</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Org.nr</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Datasett</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold"></th>
                </tr>
              </thead>
              <tbody>
                {mockKlienter.map((klient) => (
                  <tr 
                    key={klient.id}
                    className="border-t border-border hover:bg-table-row-hover transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <Link 
                        to={`/app/organisasjoner/${orgId}/klienter/${klient.id}/datasett`}
                        className="flex items-center gap-3 group"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                          <Building2 className="h-5 w-5 text-accent" />
                        </div>
                        <span className="font-medium text-foreground group-hover:text-accent transition-colors">
                          {klient.navn}
                        </span>
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {klient.orgnr}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Database className="h-4 w-4" />
                        <span>{klient.antallDatasett} datasett</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link to={`/app/organisasjoner/${orgId}/klienter/${klient.id}/datasett`}>
                        <ChevronRight className="h-5 w-5 text-muted-foreground hover:text-accent transition-colors inline" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
