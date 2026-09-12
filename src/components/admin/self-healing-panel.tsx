import { useState, useEffect } from "react";
import {
  Sparkles,
  Wrench,
  Key,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  RefreshCw,
  X,
  ShieldCheck,
  Check,
  Trash2,
  Landmark,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getStoredIncidents,
  saveIncidents,
  getGeminiKey,
  saveGeminiKey,
  revokeGeminiKey,
  testGeminiApiKey,
  runGeminiIncidentDiagnosis,
  addLog,
  type Incident,
  type IncidentStatus,
  type AIDiagnosis,
} from "@/lib/admin-store";
import { useVillageContext, VILLAGES_DATA } from "@/lib/village-context";

export function SelfHealingPanel() {
  const { activeVillageId, activeVillage } = useVillageContext();
  const [incidents, setIncidents] = useState<Incident[]>(getStoredIncidents(activeVillageId));
  const [apiKey, setApiKey] = useState<string>(getGeminiKey());
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [keyInput, setKeyInput] = useState("");
  const [isTestingKey, setIsTestingKey] = useState(false);
  const [keyTestStatus, setKeyTestStatus] = useState<"none" | "success" | "error">("none");
  const [keyTestError, setKeyTestError] = useState("");

  // Resolution States
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [manualModalOpen, setManualModalOpen] = useState(false);
  const [manualPatchNotes, setManualPatchNotes] = useState("");

  // AI Diagnostic Loading State
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  useEffect(() => {
    setIncidents(getStoredIncidents(activeVillageId));
    setApiKey(getGeminiKey());
  }, [activeVillageId]);

  const handleSaveKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyInput.trim()) return;

    setIsTestingKey(true);
    setKeyTestStatus("none");
    setKeyTestError("");

    try {
      await testGeminiApiKey(keyInput.trim());
      saveGeminiKey(keyInput.trim());
      setApiKey(keyInput.trim());
      setKeyTestStatus("success");
      setTimeout(() => {
        setShowKeyModal(false);
        setKeyTestStatus("none");
      }, 1200);
    } catch (err: any) {
      setKeyTestStatus("error");
      setKeyTestError(err.message || "Failed to validate Gemini API Key.");
    } finally {
      setIsTestingKey(false);
    }
  };

  const handleRevokeKey = () => {
    revokeGeminiKey();
    setApiKey("");
    setShowKeyModal(false);
  };

  const handleManualResolve = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIncident) return;

    const allIncidents = getStoredIncidents("all");
    const updated = allIncidents.map((item) => {
      if (item.id === selectedIncident.id) {
        return {
          ...item,
          status: "Resolved" as IncidentStatus,
          patchNotes: manualPatchNotes.trim() || `Manual patch applied by IT admin for ${activeVillage.name}.`,
          resolvedAt: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
        };
      }
      return item;
    });

    saveIncidents(updated);
    setIncidents(getStoredIncidents(activeVillageId));
    addLog(
      selectedIncident.villageId,
      "IT Officer",
      `Manually Resolved ${selectedIncident.id}`,
      "System Patch",
      manualPatchNotes.trim() || "Applied manual fix for " + selectedIncident.routeUrl
    );

    setManualModalOpen(false);
    setSelectedIncident(null);
    setManualPatchNotes("");
  };

  const handleResolveWithAI = async (incident: Incident) => {
    setSelectedIncident(incident);
    setAiError(null);

    // If key missing, prompt key modal
    if (!apiKey) {
      setKeyInput("");
      setShowKeyModal(true);
      return;
    }

    const targetVillageObj = VILLAGES_DATA.find((v) => v.id === incident.villageId) || activeVillage;

    setAnalyzingId(incident.id);
    try {
      const diagnosis: AIDiagnosis = await runGeminiIncidentDiagnosis(
        incident,
        apiKey,
        targetVillageObj.name,
        targetVillageObj.lgdCode
      );

      const allIncidents = getStoredIncidents("all");
      const updated = allIncidents.map((item) => {
        if (item.id === incident.id) {
          return {
            ...item,
            status: "AI Analyzed" as IncidentStatus,
            aiDiagnosis: diagnosis,
          };
        }
        return item;
      });

      saveIncidents(updated);
      setIncidents(getStoredIncidents(activeVillageId));
    } catch (err: any) {
      setAiError(err.message || "AI Analysis failed.");
    } finally {
      setAnalyzingId(null);
    }
  };

  const handleApplyAIPatch = (incident: Incident) => {
    if (!incident.aiDiagnosis) return;

    const allIncidents = getStoredIncidents("all");
    const updated = allIncidents.map((item) => {
      if (item.id === incident.id) {
        return {
          ...item,
          status: "Resolved" as IncidentStatus,
          patchNotes: `[Automated AI Patch Applied]\nVillage Impact: ${incident.aiDiagnosis?.villageImpact}\nRemediation: ${incident.aiDiagnosis?.remediation}\nCode Fix: ${incident.aiDiagnosis?.codePatch}`,
          resolvedAt: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
        };
      }
      return item;
    });

    saveIncidents(updated);
    setIncidents(getStoredIncidents(activeVillageId));
    addLog(
      incident.villageId,
      "Gemini AI Engine",
      `Applied AI Patch ${incident.id}`,
      "System Patch",
      `Automated fix deployed for ${incident.routeUrl}. Remediation: ${incident.aiDiagnosis.remediation}`
    );
  };

  const handleDismissAI = (incidentId: string) => {
    const allIncidents = getStoredIncidents("all");
    const updated = allIncidents.map((item) => {
      if (item.id === incidentId) {
        return {
          ...item,
          status: "Open" as IncidentStatus,
          aiDiagnosis: undefined,
        };
      }
      return item;
    });
    saveIncidents(updated);
    setIncidents(getStoredIncidents(activeVillageId));
  };

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-background to-accent p-6 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="size-6 text-primary animate-pulse" />
            <h2 className="text-2xl font-bold text-foreground">Village Self-Healing Engine</h2>
            <span className="rounded-md bg-purple-500/15 px-2.5 py-0.5 text-xs font-bold text-purple-700">
              {activeVillage.name}
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Automated bug triage, localized root cause analysis, and 1-click code patch deployment powered by Google Gemini AI.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {apiKey ? (
            <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs font-bold text-emerald-700">
              <CheckCircle2 className="size-4" />
              <span>Gemini AI Connected</span>
              <button
                onClick={() => setShowKeyModal(true)}
                className="ml-2 text-[10px] underline hover:text-emerald-900"
              >
                Config
              </button>
            </div>
          ) : (
            <Button
              onClick={() => {
                setKeyInput("");
                setShowKeyModal(true);
              }}
              variant="default"
              className="gap-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
            >
              <Key className="size-4" /> Configure Gemini API Key
            </Button>
          )}
        </div>
      </div>

      {/* Feed Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-foreground">
            {activeVillageId === "all" ? "Aggregated Multi-Village Incident Feed" : `${activeVillage.name} Incident Feed`}
          </h3>
          <p className="text-xs text-muted-foreground">
            {incidents.filter((i) => i.status !== "Resolved").length} open issues requiring triage
          </p>
        </div>
      </div>

      {/* Incident Cards */}
      <div className="space-y-4">
        {incidents.length === 0 ? (
          <div className="card-surface p-12 text-center text-muted-foreground">
            <ShieldCheck className="mx-auto size-12 text-emerald-500" />
            <h4 className="mt-3 text-base font-bold text-foreground">No Reported Site Issues</h4>
            <p className="mt-1 text-xs">The portal for {activeVillage.name} is operating smoothly with 0 open incidents.</p>
          </div>
        ) : (
          incidents.map((incident) => {
            const isAnalyzing = analyzingId === incident.id;
            const targetVillageObj = VILLAGES_DATA.find((v) => v.id === incident.villageId);

            return (
              <div
                key={incident.id}
                className={`card-surface p-6 border transition-all ${
                  incident.status === "Resolved"
                    ? "border-border bg-card/60 opacity-85"
                    : incident.status === "AI Analyzed"
                    ? "border-purple-500/40 bg-purple-500/5 shadow-md"
                    : incident.severity === "Critical"
                    ? "border-rose-500/40 bg-rose-500/5 shadow-sm"
                    : "border-border"
                }`}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-3">
                    <span
                      className={`grid size-10 shrink-0 place-items-center rounded-xl font-bold text-xs ${
                        incident.severity === "Critical"
                          ? "bg-rose-500/20 text-rose-700"
                          : incident.severity === "High"
                          ? "bg-amber-500/20 text-amber-700"
                          : "bg-blue-500/20 text-blue-700"
                      }`}
                    >
                      {incident.severity[0]}
                    </span>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <strong className="text-sm font-extrabold text-foreground">{incident.id}</strong>

                        {activeVillageId === "all" && (
                          <span className="inline-flex items-center gap-1 rounded bg-purple-500/10 px-2.5 py-0.5 text-[10px] font-extrabold text-purple-700">
                            <Landmark className="size-3" />
                            {targetVillageObj?.name || incident.villageId}
                          </span>
                        )}

                        <span className="rounded bg-muted px-2 py-0.5 font-mono text-[11px] font-semibold text-primary">
                          {incident.routeUrl}
                        </span>

                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold ${
                            incident.severity === "Critical"
                              ? "bg-rose-500 text-white"
                              : incident.severity === "High"
                              ? "bg-amber-500 text-white"
                              : "bg-slate-200 text-slate-700"
                          }`}
                        >
                          {incident.severity} Severity
                        </span>

                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold ${
                            incident.status === "Resolved"
                              ? "bg-emerald-500/20 text-emerald-800"
                              : incident.status === "AI Analyzed"
                              ? "bg-purple-500/20 text-purple-800"
                              : "bg-amber-500/20 text-amber-800"
                          }`}
                        >
                          {incident.status}
                        </span>
                      </div>
                      <p className="mt-2 text-xs font-semibold text-foreground">{incident.description}</p>
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        Reported: {incident.timestamp} · Target: {targetVillageObj?.name} ({targetVillageObj?.lgdCode})
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {incident.status !== "Resolved" && (
                    <div className="flex shrink-0 items-center gap-2 self-start sm:self-center">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedIncident(incident);
                          setManualPatchNotes(incident.patchNotes || "");
                          setManualModalOpen(true);
                        }}
                      >
                        <Wrench className="size-3.5" /> Resolve by Self
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleResolveWithAI(incident)}
                        disabled={isAnalyzing}
                        className="gap-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700"
                      >
                        {isAnalyzing ? (
                          <>
                            <RefreshCw className="size-3.5 animate-spin" /> Analyzing...
                          </>
                        ) : (
                          <>
                            <Sparkles className="size-3.5 text-yellow-300" /> Resolve with AI
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>

                {/* Stack Trace Accordion */}
                {incident.stackTrace && (
                  <details className="mt-3 rounded-lg border border-border/80 bg-muted/30 text-xs">
                    <summary className="cursor-pointer p-2.5 font-bold text-muted-foreground hover:text-foreground">
                      View Error Stack Trace / Client Logs
                    </summary>
                    <pre className="overflow-x-auto p-3 font-mono text-[11px] text-destructive bg-card border-t border-border">
                      {incident.stackTrace}
                    </pre>
                  </details>
                )}

                {/* AI Diagnostic Output */}
                {incident.aiDiagnosis && incident.status !== "Resolved" && (
                  <div className="mt-5 overflow-hidden rounded-xl border border-purple-500/30 bg-purple-500/5 p-5">
                    <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
                      <div className="flex items-center gap-2 text-xs font-extrabold text-purple-700">
                        <Sparkles className="size-4 text-purple-600" />
                        <span>Google Gemini AI Diagnostic Report ({targetVillageObj?.name})</span>
                        <span className="text-[10px] text-muted-foreground font-normal">
                          · {incident.aiDiagnosis.analyzedAt}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDismissAI(incident.id)}
                        className="text-xs font-semibold text-muted-foreground hover:text-foreground"
                      >
                        Dismiss
                      </button>
                    </div>

                    <div className="mt-4 space-y-3 text-xs">
                      <div>
                        <strong className="block text-foreground font-bold mb-1">1. Root Cause Analysis:</strong>
                        <p className="text-muted-foreground leading-relaxed bg-background/80 p-3 rounded-lg border border-border">
                          {incident.aiDiagnosis.rootCause}
                        </p>
                      </div>

                      <div>
                        <strong className="block text-foreground font-bold mb-1">2. Village & Scope Impact Assessment:</strong>
                        <p className="text-purple-900 font-semibold leading-relaxed bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                          {incident.aiDiagnosis.villageImpact}
                        </p>
                      </div>

                      <div>
                        <strong className="block text-foreground font-bold mb-1">3. Remediation Action:</strong>
                        <p className="text-muted-foreground leading-relaxed bg-background/80 p-3 rounded-lg border border-border">
                          {incident.aiDiagnosis.remediation}
                        </p>
                      </div>

                      <div>
                        <strong className="block text-foreground font-bold mb-1">4. Executable Patch / Code Fix:</strong>
                        <pre className="overflow-x-auto rounded-lg bg-slate-950 p-4 font-mono text-[11px] text-emerald-400 border border-slate-800">
                          {incident.aiDiagnosis.codePatch}
                        </pre>
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <Button
                          size="sm"
                          onClick={() => handleApplyAIPatch(incident)}
                          className="gap-2 bg-emerald-600 text-white hover:bg-emerald-700"
                        >
                          <Check className="size-4" /> Apply Suggested Patch
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Resolved Patch Log */}
                {incident.status === "Resolved" && incident.patchNotes && (
                  <div className="mt-4 rounded-lg bg-emerald-500/10 p-3 text-xs text-emerald-900 border border-emerald-500/20">
                    <strong className="block font-bold mb-1">Resolution Patch Log ({incident.resolvedAt}):</strong>
                    <p className="whitespace-pre-wrap text-muted-foreground">{incident.patchNotes}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Manual Resolution Modal */}
      {manualModalOpen && selectedIncident && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-border bg-background p-6 shadow-panel">
            <h3 className="text-lg font-bold text-foreground">Manual Resolution ({selectedIncident.id})</h3>
            <p className="mt-1 text-xs text-muted-foreground">Log patch notes and mark issue as resolved</p>

            <form onSubmit={handleManualResolve} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1">Admin Patch Notes / Action Taken</label>
                <textarea
                  rows={4}
                  required
                  value={manualPatchNotes}
                  onChange={(e) => setManualPatchNotes(e.target.value)}
                  placeholder="e.g. Cleared cached schema validation rules and updated form fallback state."
                  className="w-full rounded-xl border border-border bg-background p-3 text-xs outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setManualModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Mark Resolved & Log Patch</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Gemini API Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-border bg-background p-6 shadow-panel">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <Key className="size-5 text-amber-500" />
                <h3 className="text-base font-bold text-foreground">Configure Gemini API Key</h3>
              </div>
              <button onClick={() => setShowKeyModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="size-4" />
              </button>
            </div>

            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Enter your Google Gemini API Key to diagnose village portal anomalies and generate localized code patches.
            </p>

            <form onSubmit={handleSaveKey} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1">Gemini API Key</label>
                <input
                  type="password"
                  required
                  value={keyInput}
                  onChange={(e) => setKeyInput(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full rounded-xl border border-border bg-background p-3 text-xs outline-none focus:ring-2 focus:ring-primary font-mono"
                />
              </div>

              {keyTestStatus === "error" && (
                <div className="rounded-lg bg-rose-500/10 p-3 text-xs text-rose-700 border border-rose-500/20">
                  <AlertTriangle className="inline size-4 mr-1.5" />
                  {keyTestError}
                </div>
              )}

              {keyTestStatus === "success" && (
                <div className="rounded-lg bg-emerald-500/10 p-3 text-xs text-emerald-700 border border-emerald-500/20 flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-emerald-600" />
                  <span>Key Verified & Connected Successfully!</span>
                </div>
              )}

              <div className="flex justify-between items-center pt-2">
                {apiKey ? (
                  <button
                    type="button"
                    onClick={handleRevokeKey}
                    className="text-xs font-semibold text-rose-600 hover:underline flex items-center gap-1"
                  >
                    <Trash2 className="size-3.5" /> Revoke Key
                  </button>
                ) : (
                  <span />
                )}

                <div className="flex gap-2">
                  <Button type="button" variant="outline" onClick={() => setShowKeyModal(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isTestingKey}>
                    {isTestingKey ? <RefreshCw className="size-3.5 animate-spin" /> : "Verify & Save"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
