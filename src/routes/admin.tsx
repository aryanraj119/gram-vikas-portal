import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Megaphone,
  Landmark,
  Cpu,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { OverviewPanel } from "@/components/admin/overview-panel";
import { GrievancePanel } from "@/components/admin/grievance-panel";
import { SchemesPanel } from "@/components/admin/schemes-panel";
import { SelfHealingPanel } from "@/components/admin/self-healing-panel";
import { VillageSwitcher } from "@/components/admin/village-switcher";
import { VillageProvider, useVillageContext } from "@/lib/village-context";
import { getStoredIncidents } from "@/lib/admin-store";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Multi-Tenant Admin Portal | Gram Panchayat Network" },
      { name: "description", content: "Multi-tenant Gram Panchayat administrative portal with global village switcher, grievance cell, scheme budgets, and AI self-healing engine." },
    ],
  }),
  component: AdminDashboardWrapper,
});

function AdminDashboardWrapper() {
  return (
    <VillageProvider>
      <AdminDashboardContent />
    </VillageProvider>
  );
}

type TabType = "overview" | "grievances" | "schemes" | "self-healing";

function AdminDashboardContent() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const { activeVillageId, activeVillage } = useVillageContext();

  const incidents = getStoredIncidents(activeVillageId);
  const openIncidents = incidents.filter((i) => i.status !== "Resolved").length;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Tricolor Institutional Accent Header */}
      <div className="h-1.5 bg-gradient-to-r from-amber-500 via-white to-emerald-600" />

      {/* Admin Top Bar */}
      <header className="border-b border-border bg-card/90 backdrop-blur">
        <div className="container-page flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <Landmark className="size-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                  Multi-Tenant Admin Portal
                </span>
                <span className="rounded bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                  {activeVillage.name}
                </span>
              </div>
              <h1 className="text-xl font-extrabold text-foreground sm:text-2xl">
                Gram Panchayat Administrative Control Hub
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" /> Back to Citizen Portal
            </Link>

            <Button
              size="sm"
              variant={activeTab === "self-healing" ? "default" : "outline"}
              onClick={() => setActiveTab("self-healing")}
              className="gap-2"
            >
              <Cpu className="size-3.5 text-amber-500 animate-pulse" />
              <span>Self-Healing Engine</span>
              {openIncidents > 0 && (
                <span className="grid size-5 place-items-center rounded-full bg-rose-500 text-[10px] font-extrabold text-white">
                  {openIncidents}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Persistent Global Village Switcher */}
        <VillageSwitcher />

        {/* Tab Navigation */}
        <div className="border-t border-border bg-muted/40">
          <div className="container-page flex overflow-x-auto gap-2 py-2">
            {[
              { id: "overview", label: "Overview & Metrics", icon: LayoutDashboard },
              { id: "grievances", label: "Grievance Cell", icon: Megaphone },
              { id: "schemes", label: "Schemes & Fund Management", icon: Landmark },
              {
                id: "self-healing",
                label: "System Health & Self-Healing",
                icon: Cpu,
                badge: openIncidents > 0 ? `${openIncidents} Open` : undefined,
              },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-background hover:text-foreground"
                  }`}
                >
                  <Icon className="size-4" />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="rounded-full bg-rose-500 px-2 py-0.5 text-[10px] text-white">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Admin Content View */}
      <main className="container-page py-8">
        {activeTab === "overview" && <OverviewPanel />}
        {activeTab === "grievances" && <GrievancePanel />}
        {activeTab === "schemes" && <SchemesPanel />}
        {activeTab === "self-healing" && <SelfHealingPanel />}
      </main>
    </div>
  );
}
