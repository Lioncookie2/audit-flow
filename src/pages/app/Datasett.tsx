import { Link, useParams } from "react-router-dom";
import { Database, Plus, Calendar, CheckCircle2, AlertCircle, FileText, Users, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/Header";
import { ModuleTabs } from "@/components/layout/ModuleTabs";

const mockDatasett = [
  { 
    id: "1", 
    aar: "2024", 
    periode: "Januar - Desember",
    status: "OK",
    kontoer: 245,
    bilag: 1234,
    transaksjoner: 5678,
    kunder: 89,
    leverandorer: 45,
    importertDato: "2024-03-15"
  },
  { 
    id: "2", 
    aar: "2023", 
    periode: "Januar - Desember",
    status: "OK",
    kontoer: 238,
    bilag: 1156,
    transaksjoner: 5234,
    kunder: 76,
    leverandorer: 42,
    importertDato: "2024-01-10"
  },
  { 
    id: "3", 
    aar: "2022", 
    periode: "Januar - Desember",
    status: "Feil",
    kontoer: 0,
    bilag: 0,
    transaksjoner: 0,
    kunder: 0,
    leverandorer: 0,
    importertDato: "2023-02-20"
  },
];

export default function Datasett() {
  const { orgId, klientId } = useParams();
  const klientNavn = "Bedrift AS";
  const orgNavn = "Revisor AS";
  const baseUrl = `/app/organisasjoner/${orgId}/klienter/${klientId}/datasett`;

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userName="Ola Nordmann" 
        userRole="ADMIN"
        breadcrumbs={[
          { label: "Organisasjoner", href: "/app/organisasjoner" },
          { label: orgNavn, href: `/app/organisasjoner/${orgId}/klienter` },
          { label: klientNavn }
        ]}
      />
      <ModuleTabs baseUrl={baseUrl} />
      
      <div className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Datasett</h1>
              <p className="text-muted-foreground mt-1">
                {klientNavn} • {mockDatasett.length} datasett
              </p>
            </div>
            <Button asChild variant="accent">
              <Link to={`${baseUrl}/import`}>
                <Plus className="h-4 w-4 mr-2" />
                Importer SAF-T
              </Link>
            </Button>
          </div>

          {/* Datasets Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockDatasett.map((ds) => (
              <Link
                key={ds.id}
                to={`${baseUrl}/${ds.id}/analyse`}
                className="group rounded-xl border border-border bg-card p-6 shadow-card card-interactive"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Database className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                        Regnskapsår {ds.aar}
                      </h3>
                      <p className="text-sm text-muted-foreground">{ds.periode}</p>
                    </div>
                  </div>
                  <Badge 
                    variant="outline"
                    className={ds.status === "OK" ? "status-ok" : "status-error"}
                  >
                    {ds.status === "OK" ? (
                      <><CheckCircle2 className="h-3 w-3 mr-1" /> OK</>
                    ) : (
                      <><AlertCircle className="h-3 w-3 mr-1" /> Feil</>
                    )}
                  </Badge>
                </div>

                {ds.status === "OK" && (
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 pt-4 border-t border-border">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">{ds.kontoer}</p>
                      <p className="text-xs text-muted-foreground">Kontoer</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">{ds.bilag.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Bilag</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">{ds.transaksjoner.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Transaksjoner</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">{ds.kunder}</p>
                      <p className="text-xs text-muted-foreground">Kunder</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">{ds.leverandorer}</p>
                      <p className="text-xs text-muted-foreground">Leverandører</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Importert {new Date(ds.importertDato).toLocaleDateString("nb-NO")}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
