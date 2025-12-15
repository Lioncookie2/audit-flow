import { useParams } from "react-router-dom";
import { ShieldCheck, AlertTriangle, CheckCircle2, XCircle, Clock, RefreshCw } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { ModuleTabs } from "@/components/layout/ModuleTabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const kontrollerKategorier = [
  {
    kategori: "Bilagskontroll",
    kontroller: [
      { id: 1, navn: "Ubalanserte bilag", status: "error", antall: 3, beskrivelse: "Bilag der debet ≠ kredit" },
      { id: 2, navn: "Duplikate bilagsnummer", status: "ok", antall: 0, beskrivelse: "Samme bilagsnummer brukt flere ganger" },
      { id: 3, navn: "Manglende bilagsnummer", status: "warning", antall: 2, beskrivelse: "Hull i bilagsserien" },
    ]
  },
  {
    kategori: "MVA-kontroll",
    kontroller: [
      { id: 4, navn: "Posteringer uten MVA-kode", status: "warning", antall: 15, beskrivelse: "Transaksjoner som mangler MVA-kode" },
      { id: 5, navn: "Feil MVA-sats", status: "ok", antall: 0, beskrivelse: "MVA-beløp stemmer ikke med sats" },
      { id: 6, navn: "MVA på fritatte poster", status: "ok", antall: 0, beskrivelse: "MVA registrert på fritatte kontoer" },
    ]
  },
  {
    kategori: "Reskontro",
    kontroller: [
      { id: 7, navn: "Kunde uten kundenummer", status: "error", antall: 5, beskrivelse: "Transaksjoner på kundekonto uten kunde-ID" },
      { id: 8, navn: "Leverandør uten leverandørnummer", status: "warning", antall: 8, beskrivelse: "Transaksjoner på leverandørkonto uten leverandør-ID" },
      { id: 9, navn: "Negativ kundesaldo", status: "ok", antall: 0, beskrivelse: "Kunder med negativ saldo (overbetaling)" },
    ]
  },
  {
    kategori: "Kontoplan",
    kontroller: [
      { id: 10, navn: "Ubrukte kontoer", status: "info", antall: 42, beskrivelse: "Kontoer i kontoplanen uten posteringer" },
      { id: 11, navn: "Posteringer på sperret konto", status: "ok", antall: 0, beskrivelse: "Transaksjoner på kontoer som ikke skal brukes" },
    ]
  }
];

const statusConfig = {
  ok: { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10", label: "OK" },
  warning: { icon: AlertTriangle, color: "text-amber-500", bg: "bg-amber-500/10", label: "Advarsel" },
  error: { icon: XCircle, color: "text-red-500", bg: "bg-red-500/10", label: "Feil" },
  info: { icon: Clock, color: "text-blue-500", bg: "bg-blue-500/10", label: "Info" },
};

export default function MMC() {
  const { orgId, klientId, datasettId } = useParams();
  const baseUrl = `/app/organisasjoner/${orgId}/klienter/${klientId}/datasett`;

  const totalKontroller = kontrollerKategorier.flatMap(k => k.kontroller).length;
  const okKontroller = kontrollerKategorier.flatMap(k => k.kontroller).filter(k => k.status === "ok").length;
  const errorKontroller = kontrollerKategorier.flatMap(k => k.kontroller).filter(k => k.status === "error").length;
  const warningKontroller = kontrollerKategorier.flatMap(k => k.kontroller).filter(k => k.status === "warning").length;
  const okProsent = Math.round((okKontroller / totalKontroller) * 100);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userName="Ola Nordmann" 
        userRole="ADMIN"
        breadcrumbs={[
          { label: "Organisasjoner", href: "/app/organisasjoner" },
          { label: "Revisor AS", href: `/app/organisasjoner/${orgId}/klienter` },
          { label: "Bedrift AS", href: baseUrl },
          { label: "MMC" }
        ]}
      />
      <ModuleTabs baseUrl={baseUrl} datasettId={datasettId} />
      
      <div className="py-8 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">MMC Kontrollmodul</h1>
              <p className="text-muted-foreground mt-1">
                Automatisk revisjonskontroll av regnskapsdata
              </p>
            </div>
            <Button className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Kjør kontroller på nytt
            </Button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                    <ShieldCheck className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{okProsent}%</p>
                    <p className="text-sm text-muted-foreground">Godkjent</p>
                  </div>
                </div>
                <Progress value={okProsent} className="mt-4 h-2" />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
                  <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{okKontroller}</p>
                  <p className="text-sm text-muted-foreground">OK</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10">
                  <AlertTriangle className="h-6 w-6 text-amber-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{warningKontroller}</p>
                  <p className="text-sm text-muted-foreground">Advarsler</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10">
                  <XCircle className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{errorKontroller}</p>
                  <p className="text-sm text-muted-foreground">Feil</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Control Categories */}
          <div className="space-y-6">
            {kontrollerKategorier.map((kategori) => (
              <Card key={kategori.kategori}>
                <CardHeader>
                  <CardTitle>{kategori.kategori}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {kategori.kontroller.map((kontroll) => {
                      const config = statusConfig[kontroll.status as keyof typeof statusConfig];
                      const Icon = config.icon;
                      
                      return (
                        <div 
                          key={kontroll.id}
                          className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${config.bg}`}>
                              <Icon className={`h-5 w-5 ${config.color}`} />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{kontroll.navn}</p>
                              <p className="text-sm text-muted-foreground">{kontroll.beskrivelse}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            {kontroll.antall > 0 && (
                              <Badge variant={kontroll.status === "error" ? "destructive" : "secondary"}>
                                {kontroll.antall} funnet
                              </Badge>
                            )}
                            <Button variant="ghost" size="sm">
                              Se detaljer
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
