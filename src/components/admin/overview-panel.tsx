import { useState, useEffect } from "react";
import { Users, FileCheck, Award, AlertCircle, ShieldCheck, Clock, Building2, MapPin } from "lucide-react";
import { getStoredGrievances, getStoredSchemes, getStoredIncidents, getStoredLogs } from "@/lib/admin-store";
import { useVillageContext } from "@/lib/village-context";
import { ProgressMetric } from "@/components/portal-ui";

export function OverviewPanel() {
  const { activeVillageId, activeVillage } = useVillageContext();

  const grievances = getStoredGrievances(activeVillageId);
  const schemes = getStoredSchemes(activeVillageId);
  const incidents = getStoredIncidents(activeVillageId);
  const logs = getStoredLogs(activeVillageId);

  const openGrievances = grievances.filter((g) => g.status !== "Resolved").length;
  const openIncidents = incidents.filter((i) => i.status !== "Resolved").length;
  const totalAllocated = schemes.reduce((acc, s) => acc + s.allocatedAmount, 0);
  const totalSpent = schemes.reduce((acc, s) => acc + s.spentAmount, 0);

  const metrics = [
    {
      label: "Registered Citizens",
      value: activeVillage.population.toLocaleString("en-IN"),
      sub: `${activeVillage.households} Households`,
      icon: Users,
      color: "text-blue-600 bg-blue-500/10",
    },
    {
      label: "Pending Scheme Applications",
      value: String(activeVillage.isAll ? 142 : Math.round(activeVillage.population * 0.005 + 12)),
      sub: "PMAY-G, PM-Kisan",
      icon: FileCheck,
      color: "text-emerald-600 bg-emerald-500/10",
    },
    {
      label: "Certificates Issued (2026)",
      value: String(activeVillage.isAll ? 984 : Math.round(activeVillage.population * 0.04)),
      sub: "Birth, Death, Residence",
      icon: Award,
      color: "text-amber-600 bg-amber-500/10",
    },
    {
      label: "Open Grievances",
      value: String(openGrievances),
      sub: `${grievances.length} Total Filed`,
      icon: AlertCircle,
      color: "text-rose-600 bg-rose-500/10",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Scope Indicator Banner */}
      <div className="flex items-center justify-between rounded-xl bg-primary/10 p-4 border border-primary/20">
        <div>
          <span className="text-[10px] font-extrabold uppercase text-primary tracking-wider">Active Scope</span>
          <h3 className="text-base font-bold text-foreground">{activeVillage.name} Analytics Overview</h3>
        </div>
        <div className="text-right text-xs">
          <span className="font-semibold text-muted-foreground">LGD Code:</span>{" "}
          <strong className="text-primary">{activeVillage.lgdCode}</strong>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <article key={m.label} className="card-surface p-5 border border-border">
              <div className="flex items-center justify-between">
                <span className={`grid size-11 place-items-center rounded-xl ${m.color}`}>
                  <Icon className="size-6" />
                </span>
                <span className="text-xs font-semibold text-muted-foreground">{m.sub}</span>
              </div>
              <strong className="mt-4 block text-3xl font-extrabold text-foreground">{m.value}</strong>
              <span className="mt-1 block text-xs font-semibold text-muted-foreground">{m.label}</span>
            </article>
          );
        })}
      </div>

      {/* Financial & System Snapshot */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card-surface p-6 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-foreground">Fund Utilization ({activeVillage.name})</h3>
              <p className="text-xs text-muted-foreground">Panchayat Allocations & Expenditure</p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 px-3 py-1 rounded-full">
              {totalAllocated > 0 ? Math.round((totalSpent / totalAllocated) * 100) : 0}% Utilized
            </span>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex justify-between text-sm font-semibold">
              <span>Total Budget Allocated:</span>
              <strong className="text-foreground">₹{totalAllocated.toFixed(1)} Lakh</strong>
            </div>
            <div className="flex justify-between text-sm font-semibold">
              <span>Total Disbursed & Spent:</span>
              <strong className="text-primary">₹{totalSpent.toFixed(1)} Lakh</strong>
            </div>
            <ProgressMetric
              label="Village Financial Utilization Progress"
              value={totalAllocated > 0 ? Math.round((totalSpent / totalAllocated) * 100) : 0}
            />
          </div>
        </div>

        <div className="card-surface p-6 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-foreground">System Health Snapshot</h3>
              <p className="text-xs text-muted-foreground">Self-Healing Diagnostics for {activeVillage.name}</p>
            </div>
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full ${
                openIncidents > 0 ? "bg-amber-500/15 text-amber-700" : "bg-emerald-500/15 text-emerald-700"
              }`}
            >
              {openIncidents > 0 ? `${openIncidents} Issues Need Attention` : "All Operational"}
            </span>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3 text-xs">
              <span className="font-semibold text-foreground">Web Bugs Logged ({activeVillage.name}):</span>
              <strong className="text-foreground">{incidents.length} Total</strong>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3 text-xs">
              <span className="font-semibold text-foreground">Pending AI Diagnostics:</span>
              <strong className="text-primary">{incidents.filter((i) => i.status === "Open").length} Open</strong>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-emerald-500/10 p-3 text-xs text-emerald-700 font-semibold">
              <span>Automated Patches Deployed:</span>
              <strong>{incidents.filter((i) => i.status === "Resolved").length} Resolved</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Log */}
      <div className="card-surface p-6 border border-border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-foreground">Audit Activity Log ({activeVillage.name})</h3>
            <p className="text-xs text-muted-foreground">Real-time disbursements, notices, and system patches for active scope</p>
          </div>
          <ShieldCheck className="size-5 text-primary" />
        </div>

        <div className="space-y-3">
          {logs.length === 0 ? (
            <div className="p-8 text-center text-xs text-muted-foreground">No recent audit log entries for {activeVillage.name}.</div>
          ) : (
            logs.slice(0, 5).map((log) => (
              <div key={log.id} className="flex flex-col justify-between rounded-xl border border-border p-3.5 sm:flex-row sm:items-center gap-2">
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg text-xs font-bold ${
                      log.category === "System Patch"
                        ? "bg-purple-500/15 text-purple-700"
                        : log.category === "Fund Disbursed"
                        ? "bg-emerald-500/15 text-emerald-700"
                        : "bg-blue-500/15 text-blue-700"
                    }`}
                  >
                    {log.category === "System Patch" ? "AI" : "₹"}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-foreground">{log.action}</span>
                      <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
                        {log.category}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{log.details}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground sm:self-center">
                  <Clock className="size-3" />
                  <span>{log.timestamp}</span>
                  <span className="font-semibold text-foreground">• {log.user}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
