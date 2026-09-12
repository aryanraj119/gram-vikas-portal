import { useState, useEffect } from "react";
import { BadgeIndianRupee, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProgressMetric } from "@/components/portal-ui";
import { getStoredSchemes, saveSchemes, addLog, type SchemeBudget } from "@/lib/admin-store";
import { useVillageContext, VILLAGES_DATA } from "@/lib/village-context";

export function SchemesPanel() {
  const { activeVillageId, activeVillage } = useVillageContext();
  const [schemes, setSchemes] = useState<SchemeBudget[]>(getStoredSchemes(activeVillageId));
  const [showDisburseModal, setShowDisburseModal] = useState<SchemeBudget | null>(null);
  const [disburseAmount, setDisburseAmount] = useState("");
  const [disburseNote, setDisburseNote] = useState("");

  useEffect(() => {
    setSchemes(getStoredSchemes(activeVillageId));
  }, [activeVillageId]);

  const handleDisburse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showDisburseModal || !disburseAmount) return;

    const amountLakh = parseFloat(disburseAmount);
    if (isNaN(amountLakh) || amountLakh <= 0) return;

    const allSchemes = getStoredSchemes("all");
    const updated = allSchemes.map((s) => {
      if (s.id === showDisburseModal.id) {
        const newSpent = +(s.spentAmount + amountLakh).toFixed(2);
        const status: SchemeBudget["status"] = newSpent >= s.allocatedAmount ? "Budget Exhausted" : newSpent >= s.allocatedAmount * 0.9 ? "Near Completion" : "Active";
        return {
          ...s,
          spentAmount: newSpent,
          status,
          lastUpdated: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
        };
      }
      return s;
    });

    saveSchemes(updated);
    setSchemes(getStoredSchemes(activeVillageId));
    addLog(
      showDisburseModal.villageId,
      "Sarpanch Office",
      `Disbursed ₹${amountLakh} Lakh`,
      "Fund Disbursed",
      `Allocated to ${showDisburseModal.schemeName}. Note: ${disburseNote || "Regular scheme installment."}`
    );

    setShowDisburseModal(null);
    setDisburseAmount("");
    setDisburseNote("");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold text-foreground">Schemes & Fund Management</h2>
          <span className="rounded-md bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
            {activeVillage.name}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Monitor government scheme allocations, expenditure meters, and record official fund disbursements for {activeVillage.name}
        </p>
      </div>

      {/* Scheme Grid */}
      <div className="grid gap-6 sm:grid-cols-2">
        {schemes.length === 0 ? (
          <div className="col-span-2 card-surface p-12 text-center text-xs text-muted-foreground">
            No active scheme allocations found for {activeVillage.name}.
          </div>
        ) : (
          schemes.map((s) => {
            const utilPct = Math.round((s.spentAmount / s.allocatedAmount) * 100);
            const villageObj = VILLAGES_DATA.find((v) => v.id === s.villageId);
            return (
              <article key={s.id} className="card-surface p-6 border border-border flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase text-primary bg-primary/10 px-2 py-0.5 rounded">{s.code}</span>
                        {activeVillageId === "all" && (
                          <span className="text-[10px] font-bold text-purple-700 bg-purple-500/10 px-2 py-0.5 rounded">
                            {villageObj?.name || s.villageId}
                          </span>
                        )}
                      </div>
                      <h3 className="mt-2 text-lg font-bold text-foreground">{s.schemeName}</h3>
                    </div>
                    <span className={`status-pill ${s.status === "Budget Exhausted" ? "border-rose-500 bg-rose-500/10 text-rose-700" : ""}`}>
                      {s.status}
                    </span>
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-2 rounded-xl bg-muted/40 p-3 text-center text-xs">
                    <div>
                      <span className="text-muted-foreground text-[10px] block">Allocated</span>
                      <strong className="text-foreground text-sm font-extrabold">₹{s.allocatedAmount}L</strong>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-[10px] block">Spent</span>
                      <strong className="text-primary text-sm font-extrabold">₹{s.spentAmount}L</strong>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-[10px] block">Beneficiaries</span>
                      <strong className="text-foreground text-sm font-extrabold">{s.beneficiariesCount}</strong>
                    </div>
                  </div>

                  <div className="mt-5">
                    <ProgressMetric label="Fund Utilization" value={utilPct} />
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-xs">
                  <span className="text-muted-foreground">Updated: {s.lastUpdated}</span>
                  <Button size="sm" onClick={() => setShowDisburseModal(s)} disabled={s.status === "Budget Exhausted"}>
                    <BadgeIndianRupee className="size-3.5" /> Disburse Funds
                  </Button>
                </div>
              </article>
            );
          })
        )}
      </div>

      {/* Disburse Modal */}
      {showDisburseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-border bg-background p-6 shadow-panel">
            <h3 className="text-lg font-bold text-foreground">Disburse Scheme Funds</h3>
            <p className="mt-1 text-xs text-muted-foreground">{showDisburseModal.schemeName}</p>

            <form onSubmit={handleDisburse} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1">Disbursement Amount (in ₹ Lakhs)</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={disburseAmount}
                  onChange={(e) => setDisburseAmount(e.target.value)}
                  placeholder="e.g. 4.5"
                  className="w-full rounded-xl border border-border bg-background p-2.5 text-xs outline-none focus:ring-2 focus:ring-primary"
                />
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Available remaining: ₹{(showDisburseModal.allocatedAmount - showDisburseModal.spentAmount).toFixed(2)} Lakh
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1">Disbursement Purpose / Note</label>
                <input
                  type="text"
                  value={disburseNote}
                  onChange={(e) => setDisburseNote(e.target.value)}
                  placeholder="e.g. Phase 2 tap connection installment"
                  className="w-full rounded-xl border border-border bg-background p-2.5 text-xs outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <Button type="button" variant="outline" onClick={() => setShowDisburseModal(null)}>
                  Cancel
                </Button>
                <Button type="submit">Confirm & Log Disbursement</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
