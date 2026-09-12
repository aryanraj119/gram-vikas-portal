import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, ChevronRight, MapPin, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { type PortalItem, portalSections, services, schemes } from "@/lib/portal-data";

export function SectionHeader({ eyebrow, title, description, action, to }: { eyebrow?: string; title: string; description?: string; action?: string; to?: string }) {
  return <div className="mb-7 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4"><div className="min-w-0">{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2 className="section-title">{title}</h2>{description && <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">{description}</p>}</div>{action && to && <Button variant="outline" asChild className="hidden sm:inline-flex"><Link to={to as "/"}>{action}<ArrowRight /></Link></Button>}</div>;
}

export function InfoCard({ item, to }: { item: PortalItem; to?: string }) {
  const Icon = item.icon;
  return <article className="group card-surface flex h-full flex-col p-5"><div className="flex items-start justify-between gap-3"><span className="icon-well"><Icon /></span>{item.meta && <span className="status-pill">{item.meta}</span>}</div><h3 className="mt-5 text-lg font-bold text-foreground">{item.title}</h3><p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">{item.description}</p>{(item.action || to) && <Link to={(to ?? "/citizen-services") as "/"} className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-primary">{item.action ?? "View details"}<ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" /></Link>}</article>;
}

export function GlobalSearch({ inverse = false }: { inverse?: boolean }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => [...services, ...schemes].filter((item) => query.length > 1 && `${item.title} ${item.description}`.toLowerCase().includes(query.toLowerCase())).slice(0, 5), [query]);
  return <div className="relative mx-auto w-full max-w-3xl"><label className="sr-only" htmlFor={inverse ? "hero-search" : "page-search"}>Search services, forms or schemes</label><div className={`grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 rounded-xl border p-2 shadow-panel ${inverse ? "border-primary-foreground/30 bg-background" : "border-border bg-background"}`}><Search className="ml-2 size-5 text-muted-foreground" /><input id={inverse ? "hero-search" : "page-search"} value={query} onChange={(e) => setQuery(e.target.value)} className="min-w-0 bg-transparent px-1 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground sm:text-base" placeholder="Search services, forms, or welfare schemes..." autoComplete="off"/><Button>Search</Button></div>{results.length > 0 && <div className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-xl border border-border bg-background p-2 text-left shadow-panel">{results.map((item) => <Link key={item.title} to={item.meta ? "/schemes" : "/citizen-services"} className="flex items-center justify-between rounded-lg px-3 py-3 hover:bg-muted"><span><span className="block text-sm font-bold text-foreground">{item.title}</span><span className="block text-xs text-muted-foreground">{item.meta ?? "Citizen service"}</span></span><ChevronRight className="size-4 text-muted-foreground" /></Link>)}</div>}</div>;
}

export function ProgressMetric({ label, value }: { label: string; value: number }) { return <div><div className="mb-2 flex items-center justify-between gap-3 text-sm"><span className="font-semibold text-foreground">{label}</span><strong className="text-primary">{value}%</strong></div><Progress value={value} aria-label={`${label}: ${value}%`} /></div>; }

export function DemoNotice() { return <div className="flex items-start gap-3 rounded-lg border border-warning/25 bg-warning/5 p-4 text-sm leading-6 text-foreground"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-warning" /><p><strong>Demonstration data:</strong> Figures, names, dates and contacts on this preview are sample content. Connect verified Panchayat records before publication.</p></div>; }

export function InteriorPage({ pageKey }: { pageKey: keyof typeof portalSections }) {
  const content = portalSections[pageKey];
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Current", "Completed", "Documents"];
  return <div>
    <section className="page-masthead"><div className="container-page py-14 sm:py-20"><p className="eyebrow">{content.eyebrow}</p><h1 className="page-title max-w-4xl">{content.title}</h1><p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">{content.description}</p></div></section>
    <section className="container-page py-10 sm:py-14"><DemoNotice/><div className="mt-8 flex flex-wrap gap-2" aria-label="Content filters">{filters.map((item) => <Button key={item} variant={filter === item ? "default" : "outline"} size="sm" onClick={() => setFilter(item)}>{item}</Button>)}</div><div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{content.items.map((item) => <InfoCard key={item.title} item={item} />)}</div></section>
    <FeaturePanel pageKey={pageKey} />
  </div>;
}

function FeaturePanel({ pageKey }: { pageKey: keyof typeof portalSections }) {
  const isProgress = pageKey === "projects" || pageKey === "environment" || pageKey === "grievances";
  return <section className="section-band"><div className="container-page py-14"><SectionHeader eyebrow="Interactive overview" title={pageKey === "infrastructure" ? "Village base map" : pageKey === "finance" ? "Where our rupee goes" : pageKey === "culture" ? "Virtual gallery & village voices" : pageKey === "grievances" ? "Complaint journey" : pageKey === "environment" ? "Green Scoreboard" : "At a glance"} description="A clear, citizen-friendly view designed for quick understanding."/><div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]"><div className="card-surface min-h-72 p-6">{pageKey === "infrastructure" ? <VillageMap/> : <div className="space-y-6">{isProgress ? <><ProgressMetric label="Current completion" value={78}/><ProgressMetric label="Citizen coverage" value={86}/><ProgressMetric label="Verified records" value={64}/></> : <><ProgressMetric label="Core services" value={92}/><ProgressMetric label="Community participation" value={74}/><ProgressMetric label="Annual target" value={81}/></>}</div>}</div><div className="card-surface p-6"><h3 className="text-xl font-bold">Need assistance?</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Visit the Panchayat office or use the citizen help desk for guidance in English, Marathi or Hindi.</p><Button className="mt-6" asChild><Link to="/citizen-services">Open citizen help desk<ArrowRight /></Link></Button></div></div></div></section>;
}

function VillageMap() { return <div className="relative h-full min-h-64 overflow-hidden rounded-lg bg-map"><div className="absolute inset-0 map-grid" />{[["Panchayat","25%","30%"],["School","62%","20%"],["Health centre","72%","64%"],["Water source","38%","70%"]].map(([label,left,top]) => <button key={label} style={{left,top}} className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary p-2 text-primary-foreground shadow-panel" aria-label={label}><MapPin className="size-4" /></button>)}<div className="absolute bottom-3 left-3 rounded-md bg-background/95 px-3 py-2 text-xs font-semibold">Illustrative village facility map</div></div>; }