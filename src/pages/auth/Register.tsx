import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Shield, Users } from "lucide-react";

export default function Register() {
  const [role, setRole] = useState<"ADMIN" | "ANSATT">("ADMIN");

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <span className="text-xl font-bold text-primary-foreground">D</span>
              </div>
              <span className="text-2xl font-bold text-foreground">DataRev</span>
            </Link>
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-2">Opprett konto</h1>
          <p className="text-muted-foreground mb-8">
            Kom i gang med DataRev på under ett minutt
          </p>

          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Fornavn</Label>
                <Input id="firstName" placeholder="Ola" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Etternavn</Label>
                <Input id="lastName" placeholder="Nordmann" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-post</Label>
              <Input
                id="email"
                type="email"
                placeholder="navn@bedrift.no"
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Passord</Label>
              <Input
                id="password"
                type="password"
                placeholder="Minst 8 tegn"
                autoComplete="new-password"
              />
            </div>

            <div className="space-y-3">
              <Label>Velg rolle</Label>
              <RadioGroup 
                value={role} 
                onValueChange={(v) => setRole(v as "ADMIN" | "ANSATT")}
                className="grid grid-cols-2 gap-4"
              >
                <label
                  className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    role === "ADMIN" 
                      ? "border-accent bg-accent/5" 
                      : "border-border hover:border-accent/50"
                  }`}
                >
                  <RadioGroupItem value="ADMIN" className="sr-only" />
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                    role === "ADMIN" ? "bg-accent/20" : "bg-muted"
                  }`}>
                    <Shield className={`h-6 w-6 ${role === "ADMIN" ? "text-accent" : "text-muted-foreground"}`} />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-foreground">Admin</p>
                    <p className="text-xs text-muted-foreground">Opprett organisasjon</p>
                  </div>
                </label>

                <label
                  className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    role === "ANSATT" 
                      ? "border-accent bg-accent/5" 
                      : "border-border hover:border-accent/50"
                  }`}
                >
                  <RadioGroupItem value="ANSATT" className="sr-only" />
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                    role === "ANSATT" ? "bg-accent/20" : "bg-muted"
                  }`}>
                    <Users className={`h-6 w-6 ${role === "ANSATT" ? "text-accent" : "text-muted-foreground"}`} />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-foreground">Ansatt</p>
                    <p className="text-xs text-muted-foreground">Bli med i organisasjon</p>
                  </div>
                </label>
              </RadioGroup>
            </div>

            <Button asChild variant="accent" className="w-full" size="lg">
              <Link to="/app">Opprett konto</Link>
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Har du allerede konto?{" "}
            <Link to="/login" className="text-accent hover:underline font-medium">
              Logg inn
            </Link>
          </p>

          <p className="text-center text-xs text-muted-foreground mt-4">
            Ved å opprette konto godtar du våre{" "}
            <Link to="/vilkar" className="text-accent hover:underline">vilkår</Link>
            {" "}og{" "}
            <Link to="/personvern" className="text-accent hover:underline">personvernerklæring</Link>
          </p>
        </div>
      </div>

      {/* Right side - Branding */}
      <div className="hidden lg:flex flex-1 gradient-hero items-center justify-center p-12">
        <div className="max-w-md text-center text-primary-foreground">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-accent/20 mx-auto mb-6">
            <span className="text-4xl font-bold text-accent">D</span>
          </div>
          <h2 className="text-3xl font-bold mb-4">
            Spar timer på hver revisjon
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8">
            Automatiser dataanalyse og fokuser på det som virkelig betyr noe.
          </p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-accent">85%</p>
              <p className="text-sm text-primary-foreground/70">Raskere import</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-accent">100%</p>
              <p className="text-sm text-primary-foreground/70">SAF-T kompatibel</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-accent">24/7</p>
              <p className="text-sm text-primary-foreground/70">Tilgjengelig</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
