import { Link } from "react-router-dom";
import { Building2, Users, Database, CheckCircle2, Clock, AlertTriangle, TrendingUp, BarChart3, PieChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/dashboard/StatCard";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, LineChart, Line } from "recharts";

const statusData = [
  { name: "Ferdig", value: 18, color: "#10b981" },
  { name: "Under arbeid", value: 7, color: "#f59e0b" },
  { name: "Ikke startet", value: 3, color: "#6b7280" },
];

const monthlyData = [
  { maned: "Jan", datasett: 4, ferdig: 3 },
  { maned: "Feb", datasett: 5, ferdig: 5 },
  { maned: "Mar", datasett: 6, ferdig: 4 },
  { maned: "Apr", datasett: 3, ferdig: 2 },
  { maned: "Mai", datasett: 5, ferdig: 3 },
  { maned: "Jun", datasett: 5, ferdig: 1 },
];

const mmcTrendData = [
  { uke: "Uke 1", ok: 75, feil: 25 },
  { uke: "Uke 2", ok: 78, feil: 22 },
  { uke: "Uke 3", ok: 82, feil: 18 },
  { uke: "Uke 4", ok: 85, feil: 15 },
];

const recentActivity = [
  { type: "ferdig", bruker: "Kari Hansen", klient: "Elektro AS", tid: "2 timer siden" },
  { type: "import", bruker: "Per Olsen", klient: "Bygg & Anlegg AS", tid: "4 timer siden" },
  { type: "feil", bruker: "System", klient: "Rør & Varme AS", tid: "6 timer siden" },
  { type: "ferdig", bruker: "Ola Nordmann", klient: "Transport AS", tid: "1 dag siden" },
];

export default function AdminDashboard() {
  const ferdigProsent = Math.round((18 / 28) * 100);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-hero text-primary-foreground py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-primary-foreground/80">
            Oversikt over alle organisasjoner, klienter og revisjonsoppgaver
          </p>
        </div>
      </section>

      <div className="py-8 px-6 -mt-6">
        <div className="max-w-7xl mx-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <StatCard
              title="Organisasjoner"
              value={3}
              icon={Building2}
              description="Aktive"
            />
            <StatCard
              title="Klienter"
              value={12}
              icon={Users}
              description="Totalt"
            />
            <StatCard
              title="Datasett"
              value={28}
              icon={Database}
              description="Importert"
            />
            <StatCard
              title="Fullført"
              value={`${ferdigProsent}%`}
              icon={CheckCircle2}
              description="Av alle datasett"
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Status Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-accent" />
                  Datasett Status
                </CardTitle>
                <CardDescription>Fordeling etter ferdigstillelse</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-6 mt-4">
                  {statusData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-muted-foreground">{item.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Monthly Bar Chart */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-accent" />
                  Månedlig Aktivitet
                </CardTitle>
                <CardDescription>Importerte vs. ferdigstilte datasett</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="maned" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip />
                      <Bar dataKey="datasett" fill="hsl(var(--accent))" name="Importert" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="ferdig" fill="#10b981" name="Ferdig" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* MMC Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  MMC Kontroll Trend
                </CardTitle>
                <CardDescription>Andel godkjente kontroller over tid</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mmcTrendData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="uke" className="text-xs" />
                      <YAxis className="text-xs" domain={[0, 100]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="ok" stroke="#10b981" strokeWidth={2} name="OK %" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Siste Aktivitet</CardTitle>
                <CardDescription>Nylige hendelser i systemet</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                        activity.type === "ferdig" ? "bg-emerald-500/10" : 
                        activity.type === "feil" ? "bg-red-500/10" : "bg-accent/10"
                      }`}>
                        {activity.type === "ferdig" ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                        ) : activity.type === "feil" ? (
                          <AlertTriangle className="h-5 w-5 text-red-500" />
                        ) : (
                          <Database className="h-5 w-5 text-accent" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">
                          {activity.type === "ferdig" ? "Datasett fullført" : 
                           activity.type === "feil" ? "MMC-feil oppdaget" : "Ny import"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activity.bruker} • {activity.klient}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground">{activity.tid}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
