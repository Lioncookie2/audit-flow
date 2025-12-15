import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Clock, MessageSquare, ChevronRight, Send } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

interface Oppgave {
  id: number;
  klient: string;
  datasett: string;
  status: "ikke_startet" | "under_arbeid" | "ferdig";
  frist: string;
  kommentarer: string[];
  url: string;
}

const initialOppgaver: Oppgave[] = [
  { 
    id: 1, 
    klient: "Elektro AS", 
    datasett: "2024", 
    status: "under_arbeid", 
    frist: "2024-03-15",
    kommentarer: ["Startet med saldoliste-gjennomgang"],
    url: "/app/organisasjoner/1/klienter/1/datasett/1/analyse"
  },
  { 
    id: 2, 
    klient: "Bygg & Anlegg AS", 
    datasett: "2024", 
    status: "ikke_startet", 
    frist: "2024-03-20",
    kommentarer: [],
    url: "/app/organisasjoner/1/klienter/2/datasett/2/analyse"
  },
  { 
    id: 3, 
    klient: "Transport AS", 
    datasett: "2024", 
    status: "ferdig", 
    frist: "2024-03-10",
    kommentarer: ["MMC 100% OK", "Eksportert til revisjonsmappe"],
    url: "/app/organisasjoner/1/klienter/3/datasett/3/analyse"
  },
  { 
    id: 4, 
    klient: "Rør & Varme AS", 
    datasett: "2024", 
    status: "under_arbeid", 
    frist: "2024-03-25",
    kommentarer: ["3 MMC-feil må undersøkes"],
    url: "/app/organisasjoner/1/klienter/4/datasett/4/analyse"
  },
];

const statusConfig = {
  ikke_startet: { label: "Ikke startet", color: "bg-muted text-muted-foreground" },
  under_arbeid: { label: "Under arbeid", color: "bg-amber-500/10 text-amber-600" },
  ferdig: { label: "Ferdig", color: "bg-emerald-500/10 text-emerald-600" },
};

export default function AnsattDashboard() {
  const [oppgaver, setOppgaver] = useState<Oppgave[]>(initialOppgaver);
  const [selectedOppgave, setSelectedOppgave] = useState<Oppgave | null>(null);
  const [nyKommentar, setNyKommentar] = useState("");

  const markerSomFerdig = (id: number) => {
    setOppgaver(prev => prev.map(o => 
      o.id === id ? { ...o, status: "ferdig" as const, kommentarer: [...o.kommentarer, "Markert som ferdig"] } : o
    ));
    toast({
      title: "Datasett markert som ferdig",
      description: "Statusen er oppdatert."
    });
  };

  const leggTilKommentar = () => {
    if (!selectedOppgave || !nyKommentar.trim()) return;
    
    setOppgaver(prev => prev.map(o => 
      o.id === selectedOppgave.id 
        ? { ...o, kommentarer: [...o.kommentarer, nyKommentar.trim()] } 
        : o
    ));
    setSelectedOppgave(prev => prev ? { ...prev, kommentarer: [...prev.kommentarer, nyKommentar.trim()] } : null);
    setNyKommentar("");
    toast({
      title: "Kommentar lagt til",
      description: "Din kommentar er lagret."
    });
  };

  const ikkeStartet = oppgaver.filter(o => o.status === "ikke_startet").length;
  const underArbeid = oppgaver.filter(o => o.status === "under_arbeid").length;
  const ferdig = oppgaver.filter(o => o.status === "ferdig").length;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-hero text-primary-foreground py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Mine Oppgaver</h1>
          <p className="text-primary-foreground/80">
            Oversikt over dine tildelte revisjonsoppdrag
          </p>
        </div>
      </section>

      <div className="py-8 px-6 -mt-6">
        <div className="max-w-5xl mx-auto">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                  <Clock className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{ikkeStartet}</p>
                  <p className="text-sm text-muted-foreground">Ikke startet</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10">
                  <Clock className="h-6 w-6 text-amber-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{underArbeid}</p>
                  <p className="text-sm text-muted-foreground">Under arbeid</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
                  <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{ferdig}</p>
                  <p className="text-sm text-muted-foreground">Ferdig</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tasks List */}
          <Card>
            <CardHeader>
              <CardTitle>Oppgaveliste</CardTitle>
              <CardDescription>Klikk på en oppgave for å se detaljer og legge til kommentarer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {oppgaver.map((oppgave) => {
                  const config = statusConfig[oppgave.status];
                  
                  return (
                    <div 
                      key={oppgave.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                          oppgave.status === "ferdig" ? "bg-emerald-500/10" : 
                          oppgave.status === "under_arbeid" ? "bg-amber-500/10" : "bg-muted"
                        }`}>
                          {oppgave.status === "ferdig" ? (
                            <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                          ) : (
                            <Clock className={`h-6 w-6 ${oppgave.status === "under_arbeid" ? "text-amber-500" : "text-muted-foreground"}`} />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{oppgave.klient}</p>
                          <p className="text-sm text-muted-foreground">
                            Datasett: {oppgave.datasett} • Frist: {oppgave.frist}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Badge className={config.color}>{config.label}</Badge>
                        
                        {oppgave.kommentarer.length > 0 && (
                          <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MessageSquare className="h-4 w-4" />
                            {oppgave.kommentarer.length}
                          </span>
                        )}

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setSelectedOppgave(oppgave)}
                            >
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-lg">
                            <DialogHeader>
                              <DialogTitle>{oppgave.klient}</DialogTitle>
                              <DialogDescription>
                                Datasett {oppgave.datasett} • Frist: {oppgave.frist}
                              </DialogDescription>
                            </DialogHeader>
                            
                            <div className="space-y-4">
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">Status:</span>
                                <Badge className={config.color}>{config.label}</Badge>
                              </div>

                              {/* Comments */}
                              <div>
                                <h4 className="text-sm font-medium mb-2">Kommentarer</h4>
                                {oppgave.kommentarer.length > 0 ? (
                                  <div className="space-y-2 max-h-40 overflow-y-auto">
                                    {oppgave.kommentarer.map((kommentar, idx) => (
                                      <div key={idx} className="p-3 rounded-lg bg-muted/50 text-sm">
                                        {kommentar}
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-sm text-muted-foreground">Ingen kommentarer enda</p>
                                )}
                              </div>

                              {/* Add Comment */}
                              <div className="space-y-2">
                                <Textarea 
                                  placeholder="Skriv en kommentar..."
                                  value={nyKommentar}
                                  onChange={(e) => setNyKommentar(e.target.value)}
                                  className="min-h-[80px]"
                                />
                                <Button 
                                  onClick={leggTilKommentar}
                                  disabled={!nyKommentar.trim()}
                                  size="sm"
                                  className="gap-2"
                                >
                                  <Send className="h-4 w-4" />
                                  Legg til kommentar
                                </Button>
                              </div>
                            </div>

                            <DialogFooter className="flex-col sm:flex-row gap-2">
                              <Button variant="outline" asChild>
                                <Link to={oppgave.url}>Gå til analyse</Link>
                              </Button>
                              {oppgave.status !== "ferdig" && (
                                <Button onClick={() => markerSomFerdig(oppgave.id)}>
                                  <CheckCircle2 className="h-4 w-4 mr-2" />
                                  Marker som ferdig
                                </Button>
                              )}
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        <Button variant="outline" size="sm" asChild>
                          <Link to={oppgave.url}>Åpne</Link>
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
