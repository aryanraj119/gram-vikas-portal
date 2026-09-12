import { useState } from "react";
import { Bug, CheckCircle2, AlertTriangle, X, Send, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getStoredIncidents, saveIncidents, type IncidentSeverity, type Incident } from "@/lib/admin-store";
import { useRouterState } from "@tanstack/react-router";
import { VILLAGES_DATA } from "@/lib/village-context";

export function FloatingBugReportButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [severity, setSeverity] = useState<IncidentSeverity>("Medium");
  const [description, setDescription] = useState("");
  const [stackTrace, setStackTrace] = useState("");
  const [selectedVillageId, setSelectedVillageId] = useState<string>("gp-khed");
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    const newIncident: Incident = {
      id: `INC-${Math.floor(1000 + Math.random() * 9000)}`,
      villageId: selectedVillageId,
      timestamp: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
      routeUrl: `${pathname}?villageId=${selectedVillageId}`,
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "Web Browser",
      description: description.trim(),
      stackTrace: stackTrace.trim() || undefined,
      severity,
      status: "Open",
    };

    const allIncidents = getStoredIncidents("all");
    saveIncidents([newIncident, ...allIncidents]);

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsOpen(false);
      setDescription("");
      setStackTrace("");
    }, 2000);
  };

  const selectedVillageObj = VILLAGES_DATA.find((v) => v.id === selectedVillageId) || VILLAGES_DATA[1]!;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 z-50 flex items-center gap-2 rounded-full border border-primary/20 bg-primary px-4 py-3 text-xs font-bold text-primary-foreground shadow-panel transition-all hover:scale-105 hover:bg-primary/90 md:bottom-6 md:right-6"
        aria-label="Report a site issue or bug"
      >
        <Bug className="size-4 text-warning animate-pulse" />
        <span>Report Site Issue</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-background p-6 shadow-panel">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-2.5">
                <span className="grid size-9 place-items-center rounded-lg bg-warning/15 text-warning">
                  <AlertTriangle className="size-5" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-foreground">Report a Site Issue / Bug</h3>
                  <p className="text-xs text-muted-foreground">Captured for Panchayat IT Self-Healing Engine</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>

            {submitted ? (
              <div className="py-12 text-center">
                <CheckCircle2 className="mx-auto size-14 text-emerald-500 animate-bounce" />
                <h4 className="mt-4 text-lg font-bold text-foreground">Ticket Logged Successfully!</h4>
                <p className="mt-2 text-xs text-muted-foreground">
                  The issue has been routed to the Gram Panchayat Self-Healing & AI Diagnostics Cell for {selectedVillageObj.name}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1">
                    Select Target Gram Panchayat
                  </label>
                  <select
                    value={selectedVillageId}
                    onChange={(e) => setSelectedVillageId(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background p-2.5 text-xs outline-none focus:ring-2 focus:ring-primary"
                  >
                    {VILLAGES_DATA.filter((v) => !v.isAll).map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.name} ({v.lgdCode})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="rounded-lg bg-muted/60 p-3 text-xs">
                  <div className="flex justify-between">
                    <span className="font-semibold text-muted-foreground">Target Route:</span>
                    <code className="font-bold text-primary">{pathname}?villageId={selectedVillageId}</code>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5">
                    Issue Severity
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {(["Low", "Medium", "High", "Critical"] as IncidentSeverity[]).map((level) => (
                      <button
                        type="button"
                        key={level}
                        onClick={() => setSeverity(level)}
                        className={`rounded-lg border py-2 text-xs font-bold transition-all ${
                          severity === level
                            ? level === "Critical"
                              ? "border-destructive bg-destructive/15 text-destructive"
                              : level === "High"
                              ? "border-amber-500 bg-amber-500/15 text-amber-600"
                              : "border-primary bg-primary/10 text-primary"
                            : "border-border bg-background text-muted-foreground"
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5">
                    Describe what went wrong <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g. Property tax payment page showed blank screen when submitting certificate application..."
                    className="w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground mb-1">
                    Console Logs / Error Stack Trace (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={stackTrace}
                    onChange={(e) => setStackTrace(e.target.value)}
                    placeholder="Uncaught TypeError: Cannot read property 'map' of undefined..."
                    className="w-full rounded-xl border border-border bg-muted/40 p-2.5 font-mono text-[11px] text-foreground outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="gap-2">
                    <Send className="size-3.5" /> Submit to IT Cell
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
