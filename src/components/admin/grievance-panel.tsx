import { useState, useEffect } from "react";
import { Search, Filter, CheckCircle2, Clock, UserCheck, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getStoredGrievances, saveGrievances, addLog, type Grievance, type GrievancePriority, type GrievanceStatus } from "@/lib/admin-store";
import { useVillageContext, VILLAGES_DATA } from "@/lib/village-context";

export function GrievancePanel() {
  const { activeVillageId, activeVillage } = useVillageContext();
  const [grievances, setGrievances] = useState<Grievance[]>(getStoredGrievances(activeVillageId));
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingGrievance, setEditingGrievance] = useState<Grievance | null>(null);
  const [assignedTo, setAssignedTo] = useState("");
  const [newStatus, setNewStatus] = useState<GrievanceStatus>("Under Review");

  useEffect(() => {
    setGrievances(getStoredGrievances(activeVillageId));
  }, [activeVillageId]);

  const categories: (GrievancePriority | "All")[] = ["All", "Water Supply", "Sanitation", "Roads", "Electricity", "General"];
  const statuses: (GrievanceStatus | "All")[] = ["All", "Under Review", "Assigned", "Resolved"];

  const filtered = grievances.filter((g) => {
    const matchesCat = filterCategory === "All" || g.category === filterCategory;
    const matchesStat = filterStatus === "All" || g.status === filterStatus;
    const matchesQuery = `${g.citizenName} ${g.description} ${g.ward} ${g.id}`.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesStat && matchesQuery;
  });

  const handleUpdateStatus = (g: Grievance) => {
    setEditingGrievance(g);
    setAssignedTo(g.assignedTo || "");
    setNewStatus(g.status);
  };

  const handleSaveUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGrievance) return;

    const allGrievances = getStoredGrievances("all");
    const updated = allGrievances.map((item) => {
      if (item.id === editingGrievance.id) {
        return {
          ...item,
          status: newStatus,
          assignedTo: assignedTo.trim() || undefined,
        };
      }
      return item;
    });

    saveGrievances(updated);
    setGrievances(getStoredGrievances(activeVillageId));
    addLog(
      editingGrievance.villageId,
      "Gram Sevak",
      `Updated Grievance ${editingGrievance.id}`,
      "Grievance Update",
      `Set status to ${newStatus}${assignedTo ? ` (Assigned to ${assignedTo})` : ""}`
    );

    setEditingGrievance(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-foreground">Citizen Grievance Cell</h2>
            <span className="rounded-md bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
              {activeVillage.name}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Manage incoming civic complaints, priority tagging, and department assignment for {activeVillage.name}
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search citizen, ward, or ticket ID..."
            className="w-full rounded-xl border border-border bg-background py-2.5 pl-9 pr-3 text-xs outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="size-4 text-muted-foreground" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full rounded-xl border border-border bg-background p-2.5 text-xs outline-none focus:ring-2 focus:ring-primary"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c === "All" ? "All Categories" : c}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full rounded-xl border border-border bg-background p-2.5 text-xs outline-none focus:ring-2 focus:ring-primary"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>{s === "All" ? "All Statuses" : s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grievances Table */}
      <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-border bg-muted/50 text-muted-foreground font-semibold uppercase">
            <tr>
              <th className="p-3.5">Ticket ID / Date</th>
              {activeVillageId === "all" && <th className="p-3.5">Panchayat Scope</th>}
              <th className="p-3.5">Citizen & Ward</th>
              <th className="p-3.5">Category & Priority</th>
              <th className="p-3.5">Issue Description</th>
              <th className="p-3.5">Assigned Officer</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={activeVillageId === "all" ? 8 : 7} className="p-8 text-center text-muted-foreground">
                  No grievances found for {activeVillage.name}.
                </td>
              </tr>
            ) : (
              filtered.map((g) => {
                const villageObj = VILLAGES_DATA.find((v) => v.id === g.villageId);
                return (
                  <tr key={g.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-3.5 font-bold text-foreground">
                      <div>{g.id}</div>
                      <div className="text-[10px] font-normal text-muted-foreground">{g.date}</div>
                    </td>

                    {activeVillageId === "all" && (
                      <td className="p-3.5">
                        <span className="inline-flex items-center gap-1 rounded bg-purple-500/10 px-2 py-0.5 text-[10px] font-bold text-purple-700">
                          <Landmark className="size-3" />
                          {villageObj?.name || g.villageId}
                        </span>
                      </td>
                    )}

                    <td className="p-3.5 font-medium">
                      <div className="text-foreground font-bold">{g.citizenName}</div>
                      <div className="text-[11px] text-muted-foreground">{g.ward}</div>
                    </td>

                    <td className="p-3.5">
                      <span className="inline-block rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-bold text-primary">
                        {g.category}
                      </span>
                      <div className="mt-1">
                        <span className={`inline-block text-[10px] font-bold ${
                          g.priority === "Urgent" ? "text-rose-600 font-extrabold" : g.priority === "High" ? "text-amber-600" : "text-muted-foreground"
                        }`}>
                          {g.priority} Priority
                        </span>
                      </div>
                    </td>

                    <td className="p-3.5 max-w-xs text-muted-foreground">
                      <p className="line-clamp-2 leading-relaxed">{g.description}</p>
                    </td>

                    <td className="p-3.5 font-medium text-foreground">
                      {g.assignedTo || <span className="text-muted-foreground italic">Unassigned</span>}
                    </td>

                    <td className="p-3.5">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                        g.status === "Resolved"
                          ? "bg-emerald-500/15 text-emerald-700"
                          : g.status === "Assigned"
                          ? "bg-blue-500/15 text-blue-700"
                          : "bg-amber-500/15 text-amber-700"
                      }`}>
                        {g.status === "Resolved" ? <CheckCircle2 className="size-3" /> : g.status === "Assigned" ? <UserCheck className="size-3" /> : <Clock className="size-3" />}
                        {g.status}
                      </span>
                    </td>

                    <td className="p-3.5 text-right">
                      <Button size="sm" variant="outline" onClick={() => handleUpdateStatus(g)}>
                        Update
                      </Button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingGrievance && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-border bg-background p-6 shadow-panel">
            <h3 className="text-lg font-bold text-foreground">Update Grievance #{editingGrievance.id}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{editingGrievance.citizenName} · {editingGrievance.category}</p>

            <form onSubmit={handleSaveUpdate} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1">Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as GrievanceStatus)}
                  className="w-full rounded-xl border border-border bg-background p-2.5 text-xs outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Under Review">Under Review</option>
                  <option value="Assigned">Assigned</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1">Assign to Officer / Department</label>
                <input
                  type="text"
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  placeholder="e.g. Junior Engineer Water Supply"
                  className="w-full rounded-xl border border-border bg-background p-2.5 text-xs outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <Button type="button" variant="outline" onClick={() => setEditingGrievance(null)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
