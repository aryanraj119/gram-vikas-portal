import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, CloudSun, Droplets, MapPin, Play, Quote, ShieldCheck, Sparkles, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DemoNotice, GlobalSearch, InfoCard, ProgressMetric, SectionHeader } from "@/components/portal-ui";
import { infrastructure, projects, schemes, services, stats } from "@/lib/portal-data";
import heroImage from "@/assets/village-hero.jpg";
import communityImage from "@/assets/community.jpg";
import infrastructureImage from "@/assets/infrastructure.jpg";

import { useVillageContext } from "@/lib/village-context";
import { Users, Building2, BookOpen, Landmark, Route as RouteIcon } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Aaple Gaon | Digital Gram Panchayat" },
    { name: "description", content: "Access village services, schemes, projects, announcements and transparent development information." },
    { property: "og:title", content: "Aaple Gaon | Digital Gram Panchayat" },
    { property: "og:description", content: "A modern citizen portal for services and village development." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}), component: Index,
});

function Index() {
  const { activeVillage } = useVillageContext();

  const dynamicStats = [
    { label: "Population", value: activeVillage.population.toLocaleString("en-IN"), icon: Users },
    { label: "Households", value: activeVillage.households.toLocaleString("en-IN"), icon: Building2 },
    { label: "Literacy rate", value: "86%", icon: BookOpen },
    { label: "Village wards", value: "6", icon: Landmark },
    { label: "Total area", value: "12.4 km²", icon: RouteIcon },
    { label: "Water sources", value: "18", icon: Droplets },
  ];

  return <>
    <section className="relative min-h-[680px] overflow-hidden bg-foreground text-primary-foreground sm:min-h-[720px]">
      <img src={heroImage} alt="Clean village road, banyan tree and Gram Panchayat building in rural Maharashtra" width={1920} height={1080} className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.16_0.04_260/.9)_0%,oklch(0.16_0.04_260/.65)_48%,transparent_80%)]" />
      <div className="container-page relative flex min-h-[680px] flex-col justify-center py-20 sm:min-h-[720px]">
        <div className="max-w-3xl">
          <p className="mb-4 text-xs font-extrabold uppercase text-primary-foreground/80">Gram Panchayat · {activeVillage.district} District</p>
          <h1 className="max-w-2xl text-5xl font-extrabold leading-[1.05] sm:text-6xl lg:text-7xl">Welcome to {activeVillage.name}</h1>
          <p className="mt-5 text-xl font-semibold text-primary-foreground/90 sm:text-2xl">{activeVillage.marathiName} · LGD Code: {activeVillage.lgdCode}</p>
          <p className="mt-4 max-w-xl text-sm leading-7 text-primary-foreground/75 sm:text-base">Access services, understand village development and take part in transparent local governance led by Sarpanch {activeVillage.sarpanch}.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button size="lg" asChild><Link to="/about">Explore village<ArrowRight /></Link></Button>
            <Button size="lg" variant="heroOutline" asChild><Link to="/citizen-services">Citizen services</Link></Button>
          </div>
        </div>
        <div className="mt-12"><GlobalSearch inverse /></div>
      </div>
    </section>

    <section className="container-page relative z-10 -mt-12 pb-14">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-6">
        {dynamicStats.map(({label,value,icon:Icon}) => (
          <article key={label} className="card-surface p-4 sm:p-5">
            <Icon className="size-5 text-primary"/>
            <strong className="mt-4 block text-2xl font-extrabold sm:text-3xl">{value}</strong>
            <span className="mt-1 block text-xs font-semibold text-muted-foreground">{label}</span>
          </article>
        ))}
      </div>
      <div className="mt-5"><DemoNotice/></div>
    </section>

    <section className="container-page py-12"><SectionHeader eyebrow="Stay informed" title="Alerts & announcements" description="Important notices, meetings and deadlines from your Panchayat." action="View all notices" to="/announcements"/><div className="grid gap-4 lg:grid-cols-3">{[["Important","Gram Sabha scheduled for 28 September","Review the public agenda and submit discussion points.","18 Sep 2026"],["Event","Village health screening camp","Free check-ups at the health sub-centre.","24 Sep 2026"],["Deadline","Property tax assistance week","Get help checking dues and payment options.","30 Sep 2026"]].map(([tag,title,desc,date]) => <article key={title} className="card-surface p-5"><div className="flex items-center justify-between"><span className="status-pill">{tag}</span><time className="text-xs text-muted-foreground">{date}</time></div><h3 className="mt-4 text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{desc}</p><Link to="/announcements" className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-primary">View details<ArrowRight className="size-4" /></Link></article>)}</div></section>

    <section className="section-band"><div className="container-page py-16"><SectionHeader eyebrow="Popular tasks" title="Citizen services" description="The most-used services are always one step away." action="All citizen services" to="/citizen-services"/><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{services.map((item) => <InfoCard key={item.title} item={item} to={item.title.includes("complaint") ? "/grievances" : item.title.includes("scheme") ? "/schemes" : "/citizen-services"}/>)}</div></div></section>

    <section className="container-page py-16"><SectionHeader eyebrow="Village updates" title="Latest news & community message"/><div className="grid gap-5 lg:grid-cols-[1.45fr_.75fr_.8fr]"><article className="card-surface overflow-hidden"><img loading="lazy" src={infrastructureImage} width={1280} height={800} alt="Improved village road with solar street lights" className="aspect-[16/9] w-full object-cover"/><div className="p-5"><span className="status-pill">Development</span><h3 className="mt-3 text-xl font-bold">Solar street-light corridor enters final phase</h3><p className="mt-2 text-sm text-muted-foreground">New lighting improves evening mobility along key internal roads.</p></div></article><div className="space-y-5"><article className="card-surface p-5"><CloudSun className="size-8 text-primary"/><p className="mt-4 text-4xl font-extrabold">28°C</p><p className="font-semibold">Partly cloudy</p><div className="mt-4 flex gap-4 text-xs text-muted-foreground"><span className="flex gap-1"><Droplets className="size-4"/>68%</span><span className="flex gap-1"><Wind className="size-4"/>11 km/h</span></div><p className="mt-4 text-[11px] text-muted-foreground">Demo weather · connect a weather service</p></article><article className="card-surface p-5"><CalendarDays className="size-6 text-primary"/><p className="mt-3 text-sm font-bold">Next Gram Sabha</p><p className="mt-1 text-2xl font-extrabold">28 September</p><p className="text-xs text-muted-foreground">11:00 AM · Panchayat Hall</p></article></div><article className="card-surface flex flex-col p-6"><Quote className="size-8 text-primary"/><p className="mt-5 text-lg font-semibold leading-8">“Transparent decisions and active citizens build a truly prosperous village.”</p><div className="mt-auto pt-8"><p className="font-bold">Panchayat Message</p><p className="text-xs text-muted-foreground">12 September 2026 · Demo</p></div></article></div></section>

    <section className="section-band"><div className="container-page py-16"><SectionHeader eyebrow="Transparent development" title="Village progress" description="Simple indicators show where the village stands against annual targets." action="Open progress dashboard" to="/progress"/><div className="grid gap-5 lg:grid-cols-[1fr_1.3fr]"><article className="card-surface overflow-hidden"><div className="relative"><img loading="lazy" src={communityImage} width={1280} height={800} alt="Women’s self-help group meeting in rural Maharashtra" className="aspect-video w-full object-cover"/><button className="absolute inset-0 grid place-items-center" aria-label="Play welcome video"><span className="grid size-16 place-items-center rounded-full bg-background text-primary shadow-panel"><Play className="ml-1 size-7 fill-current"/></span></button></div><div className="p-5"><h3 className="text-xl font-bold">Welcome to Our Village</h3><p className="mt-1 text-sm text-muted-foreground">A message from community representatives · 02:18</p></div></article><article className="card-surface p-6 sm:p-8"><h3 className="text-xl font-bold">Samriddha Panchayat Yojana</h3><div className="mt-7 space-y-6"><ProgressMetric label="Sanitation coverage" value={94}/><ProgressMetric label="Tap connections" value={87}/><ProgressMetric label="Electricity coverage" value={98}/><ProgressMetric label="Digital service adoption" value={71}/></div><p className="mt-6 text-xs text-muted-foreground">Sample indicators for interface demonstration.</p></article></div></div></section>

    <section className="container-page py-16"><SectionHeader eyebrow="Works in focus" title="Key projects & initiatives" action="See all projects" to="/projects"/><div className="grid gap-4 lg:grid-cols-3">{projects.map(({title,status,progress,cost,year,icon:Icon}) => <article key={title} className="card-surface p-6"><div className="flex items-start justify-between"><span className="icon-well"><Icon/></span><span className="status-pill">{status}</span></div><h3 className="mt-5 text-lg font-bold">{title}</h3><p className="mt-1 text-xs text-muted-foreground">{year} · {cost}</p><div className="mt-5"><ProgressMetric label="Project progress" value={progress}/></div></article>)}</div></section>

    <section className="section-band"><div className="container-page py-16"><SectionHeader eyebrow="Benefits for every family" title="Government schemes" action="Explore all schemes" to="/schemes"/><div className="grid gap-4 lg:grid-cols-3">{schemes.map((item)=><InfoCard key={item.title} item={item} to="/schemes"/>)}</div></div></section>

    <section className="container-page py-16"><SectionHeader eyebrow="Connected village" title="Infrastructure & facilities" action="Open village map" to="/infrastructure"/><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{infrastructure.map((item)=><InfoCard key={item.title} item={item} to="/infrastructure"/>)}</div></section>

    <section className="section-band"><div className="container-page py-16"><div className="grid gap-5 lg:grid-cols-3">{[["Culture & community","Festivals, heritage, local food and village voices.","/culture",Sparkles],["Farmer & employment hub","Market guidance, jobs, skills and local talent.","/employment",MapPin],["Education & youth","Schools, scholarships, sports and youth stories.","/education",ShieldCheck]].map(([title,desc,to,Icon]) => { const I=Icon as typeof Sparkles; return <article key={String(title)} className="card-surface p-6"><I className="size-7 text-primary"/><h2 className="mt-4 text-xl font-bold">{String(title)}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{String(desc)}</p><Button variant="link" className="mt-4 px-0" asChild><Link to={to as "/culture"}>Explore<ArrowRight/></Link></Button></article>})}</div></div></section>

    <section className="container-page py-16"><div className="grid gap-5 lg:grid-cols-2"><article className="card-surface p-7"><SectionHeader eyebrow="Green village" title="Environment scoreboard"/><div className="space-y-5"><ProgressMetric label="Tree plantation target" value={82}/><ProgressMetric label="Waste segregation" value={76}/><ProgressMetric label="Plastic reduction" value={68}/></div><Button className="mt-7" asChild><Link to="/environment">View Green Scoreboard</Link></Button></article><article className="card-surface bg-primary p-7 text-primary-foreground"><p className="text-xs font-extrabold uppercase text-primary-foreground/70">Grievance redressal</p><h2 className="mt-2 text-3xl font-extrabold">Tell us what needs attention.</h2><p className="mt-3 max-w-lg text-sm leading-7 text-primary-foreground/75">Register an issue, receive a complaint number and follow every stage through resolution.</p><div className="mt-7 flex flex-wrap gap-3"><Button variant="surface" asChild><Link to="/grievances">Register a complaint</Link></Button><Button variant="heroOutline" asChild><Link to="/grievances">Track complaint</Link></Button></div></article></div></section>

    <section className="section-band"><div className="container-page py-16"><SectionHeader eyebrow="2026 highlights" title="Top 5 achievements of the year"/><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{[["01","98%","Homes electrified"],["02","94%","Sanitation coverage"],["03","126","Solar street lights"],["04","1,241","Tap connections"],["05","2,800","Trees planted"]].map(([rank,value,title])=><article key={rank} className="card-surface p-5"><span className="text-xs font-extrabold text-primary">#{rank}</span><strong className="mt-5 block text-3xl font-extrabold">{value}</strong><p className="mt-1 text-sm font-semibold text-muted-foreground">{title}</p></article>)}</div></div></section>

    <section className="container-page py-16"><div className="overflow-hidden rounded-xl bg-foreground px-6 py-12 text-center text-primary-foreground sm:px-12"><p className="text-xs font-extrabold uppercase text-primary-foreground/60">My village, my participation</p><h2 className="mx-auto mt-3 max-w-2xl text-3xl font-extrabold sm:text-4xl">Together, we shape the next chapter of our village.</h2><p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-primary-foreground/70">Explore progress, join the Gram Sabha and use services built around citizens.</p><Button className="mt-7" asChild><Link to="/progress">View My Village, My Progress<ArrowRight/></Link></Button></div></section>
  </>;
}