import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, CheckCircle2, Droplets, Leaf, ShieldCheck, Sprout, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DemoNotice, ProgressMetric, SectionHeader } from "@/components/portal-ui";
import { projects, stats } from "@/lib/portal-data";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "Village Progress Dashboard | Aaple Gaon Gram Panchayat" },
      { name: "description", content: "Transparent tracking of village development targets, infrastructure progress, sanitation and civic metrics." },
    ],
  }),
  component: ProgressDashboard,
});

function ProgressDashboard() {
  const metrics = [
    { label: "Tap Water Coverage", value: 92, target: "100%", status: "On Track", icon: Droplets },
    { label: "Sanitation & Waste", value: 94, target: "100%", status: "Achieved", icon: CheckCircle2 },
    { label: "Solar Street Lighting", value: 88, target: "95%", status: "Near Completion", icon: Leaf },
    { label: "Digital Citizen Services", value: 81, target: "90%", status: "Active", icon: ShieldCheck },
    { label: "Green Cover & Plantation", value: 85, target: "90%", status: "On Track", icon: Sprout },
  ];

  const wardPerformance = [
    { ward: "Ward 1 (Central)", population: "1,240", progress: 95, focus: "Solar Corridor & Water Tap Network" },
    { ward: "Ward 2 (East)", population: "1,150", progress: 88, focus: "Internal Concrete Roading" },
    { ward: "Ward 3 (West)", population: "1,080", progress: 91, focus: "Anganwadi Sanitation Upgrade" },
    { ward: "Ward 4 (North)", population: "1,120", progress: 84, focus: "Piped Water Pipeline Extension" },
    { ward: "Ward 5 (South)", population: "1,100", progress: 89, focus: "Waste Segregation & Compost Pits" },
    { ward: "Ward 6 (Suburbs)", population: "1,152", progress: 82, focus: "Health Sub-Centre Extension" },
  ];

  return (
    <div>
      <section className="page-masthead">
        <div className="container-page py-14 sm:py-20">
          <p className="eyebrow">Open Governance & Accountability</p>
          <h1 className="page-title max-w-4xl">Village Progress Dashboard</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Real-time tracking of infrastructure targets, welfare metrics and ward-level development milestones.
          </p>
        </div>
      </section>

      <section className="container-page py-10 sm:py-14">
        <DemoNotice />

        <div className="mt-10">
          <SectionHeader
            eyebrow="Key Performance Indicators"
            title="Annual Target Tracking (2026)"
            description="Clear comparison of current achievements against annual targets."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {metrics.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.label} className="card-surface p-6">
                  <div className="flex items-center justify-between">
                    <span className="icon-well"><Icon /></span>
                    <span className="status-pill">{item.status}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-foreground">{item.label}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">Target: {item.target}</p>
                  <div className="mt-5">
                    <ProgressMetric label="Current Completion" value={item.value} />
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-16">
          <SectionHeader
            eyebrow="Ward-by-Ward Snapshot"
            title="Gram Panchayat Wards Performance"
            description="Detailed status across all 6 administrative village wards."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {wardPerformance.map((w) => (
              <article key={w.ward} className="card-surface p-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-primary">{w.ward}</span>
                  <span className="text-xs text-muted-foreground">{w.population} residents</span>
                </div>
                <h4 className="mt-3 text-base font-bold">{w.focus}</h4>
                <div className="mt-5">
                  <ProgressMetric label="Development Score" value={w.progress} />
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <SectionHeader
            eyebrow="Major Works"
            title="Active Infrastructure Projects"
            action="View all projects"
            to="/projects"
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {projects.map((p) => {
              const Icon = p.icon;
              return (
                <article key={p.title} className="card-surface p-6">
                  <div className="flex items-start justify-between">
                    <span className="icon-well"><Icon /></span>
                    <span className="status-pill">{p.status}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold">{p.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{p.year} · Budget: {p.cost}</p>
                  <div className="mt-5">
                    <ProgressMetric label="Completion" value={p.progress} />
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-16 rounded-2xl bg-primary p-8 text-primary-foreground sm:p-12">
          <div className="flex items-center gap-3">
            <Award className="size-8 text-primary-foreground/80" />
            <h2 className="text-2xl font-extrabold sm:text-3xl">Smart Village Vision 2026</h2>
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-primary-foreground/80 sm:text-base">
            Through transparent administration, citizen feedback, and sustainable infrastructure, Aaple Gaon is dedicated to establishing 100% clean water access, solar self-reliance, and seamless digital service delivery for every household.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button variant="surface" asChild>
              <Link to="/citizen-services">Access Citizen Services <ArrowRight /></Link>
            </Button>
            <Button variant="heroOutline" asChild>
              <Link to="/grievances">Submit Feedback / Grievance</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
