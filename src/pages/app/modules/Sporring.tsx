import { useState } from "react";
import { useParams } from "react-router-dom";
import { Search, Filter, Download } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { ModuleTabs } from "@/components/layout/ModuleTabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const mockResults = [
  { bilagNr: "1001", dato: "2024-01-15", konto: "1500", tekst: "Kjøp av varer", debet: 15000, kredit: 0, mva: "1" },
  { bilagNr: "1002", dato: "2024-01-18", konto: "4000", tekst: "Varesalg", debet: 0, kredit: 25000, mva: "3" },
  { bilagNr: "1015", dato: "2024-02-01", konto: "1500", tekst: "Varekjøp leverandør", debet: 8500, kredit: 0, mva: "1" },
  { bilagNr: "1022", dato: "2024-02-15", konto: "6300", tekst: "Leie lokaler", debet: 12000, kredit: 0, mva: "0" },
  { bilagNr: "1035", dato: "2024-03-01", konto: "5000", tekst: "Lønn ansatte", debet: 45000, kredit: 0, mva: "0" },
];

export default function Sporring() {
  const { orgId, klientId, datasettId } = useParams();
  const baseUrl = `/app/organisasjoner/${orgId}/klienter/${klientId}/datasett`;
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    setHasSearched(true);
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
          { label: "Spørring" }
        ]}
      />
      <ModuleTabs baseUrl={baseUrl} datasettId={datasettId} />
      
      <div className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Spørring</h1>
            <p className="text-muted-foreground mt-1">
              Filtrer og søk i regnskapsdata uten SQL
            </p>
          </div>

          {/* Filter Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-accent" />
                Søkefiltre
              </CardTitle>
              <CardDescription>
                Velg ett eller flere filtre for å finne relevante posteringer
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Kontogruppe</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Velg kontogruppe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1xxx - Eiendeler</SelectItem>
                      <SelectItem value="2">2xxx - Egenkapital og gjeld</SelectItem>
                      <SelectItem value="3">3xxx - Inntekter</SelectItem>
                      <SelectItem value="4">4xxx - Varekostnad</SelectItem>
                      <SelectItem value="5">5xxx - Lønnskostnad</SelectItem>
                      <SelectItem value="6">6xxx - Driftskostnad</SelectItem>
                      <SelectItem value="7">7xxx - Andre driftskostnader</SelectItem>
                      <SelectItem value="8">8xxx - Finansposter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Kontonummer (fra - til)</Label>
                  <div className="flex gap-2">
                    <Input placeholder="Fra" type="number" />
                    <Input placeholder="Til" type="number" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Bilagsnummer</Label>
                  <div className="flex gap-2">
                    <Input placeholder="Fra" type="number" />
                    <Input placeholder="Til" type="number" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Beløp (fra - til)</Label>
                  <div className="flex gap-2">
                    <Input placeholder="Min" type="number" />
                    <Input placeholder="Maks" type="number" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>MVA-kode</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Velg MVA-kode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0 - Ingen MVA</SelectItem>
                      <SelectItem value="1">1 - Inngående MVA 25%</SelectItem>
                      <SelectItem value="3">3 - Utgående MVA 25%</SelectItem>
                      <SelectItem value="5">5 - Inngående MVA 15%</SelectItem>
                      <SelectItem value="6">6 - Utgående MVA 15%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Søketekst</Label>
                  <Input placeholder="Søk i bilagstekst..." />
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <Button onClick={handleSearch} className="gap-2">
                  <Search className="h-4 w-4" />
                  Søk
                </Button>
                <Button variant="outline">Nullstill</Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {hasSearched && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Søkeresultater</CardTitle>
                  <CardDescription>{mockResults.length} posteringer funnet</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Eksporter
                </Button>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead>Bilag</TableHead>
                        <TableHead>Dato</TableHead>
                        <TableHead>Konto</TableHead>
                        <TableHead>Tekst</TableHead>
                        <TableHead className="text-right">Debet</TableHead>
                        <TableHead className="text-right">Kredit</TableHead>
                        <TableHead>MVA</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockResults.map((row, idx) => (
                        <TableRow key={idx} className="hover:bg-muted/30">
                          <TableCell className="font-medium">{row.bilagNr}</TableCell>
                          <TableCell>{row.dato}</TableCell>
                          <TableCell>{row.konto}</TableCell>
                          <TableCell>{row.tekst}</TableCell>
                          <TableCell className="text-right font-mono">
                            {row.debet > 0 ? row.debet.toLocaleString("nb-NO") : ""}
                          </TableCell>
                          <TableCell className="text-right font-mono">
                            {row.kredit > 0 ? row.kredit.toLocaleString("nb-NO") : ""}
                          </TableCell>
                          <TableCell>{row.mva}</TableCell>
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
