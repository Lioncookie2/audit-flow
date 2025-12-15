import { useParams } from "react-router-dom";
import { Download, FileSpreadsheet, Users, Truck, BookOpen, Receipt } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { ModuleTabs } from "@/components/layout/ModuleTabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const exportOptions = [
  {
    id: "hovedbok",
    title: "Hovedbok",
    description: "Komplett hovedbok med alle posteringer sortert på konto",
    icon: BookOpen,
    rows: 4521,
  },
  {
    id: "saldoliste",
    title: "Saldoliste",
    description: "Saldoliste med IB, debet, kredit og UB per konto",
    icon: FileSpreadsheet,
    rows: 156,
  },
  {
    id: "kunder",
    title: "Kundereskontro",
    description: "Alle kundetransaksjoner med saldo per kunde",
    icon: Users,
    rows: 892,
  },
  {
    id: "leverandorer",
    title: "Leverandørreskontro",
    description: "Alle leverandørtransaksjoner med saldo per leverandør",
    icon: Truck,
    rows: 634,
  },
  {
    id: "bilag",
    title: "Bilagsoversikt",
    description: "Liste over alle bilag med totaler",
    icon: Receipt,
    rows: 1203,
  },
];

export default function Eksport() {
  const { orgId, klientId, datasettId } = useParams();
  const baseUrl = `/app/organisasjoner/${orgId}/klienter/${klientId}/datasett`;
  const [selected, setSelected] = useState<string[]>(["hovedbok", "saldoliste"]);

  const toggleSelection = (id: string) => {
    setSelected(prev => 
      prev.includes(id) 
        ? prev.filter(s => s !== id)
        : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelected(exportOptions.map(o => o.id));
  };

  const deselectAll = () => {
    setSelected([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userName="Ola Nordmann" 
        userRole="ADMIN"
        breadcrumbs={[
          { label: "Organisasjoner", href: "/app/organisasjoner" },
          { label: "Revisor AS", href: `/app/organisasjoner/${orgId}/klienter` },
          { label: "Bedrift AS", href: baseUrl },
          { label: "Eksport" }
        ]}
      />
      <ModuleTabs baseUrl={baseUrl} datasettId={datasettId} />
      
      <div className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Eksport</h1>
            <p className="text-muted-foreground mt-1">
              Eksporter regnskapsdata til Excel-filer for revisjonsdokumentasjon
            </p>
          </div>

          {/* Export Options */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Velg data å eksportere</CardTitle>
                  <CardDescription>
                    Velg hvilke deler av regnskapet du ønsker å eksportere
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={selectAll}>
                    Velg alle
                  </Button>
                  <Button variant="ghost" size="sm" onClick={deselectAll}>
                    Fjern alle
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {exportOptions.map((option) => {
                  const Icon = option.icon;
                  const isSelected = selected.includes(option.id);
                  
                  return (
                    <div 
                      key={option.id}
                      onClick={() => toggleSelection(option.id)}
                      className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                        isSelected 
                          ? "border-accent bg-accent/5" 
                          : "border-border hover:border-accent/50 hover:bg-muted/30"
                      }`}
                    >
                      <Checkbox 
                        checked={isSelected}
                        onCheckedChange={() => toggleSelection(option.id)}
                      />
                      <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                        isSelected ? "bg-accent/20" : "bg-muted"
                      }`}>
                        <Icon className={`h-6 w-6 ${isSelected ? "text-accent" : "text-muted-foreground"}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground">{option.title}</span>
                          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                            {option.rows.toLocaleString("nb-NO")} rader
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Export Actions */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">
                    {selected.length} av {exportOptions.length} valgt
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Totalt {exportOptions
                      .filter(o => selected.includes(o.id))
                      .reduce((sum, o) => sum + o.rows, 0)
                      .toLocaleString("nb-NO")} rader vil eksporteres
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" disabled={selected.length === 0}>
                    Eksporter separate filer
                  </Button>
                  <Button disabled={selected.length === 0} className="gap-2">
                    <Download className="h-4 w-4" />
                    Last ned samlet Excel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
