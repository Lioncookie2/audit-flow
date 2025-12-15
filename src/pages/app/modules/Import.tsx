import { useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { ModuleTabs } from "@/components/layout/ModuleTabs";
import { cn } from "@/lib/utils";

type ImportStatus = "idle" | "uploading" | "processing" | "success" | "error";

export default function Import() {
  const { orgId, klientId } = useParams();
  const [status, setStatus] = useState<ImportStatus>("idle");
  const [fileName, setFileName] = useState<string>("");
  const [dragActive, setDragActive] = useState(false);
  
  const baseUrl = `/app/organisasjoner/${orgId}/klienter/${klientId}/datasett`;

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFile = (file: File) => {
    setFileName(file.name);
    setStatus("uploading");
    
    // Simulate upload and processing
    setTimeout(() => {
      setStatus("processing");
      setTimeout(() => {
        if (file.name.endsWith(".xml")) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      }, 2000);
    }, 1500);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const resetImport = () => {
    setStatus("idle");
    setFileName("");
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
          { label: "Import" }
        ]}
      />
      <ModuleTabs baseUrl={baseUrl} />
      
      <div className="py-8 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Importer SAF-T</h1>
            <p className="text-muted-foreground mt-1">
              Last opp en SAF-T Regnskap XML-fil for å importere data
            </p>
          </div>

          {/* Upload Area */}
          <div 
            className={cn(
              "relative rounded-xl border-2 border-dashed p-12 transition-all duration-200",
              dragActive 
                ? "border-accent bg-accent/5" 
                : "border-border bg-card hover:border-accent/50",
              status !== "idle" && "pointer-events-none"
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {status === "idle" && (
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 mb-4">
                  <Upload className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Dra og slipp SAF-T fil her
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  eller klikk for å velge fil fra din maskin
                </p>
                <label>
                  <input
                    type="file"
                    accept=".xml"
                    onChange={handleFileInput}
                    className="hidden"
                  />
                  <Button variant="accent" className="cursor-pointer" asChild>
                    <span>Velg fil</span>
                  </Button>
                </label>
                <p className="text-xs text-muted-foreground mt-4">
                  Støtter SAF-T Regnskap (XML-format)
                </p>
              </div>
            )}

            {status === "uploading" && (
              <div className="flex flex-col items-center text-center">
                <Loader2 className="h-12 w-12 text-accent animate-spin mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Laster opp...
                </h3>
                <p className="text-sm text-muted-foreground">{fileName}</p>
              </div>
            )}

            {status === "processing" && (
              <div className="flex flex-col items-center text-center">
                <Loader2 className="h-12 w-12 text-accent animate-spin mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Behandler SAF-T fil...
                </h3>
                <p className="text-sm text-muted-foreground">
                  Parser kontoplan, bilag og transaksjoner
                </p>
              </div>
            )}

            {status === "success" && (
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 mb-4">
                  <CheckCircle2 className="h-8 w-8 text-success" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Import fullført!
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{fileName}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-lg mb-6">
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-xl font-bold text-foreground">245</p>
                    <p className="text-xs text-muted-foreground">Kontoer</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-xl font-bold text-foreground">1,234</p>
                    <p className="text-xs text-muted-foreground">Bilag</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-xl font-bold text-foreground">5,678</p>
                    <p className="text-xs text-muted-foreground">Transaksjoner</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-xl font-bold text-foreground">134</p>
                    <p className="text-xs text-muted-foreground">Parter</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button onClick={resetImport} variant="outline">
                    Importer ny fil
                  </Button>
                  <Button variant="accent">
                    Gå til analyse
                  </Button>
                </div>
              </div>
            )}

            {status === "error" && (
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 mb-4">
                  <AlertCircle className="h-8 w-8 text-destructive" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Import feilet
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Filen kunne ikke behandles. Kontroller at det er en gyldig SAF-T XML-fil.
                </p>
                <Button onClick={resetImport} variant="outline">
                  Prøv igjen
                </Button>
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="mt-8 rounded-xl border border-border bg-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Om SAF-T import
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">SAF-T Regnskap:</strong> Standard Audit File for Tax er et norsk 
                  XML-format for utveksling av regnskapsdata.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Upload className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Re-import:</strong> Ved import til eksisterende datasett vil 
                  alle data bli overskrevet med innholdet i den nye filen.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Validering:</strong> DataRev validerer automatisk filstruktur, 
                  kontoplaner og bilagsserier under import.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
