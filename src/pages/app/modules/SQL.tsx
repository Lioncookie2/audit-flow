import { useState } from "react";
import { useParams } from "react-router-dom";
import { Database, Play, Copy, Download, ChevronDown } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { ModuleTabs } from "@/components/layout/ModuleTabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";

const presetQueries = [
  { 
    label: "Alle bilag på konto 1500", 
    query: "SELECT * FROM transaksjoner WHERE konto = '1500' ORDER BY dato" 
  },
  { 
    label: "Bilag uten MVA-kode", 
    query: "SELECT bilag_nr, dato, konto, belop FROM transaksjoner WHERE mva_kode IS NULL" 
  },
  { 
    label: "Beløp over 100 000", 
    query: "SELECT * FROM transaksjoner WHERE ABS(belop) > 100000 ORDER BY belop DESC" 
  },
  { 
    label: "Transaksjoner per måned", 
    query: "SELECT EXTRACT(MONTH FROM dato) as maned, COUNT(*) as antall, SUM(debet) as debet FROM transaksjoner GROUP BY maned" 
  },
  { 
    label: "Topp 10 leverandører", 
    query: "SELECT leverandor_id, SUM(kredit) as total FROM transaksjoner WHERE leverandor_id IS NOT NULL GROUP BY leverandor_id ORDER BY total DESC LIMIT 10" 
  },
];

const mockResults = [
  { bilag_nr: "1001", dato: "2024-01-15", konto: "1500", tekst: "Varekjøp", debet: 15000, kredit: 0 },
  { bilag_nr: "1015", dato: "2024-02-01", konto: "1500", tekst: "Varekjøp leverandør", debet: 8500, kredit: 0 },
  { bilag_nr: "1028", dato: "2024-02-20", konto: "1500", tekst: "Lageranskaffelse", debet: 22000, kredit: 0 },
  { bilag_nr: "1042", dato: "2024-03-05", konto: "1500", tekst: "Varekjøp import", debet: 45000, kredit: 0 },
  { bilag_nr: "1056", dato: "2024-03-18", konto: "1500", tekst: "Lageroppfylling", debet: 12500, kredit: 0 },
];

export default function SQL() {
  const { orgId, klientId, datasettId } = useParams();
  const baseUrl = `/app/organisasjoner/${orgId}/klienter/${klientId}/datasett`;
  const [query, setQuery] = useState("SELECT * FROM transaksjoner WHERE konto = '1500' ORDER BY dato");
  const [hasExecuted, setHasExecuted] = useState(false);

  const handleExecute = () => {
    // Check for non-SELECT queries
    const trimmedQuery = query.trim().toUpperCase();
    if (!trimmedQuery.startsWith("SELECT")) {
      toast({
        title: "Kun SELECT tillatt",
        description: "Av sikkerhetsgrunner kan du kun kjøre SELECT-spørringer.",
        variant: "destructive"
      });
      return;
    }
    setHasExecuted(true);
  };

  const handlePresetSelect = (presetQuery: string) => {
    setQuery(presetQuery);
    setHasExecuted(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(query);
    toast({
      title: "Kopiert",
      description: "SQL-spørringen er kopiert til utklippstavlen."
    });
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
          { label: "SQL" }
        ]}
      />
      <ModuleTabs baseUrl={baseUrl} datasettId={datasettId} />
      
      <div className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">SQL Spørringer</h1>
            <p className="text-muted-foreground mt-1">
              Kjør avanserte SQL-spørringer mot regnskapsdataene (kun SELECT)
            </p>
          </div>

          {/* Query Editor */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-accent" />
                    SQL Editor
                  </CardTitle>
                  <CardDescription>
                    Skriv din spørring eller velg en forhåndsdefinert
                  </CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      Vanlige spørringer
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64">
                    {presetQueries.map((preset, idx) => (
                      <DropdownMenuItem 
                        key={idx}
                        onClick={() => handlePresetSelect(preset.query)}
                      >
                        {preset.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setHasExecuted(false);
                  }}
                  placeholder="SELECT * FROM transaksjoner WHERE ..."
                  className="font-mono text-sm min-h-[120px] bg-muted/30"
                />
                <div className="flex items-center gap-3">
                  <Button onClick={handleExecute} className="gap-2">
                    <Play className="h-4 w-4" />
                    Kjør spørring
                  </Button>
                  <Button variant="outline" onClick={copyToClipboard} className="gap-2">
                    <Copy className="h-4 w-4" />
                    Kopier
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {hasExecuted && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Resultater</CardTitle>
                  <CardDescription>
                    {mockResults.length} rader returnert • Utført på 0.023s
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Eksporter CSV
                </Button>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead>bilag_nr</TableHead>
                        <TableHead>dato</TableHead>
                        <TableHead>konto</TableHead>
                        <TableHead>tekst</TableHead>
                        <TableHead className="text-right">debet</TableHead>
                        <TableHead className="text-right">kredit</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockResults.map((row, idx) => (
                        <TableRow key={idx} className="hover:bg-muted/30 font-mono text-sm">
                          <TableCell>{row.bilag_nr}</TableCell>
                          <TableCell>{row.dato}</TableCell>
                          <TableCell>{row.konto}</TableCell>
                          <TableCell className="font-sans">{row.tekst}</TableCell>
                          <TableCell className="text-right">
                            {row.debet > 0 ? row.debet.toLocaleString("nb-NO") : ""}
                          </TableCell>
                          <TableCell className="text-right">
                            {row.kredit > 0 ? row.kredit.toLocaleString("nb-NO") : ""}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
