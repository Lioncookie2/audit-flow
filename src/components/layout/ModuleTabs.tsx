import { NavLink } from "react-router-dom";
import { 
  FolderOpen, 
  Upload, 
  BarChart3, 
  Search, 
  Download, 
  ShieldCheck, 
  Database 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ModuleTabsProps {
  baseUrl: string;
  datasettId?: string;
}

const modules = [
  { id: "oversikt", label: "Ny/Åpne", icon: FolderOpen },
  { id: "import", label: "Import", icon: Upload },
  { id: "analyse", label: "Analyse", icon: BarChart3 },
  { id: "sporring", label: "Spørring", icon: Search },
  { id: "eksport", label: "Eksport", icon: Download },
  { id: "mmc", label: "MMC", icon: ShieldCheck },
  { id: "sql", label: "SQL", icon: Database },
];

export function ModuleTabs({ baseUrl, datasettId }: ModuleTabsProps) {
  const getModuleUrl = (moduleId: string) => {
    // For modules that need datasettId in the path
    if (datasettId && ["analyse", "sporring", "eksport", "mmc", "sql"].includes(moduleId)) {
      return `${baseUrl}/${datasettId}/${moduleId}`;
    }
    return `${baseUrl}/${moduleId}`;
  };

  return (
    <nav className="sticky top-16 z-40 w-full border-b border-border bg-card">
      <div className="flex items-center gap-1 px-6 py-2 overflow-x-auto">
        {modules.map((module) => {
          const Icon = module.icon;
          return (
            <NavLink
              key={module.id}
              to={getModuleUrl(module.id)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
                  "hover:bg-secondary hover:text-secondary-foreground",
                  isActive
                    ? "bg-accent text-accent-foreground shadow-sm"
                    : "text-muted-foreground"
                )
              }
            >
              <Icon className="h-4 w-4" />
              {module.label}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
