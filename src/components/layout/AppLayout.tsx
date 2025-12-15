import { Outlet } from "react-router-dom";
import { Header } from "./Header";

interface AppLayoutProps {
  children?: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header userName="Ola Nordmann" userRole="ADMIN" />
      <main className="flex-1">
        {children}
        <Outlet />
      </main>
    </div>
  );
}
