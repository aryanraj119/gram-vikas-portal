import { useVillageContext } from "@/lib/village-context";
import { Building2, MapPin, Phone, UserCheck, ChevronDown, Landmark, Globe } from "lucide-react";
import { useState } from "react";

export function VillageSwitcher() {
  const { activeVillageId, activeVillage, villagesList, switchVillage } = useVillageContext();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative border-b border-border bg-muted/60 px-4 py-3 sm:px-6">
      <div className="container-page flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* Dropdown Selector */}
        <div className="relative">
          <label className="block text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground mb-1">
            Select Active Gram Panchayat / Scope
          </label>
          <div className="relative">
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex min-w-[280px] sm:min-w-[340px] items-center justify-between rounded-xl border border-primary/30 bg-background px-4 py-2.5 shadow-sm transition-all hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <div className="flex items-center gap-3 text-left">
                <span className={`grid size-8 place-items-center rounded-lg ${activeVillage.isAll ? "bg-purple-500/15 text-purple-700" : "bg-primary/15 text-primary"}`}>
                  {activeVillage.isAll ? <Globe className="size-4" /> : <Landmark className="size-4" />}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-extrabold text-foreground">{activeVillage.name}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-muted-foreground">
                    {activeVillage.marathiName} · {activeVillage.lgdCode}
                  </span>
                </div>
              </div>
              <ChevronDown className={`size-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
            </button>

            {open && (
              <div className="absolute left-0 top-full z-50 mt-1.5 w-full overflow-hidden rounded-xl border border-border bg-background shadow-panel p-1.5 space-y-1">
                {villagesList.map((v) => {
                  const isSelected = v.id === activeVillageId;
                  return (
                    <button
                      key={v.id}
                      onClick={() => {
                        switchVillage(v.id);
                        setOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-xs transition-colors ${
                        isSelected
                          ? "bg-primary text-primary-foreground font-bold"
                          : "text-foreground hover:bg-muted font-medium"
                      }`}
                    >
                      <div>
                        <div className="font-bold">{v.name}</div>
                        <div className={`text-[10px] ${isSelected ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                          {v.marathiName} · {v.taluka}, {v.district}
                        </div>
                      </div>
                      <span className={`rounded-md px-2 py-0.5 text-[10px] font-extrabold ${isSelected ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                        {v.lgdCode}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Selected Village Metadata Bar */}
        <div className="flex flex-wrap items-center gap-3 text-xs bg-background/80 p-3 rounded-xl border border-border">
          <div className="flex items-center gap-1.5">
            <MapPin className="size-3.5 text-primary shrink-0" />
            <span className="font-bold text-foreground">Location:</span>
            <span className="text-muted-foreground">{activeVillage.taluka}, {activeVillage.district}</span>
          </div>

          <div className="hidden sm:block text-border">•</div>

          <div className="flex items-center gap-1.5">
            <Building2 className="size-3.5 text-emerald-600 shrink-0" />
            <span className="font-bold text-foreground">Pop:</span>
            <span className="text-muted-foreground">{activeVillage.population.toLocaleString("en-IN")} residents ({activeVillage.households} HH)</span>
          </div>

          <div className="hidden sm:block text-border">•</div>

          <div className="flex items-center gap-1.5">
            <UserCheck className="size-3.5 text-amber-600 shrink-0" />
            <span className="font-bold text-foreground">Sarpanch:</span>
            <span className="text-muted-foreground">{activeVillage.sarpanch}</span>
          </div>

          <a
            href={`tel:${activeVillage.sarpanchPhone}`}
            className="hidden lg:flex items-center gap-1 text-[11px] font-bold text-primary hover:underline ml-auto"
          >
            <Phone className="size-3" /> Contact Office
          </a>
        </div>
      </div>
    </div>
  );
}
