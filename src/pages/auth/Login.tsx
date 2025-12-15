import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
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

          <h1 className="text-3xl font-bold text-foreground mb-2">Velkommen tilbake</h1>
          <p className="text-muted-foreground mb-8">
            Logg inn for å fortsette til ditt dashboard
          </p>

          <form className="space-y-4">
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Passord</Label>
                <Link 
                  to="/glemt-passord" 
                  className="text-sm text-accent hover:underline"
                >
                  Glemt passord?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>

            <Button asChild variant="accent" className="w-full" size="lg">
              <Link to="/app">Logg inn</Link>
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Har du ikke konto?{" "}
            <Link to="/registrer" className="text-accent hover:underline font-medium">
              Registrer deg
            </Link>
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
            Moderne revisjonsanalyse
          </h2>
          <p className="text-primary-foreground/80 text-lg">
            Importer SAF-T, analyser data og eksporter rapporter – alt på ett sted. 
            Spar timer på hver revisjon.
          </p>
        </div>
      </div>
    </div>
  );
}
