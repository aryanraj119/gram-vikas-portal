import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Search, Languages, Accessibility, Phone, X, Home, FileBadge, Megaphone, LayoutDashboard, ChevronDown, Globe, Landmark } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { navItems } from "@/lib/portal-data";
import { useVillageContext, VILLAGES_DATA } from "@/lib/village-context";

const langs = ["EN", "मराठी", "हिन्दी"];

export function PortalHeader() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("EN");
  const [largeText, setLargeText] = useState(false);
  const [villageMenuOpen, setVillageMenuOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  const { activeVillageId, activeVillage, switchVillage } = useVillageContext();

  useEffect(() => {
    setOpen(false);
    setVillageMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* Top Banner & Village Switcher */}
      <div className="border-b border-border bg-primary text-primary-foreground">
        <div className="container-page flex flex-wrap min-h-9 items-center justify-between gap-2 py-1 text-xs">
          {/* Citizen Village Selector Dropdown */}
          <div className="relative flex items-center gap-2">
            <span className="font-semibold text-primary-foreground/80">Select Gram Panchayat:</span>
            <div className="relative">
              <button
                onClick={() => setVillageMenuOpen((v) => !v)}
                className="flex items-center gap-1.5 rounded bg-primary-foreground/15 px-2.5 py-1 font-bold text-primary-foreground hover:bg-primary-foreground/25"
              >
                <span>{activeVillage.name}</span>
                <ChevronDown className={`size-3 transition-transform ${villageMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {villageMenuOpen && (
                <div className="absolute left-0 top-full z-50 mt-1 min-w-[240px] overflow-hidden rounded-xl border border-border bg-background p-1.5 shadow-panel">
                  {VILLAGES_DATA.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => {
                        switchVillage(v.id);
                        setVillageMenuOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-semibold ${
                        v.id === activeVillageId
                          ? "bg-primary text-primary-foreground font-bold"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      <span>{v.name}</span>
                      <span className="text-[10px] font-bold opacity-80">{v.lgdCode}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Button
              variant="headerGhost"
              size="sm"
              onClick={() => {
                setLargeText((v) => !v);
                document.documentElement.classList.toggle("large-text");
              }}
              aria-pressed={largeText}
            >
              <Accessibility /> <span className="hidden sm:inline">Text size</span>
            </Button>
            <a className="inline-flex min-h-9 items-center gap-1 px-2 font-semibold" href={`tel:${activeVillage.sarpanchPhone}`}>
              <Phone className="size-3.5" /> Panchayat: {activeVillage.sarpanchPhone}
            </a>
          </div>
        </div>
      </div>

      {/* Header Main Bar */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="container-page grid min-h-20 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 lg:grid-cols-[auto_minmax(0,1fr)_auto]">
          <Link to="/" className="flex min-w-0 items-center gap-3" aria-label="Gram Panchayat home">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground ring-4 ring-primary/10">
              <LandmarkMark />
            </span>
            <span className="min-w-0">
              <span className="block text-[11px] font-bold uppercase text-primary">Gram Panchayat Portal</span>
              <span className="block truncate text-base font-extrabold text-foreground sm:text-lg">
                {activeVillage.name}
              </span>
            </span>
          </Link>

          <nav className="hidden min-w-0 items-center justify-center gap-0.5 xl:flex" aria-label="Main navigation">
            {navItems.slice(0, 7).map(([label, to]) => (
              <Link
                key={to}
                to={to}
                className="rounded-md px-2.5 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                activeProps={{ className: "bg-primary/10 text-primary" }}
              >
                {label}
              </Link>
            ))}
            <Link
              to="/progress"
              className="rounded-md px-2.5 py-2 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground"
              activeProps={{ className: "bg-primary/10 text-primary" }}
            >
              Dashboard
            </Link>
          </nav>

          <div className="flex shrink-0 items-center gap-1.5">
            <Button variant="ghost" size="icon" aria-label="Search"><Search /></Button>

            <div className="hidden items-center rounded-lg border border-border p-1 sm:flex" aria-label="Language selector">
              <Languages className="mx-1 size-4 text-muted-foreground" />
              {langs.map((item) => (
                <button
                  key={item}
                  onClick={() => setLang(item)}
                  className={`min-h-8 rounded-md px-2 text-xs font-bold ${
                    lang === item ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                  }`}
                  aria-pressed={lang === item}
                >
                  {item}
                </button>
              ))}
            </div>

            <Button variant="outline" className="hidden sm:inline-flex border-amber-500/40 text-amber-700 hover:bg-amber-500/10" asChild>
              <Link to="/admin">Admin Portal</Link>
            </Button>
            <Button variant="default" className="hidden lg:inline-flex" asChild>
              <Link to="/citizen-services">Citizen Portal</Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="xl:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {open && (
          <nav className="border-t border-border bg-background px-4 py-4 xl:hidden" aria-label="Mobile navigation">
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-1 sm:grid-cols-3">
              {navItems.map(([label, to]) => (
                <Link
                  key={to}
                  to={to}
                  className="rounded-lg px-3 py-3 text-sm font-semibold text-foreground hover:bg-muted"
                  activeProps={{ className: "bg-primary/10 text-primary" }}
                >
                  {label}
                </Link>
              ))}
              <Link to="/finance" className="rounded-lg px-3 py-3 text-sm font-semibold text-foreground hover:bg-muted">Finance</Link>
              <Link to="/agriculture" className="rounded-lg px-3 py-3 text-sm font-semibold text-foreground hover:bg-muted">Agriculture</Link>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}

function LandmarkMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
      <path fill="currentColor" d="M12 2 3 7v2h18V7l-9-5Zm-6 9v7H4v3h16v-3h-2v-7h-3v7h-2v-7h-2v7H9v-7H6Z" />
    </svg>
  );
}

export function PortalFooter() {
  const { activeVillage } = useVillageContext();

  const groups = [
    ["Gram Panchayat", [["About", "/about"], ["Leadership", "/about"], ["Projects", "/projects"], ["Finance", "/finance"]]],
    ["Citizen services", [["Certificates", "/citizen-services"], ["Tax payment", "/citizen-services"], ["Grievances", "/grievances"], ["Forms", "/announcements"]]],
    ["Our village", [["Infrastructure", "/infrastructure"], ["Culture", "/culture"], ["Employment", "/employment"], ["Environment", "/environment"]]],
    ["Resources", [["Schemes", "/schemes"], ["Announcements", "/announcements"], ["Education", "/education"], ["Progress dashboard", "/progress"]]],
  ] as const;

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_2fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-full bg-primary-foreground/10">
                <LandmarkMark />
              </span>
              <div>
                <p className="text-xs font-bold uppercase text-primary-foreground/70">Gram Panchayat</p>
                <p className="text-xl font-extrabold">{activeVillage.name}</p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-7 text-primary-foreground/70">
              Citizen services, transparent development information and community resources for {activeVillage.name}.
            </p>
            <p className="mt-5 text-sm font-semibold">
              Panchayat Office · Mon–Fri · 10:00–17:30 · Sarpanch: {activeVillage.sarpanch}
            </p>
            <p className="mt-1 text-xs text-primary-foreground/60">
              LGD Code: {activeVillage.lgdCode} · District: {activeVillage.district}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {groups.map(([heading, links]) => (
              <div key={heading}>
                <h2 className="text-sm font-bold">{heading}</h2>
                <ul className="mt-4 space-y-3">
                  {links.map(([label, to]) => (
                    <li key={label}>
                      <Link to={to} className="text-sm text-primary-foreground/65 hover:text-primary-foreground">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-primary-foreground/15 pt-6 text-xs text-primary-foreground/60 sm:flex-row sm:justify-between">
          <p>© 2026 {activeVillage.name} — All Rights Reserved</p>
          <div className="flex gap-5">
            <span>Privacy</span>
            <span>Accessibility</span>
            <span>Terms</span>
            <span>Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function MobileQuickNav() {
  return (
    <nav className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-4 rounded-xl border border-border bg-background p-1.5 shadow-panel md:hidden" aria-label="Quick actions">
      {[[Home, "Home", "/"], [FileBadge, "Services", "/citizen-services"], [Megaphone, "Complaint", "/grievances"], [LayoutDashboard, "Progress", "/progress"]].map(([Icon, label, to]) => {
        const IconComponent = Icon as typeof Home;
        return (
          <Link
            key={String(label)}
            to={to as "/"}
            className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-lg text-[10px] font-bold text-muted-foreground"
            activeProps={{ className: "bg-primary/10 text-primary" }}
          >
            <IconComponent className="size-4" />
            {String(label)}
          </Link>
        );
      })}
    </nav>
  );
}