import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowUpDown, Filter, Download, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/layout/Header";
import { ModuleTabs } from "@/components/layout/ModuleTabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mockSaldoliste = [
  { konto: "1000", navn: "Kontanter", ib: 15000, debet: 45000, kredit: 38000, ub: 22000 },
  { konto: "1500", navn: "Kundefordringer", ib: 125000, debet: 890000, kredit: 875000, ub: 140000 },
  { konto: "1900", navn: "Bankinnskudd", ib: 450000, debet: 2340000, kredit: 2180000, ub: 610000 },
  { konto: "2000", navn: "Varelager", ib: 230000, debet: 180000, kredit: 165000, ub: 245000 },
  { konto: "2400", navn: "Leverandørgjeld", ib: -89000, debet: 720000, kredit: 745000, ub: -114000 },
  { konto: "3000", navn: "Salgsinntekter", ib: 0, debet: 15000, kredit: 2450000, ub: -2435000 },
  { konto: "4000", navn: "Varekostnad", ib: 0, debet: 1560000, kredit: 12000, ub: 1548000 },
  { konto: "5000", navn: "Lønn", ib: 0, debet: 890000, kredit: 0, ub: 890000 },
  { konto: "6000", navn: "Avskrivninger", ib: 0, debet: 125000, kredit: 0, ub: 125000 },
  { konto: "6300", navn: "Leiekostnader", ib: 0, debet: 180000, kredit: 0, ub: 180000 },
  { konto: "6800", navn: "Kontorkostnader", ib: 0, debet: 45000, kredit: 2000, ub: 43000 },
  { konto: "7000", navn: "Reisekostnader", ib: 0, debet: 67000, kredit: 5000, ub: 62000 },
];

export default function Saldoliste() {
  const { orgId, klientId, datasettId } = useParams();
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  
  const baseUrl = `/app/organisasjoner/${orgId}/klienter/${klientId}/datasett`;
  const analyseUrl = `${baseUrl}/${datasettId}/analyse`;

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("nb-NO", { 
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    }).format(num);
  };

  const filteredData = mockSaldoliste.filter(
    (row) => 
      row.konto.includes(search) || 
      row.navn.toLowerCase().includes(search.toLowerCase())
  );

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("asc");
    }
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
          { label: "2024", href: analyseUrl },
          { label: "Saldoliste" }
        ]}
      />
      <ModuleTabs baseUrl={baseUrl} />
      
      <div className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button asChild variant="ghost" size="sm">
              <Link to={analyseUrl}>
                <ChevronLeft className="h-4 w-4 mr-1" />
                Tilbake
              </Link>
            </Button>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Saldoliste</h1>
              <p className="text-muted-foreground mt-1">
                Bedrift AS • Regnskapsår 2024
              </p>
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Eksporter
            </Button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-6 p-4 rounded-lg border border-border bg-card">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Søk på konto eller navn..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Select defaultValue="alle">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Periode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alle">Hele året</SelectItem>
                <SelectItem value="q1">Q1 (Jan-Mar)</SelectItem>
                <SelectItem value="q2">Q2 (Apr-Jun)</SelectItem>
                <SelectItem value="q3">Q3 (Jul-Sep)</SelectItem>
                <SelectItem value="q4">Q4 (Okt-Des)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full table-sticky-header table-zebra">
                <thead>
                  <tr>
                    <th 
                      className="text-left px-6 py-4 text-sm font-semibold cursor-pointer hover:bg-primary/80"
                      onClick={() => handleSort("konto")}
                    >
                      <div className="flex items-center gap-2">
                        Konto
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold">Navn</th>
                    <th 
                      className="text-right px-6 py-4 text-sm font-semibold cursor-pointer hover:bg-primary/80"
                      onClick={() => handleSort("ib")}
                    >
                      <div className="flex items-center justify-end gap-2">
                        IB
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </th>
                    <th className="text-right px-6 py-4 text-sm font-semibold">Debet</th>
                    <th className="text-right px-6 py-4 text-sm font-semibold">Kredit</th>
                    <th 
                      className="text-right px-6 py-4 text-sm font-semibold cursor-pointer hover:bg-primary/80"
                      onClick={() => handleSort("ub")}
                    >
                      <div className="flex items-center justify-end gap-2">
                        UB
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((row, idx) => (
                    <tr 
                      key={row.konto}
                      className="border-t border-border hover:bg-table-row-hover transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-3 font-mono text-sm font-medium text-foreground">
                        {row.konto}
                      </td>
                      <td className="px-6 py-3 text-sm text-foreground">
                        <Link 
                          to={`${analyseUrl}/kontospesifikasjon?konto=${row.konto}`}
                          className="hover:text-accent hover:underline"
                        >
                          {row.navn}
                        </Link>
                      </td>
                      <td className="px-6 py-3 text-sm text-right font-mono text-muted-foreground">
                        {formatNumber(row.ib)}
                      </td>
                      <td className="px-6 py-3 text-sm text-right font-mono text-foreground">
                        {formatNumber(row.debet)}
                      </td>
                      <td className="px-6 py-3 text-sm text-right font-mono text-foreground">
                        {formatNumber(row.kredit)}
                      </td>
                      <td className={`px-6 py-3 text-sm text-right font-mono font-medium ${
                        row.ub < 0 ? "text-destructive" : "text-foreground"
                      }`}>
                        {formatNumber(row.ub)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-muted/50 font-semibold">
                  <tr className="border-t-2 border-border">
                    <td colSpan={2} className="px-6 py-4 text-sm text-foreground">
                      Sum ({filteredData.length} kontoer)
                    </td>
                    <td className="px-6 py-4 text-sm text-right font-mono">
                      {formatNumber(filteredData.reduce((sum, r) => sum + r.ib, 0))}
                    </td>
                    <td className="px-6 py-4 text-sm text-right font-mono">
                      {formatNumber(filteredData.reduce((sum, r) => sum + r.debet, 0))}
                    </td>
                    <td className="px-6 py-4 text-sm text-right font-mono">
                      {formatNumber(filteredData.reduce((sum, r) => sum + r.kredit, 0))}
                    </td>
                    <td className="px-6 py-4 text-sm text-right font-mono">
                      {formatNumber(filteredData.reduce((sum, r) => sum + r.ub, 0))}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Pagination placeholder */}
          <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
            <span>Viser {filteredData.length} av {mockSaldoliste.length} kontoer</span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>Forrige</Button>
              <Button variant="outline" size="sm" disabled>Neste</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
