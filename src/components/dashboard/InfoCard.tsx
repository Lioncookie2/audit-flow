import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface InfoCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
}

export function InfoCard({ title, description, icon: Icon, className }: InfoCardProps) {
  return (
    <div className={cn(
      "rounded-xl border border-border bg-card p-6 shadow-card card-interactive",
      className
    )}>
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-4">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
