import {
  Baby,
  BadgeIndianRupee,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CircleHelp,
  ClipboardCheck,
  Droplets,
  FileBadge,
  FileText,
  GraduationCap,
  HandHeart,
  HeartPulse,
  Landmark,
  Leaf,
  Megaphone,
  ReceiptIndianRupee,
  Route,
  ShieldCheck,
  Sprout,
  Trees,
  Users,
  type LucideIcon,
} from "lucide-react";

export type PortalItem = {
  title: string;
  description: string;
  icon: LucideIcon;
  action?: string;
  meta?: string;
};

export const navItems = [
  ["About", "/about"],
  ["Projects", "/projects"],
  ["Schemes", "/schemes"],
  ["Announcements", "/announcements"],
  ["Infrastructure", "/infrastructure"],
  ["Services", "/citizen-services"],
  ["Culture", "/culture"],
  ["Employment", "/employment"],
  ["Education", "/education"],
  ["Grievances", "/grievances"],
  ["Environment", "/environment"],
  ["Progress", "/progress"],
] as const;

export const stats = [
  { label: "Population", value: "6,842", icon: Users },
  { label: "Households", value: "1,426", icon: Building2 },
  { label: "Literacy rate", value: "86%", icon: BookOpen },
  { label: "Village wards", value: "6", icon: Landmark },
  { label: "Total area", value: "12.4 km²", icon: Route },
  { label: "Water sources", value: "18", icon: Droplets },
];

export const services: PortalItem[] = [
  { title: "Certificates", description: "Birth, death and residence certificates.", icon: FileBadge, action: "View certificates" },
  { title: "Pay village tax", description: "View dues and access secure payment options.", icon: ReceiptIndianRupee, action: "Pay tax" },
  { title: "File a complaint", description: "Register a civic issue with supporting details.", icon: Megaphone, action: "Register complaint" },
  { title: "Track complaint", description: "Check status using your complaint number.", icon: ClipboardCheck, action: "Track status" },
  { title: "Find a scheme", description: "Discover welfare schemes and eligibility.", icon: HandHeart, action: "Browse schemes" },
  { title: "Forms & downloads", description: "Official applications, notices and records.", icon: FileText, action: "Open downloads" },
];

export const projects = [
  { title: "Piped water network extension", status: "Ongoing", progress: 72, cost: "₹38.5 lakh", year: "2026", icon: Droplets },
  { title: "Solar street-light corridor", status: "Completed", progress: 100, cost: "₹12.8 lakh", year: "2025", icon: Leaf },
  { title: "Zilla Parishad school upgrade", status: "Ongoing", progress: 58, cost: "₹24 lakh", year: "2026", icon: GraduationCap },
];

export const schemes: PortalItem[] = [
  { title: "Pradhan Mantri Awas Yojana", description: "Housing support for eligible rural households.", icon: Building2, meta: "Central Government" },
  { title: "Jal Jeevan Mission", description: "Functional household tap connection support.", icon: Droplets, meta: "Central Government" },
  { title: "Mahatma Jyotirao Phule Jan Arogya", description: "Health assurance for eligible families.", icon: HeartPulse, meta: "Maharashtra Government" },
];

export const infrastructure: PortalItem[] = [
  { title: "Water & sanitation", description: "Tap connections, wells and waste systems.", icon: Droplets, meta: "Operational" },
  { title: "Roads & street lights", description: "Internal roads and solar lighting network.", icon: Route, meta: "92% coverage" },
  { title: "Schools & Anganwadis", description: "Learning and early-childhood facilities.", icon: Baby, meta: "8 facilities" },
  { title: "Health services", description: "Sub-centre, camps and emergency referrals.", icon: HeartPulse, meta: "Open today" },
];

export const portalSections: Record<string, { eyebrow: string; title: string; description: string; items: PortalItem[] }> = {
  about: { eyebrow: "Village & governance", title: "About the Gram Panchayat", description: "Understand our history, elected body, responsibilities, office services and emergency support.", items: [
    { title: "Village history", description: "A living timeline of community, agriculture and development.", icon: Landmark },
    { title: "Panchayat structure", description: "Meet the Sarpanch, Deputy Sarpanch and ward members.", icon: Users },
    { title: "Who does what?", description: "A simple guide to roles, departments and responsibilities.", icon: CircleHelp },
    { title: "Emergency contacts", description: "Health, police, ambulance, fire, electricity and disaster support.", icon: ShieldCheck },
  ]},
  projects: { eyebrow: "Development", title: "Projects & village initiatives", description: "See completed, ongoing and proposed work with transparent costs, timelines and impact.", items: projects.map((p) => ({ title: p.title, description: `${p.cost} · ${p.progress}% complete`, icon: p.icon, meta: p.status })) },
  schemes: { eyebrow: "Benefits & eligibility", title: "Government schemes", description: "Search central, Maharashtra and district schemes, then understand eligibility and required documents.", items: schemes },
  announcements: { eyebrow: "Public records", title: "Announcements & circulars", description: "Gram Sabha notices, circulars, office orders, camps, elections, deadlines and downloadable forms.", items: [
    { title: "Gram Sabha notice", description: "Agenda, venue and participation details.", icon: Megaphone, meta: "Notice" },
    { title: "Village health camp", description: "Free screening and referral support.", icon: HeartPulse, meta: "Event" },
    { title: "Property tax reminder", description: "Payment guidance and office assistance.", icon: ReceiptIndianRupee, meta: "Deadline" },
    { title: "Download centre", description: "Forms, circulars, applications and records.", icon: FileText, meta: "Documents" },
  ]},
  infrastructure: { eyebrow: "Facilities & maps", title: "Village infrastructure", description: "Explore essential facilities, service status, the village base map and smart-village indicators.", items: infrastructure },
  finance: { eyebrow: "Open governance", title: "Finance & budget transparency", description: "Understand annual income, expenditure and exactly where every village rupee supports development.", items: [
    { title: "Annual budget", description: "Income, expenditure and closing balance by year.", icon: BadgeIndianRupee },
    { title: "Where our rupee goes", description: "A citizen-friendly view of development spending.", icon: ReceiptIndianRupee },
    { title: "Grants & taxes", description: "See village income sources and collection progress.", icon: Landmark },
  ]},
  "citizen-services": { eyebrow: "How can we help?", title: "Citizen services & forms", description: "Certificates, payments, complaints, feedback and official forms in one simple place.", items: services },
  culture: { eyebrow: "Our identity", title: "Village culture & heritage", description: "Discover our history, festivals, temples, food, crafts, tourism, community voices and visual archive.", items: [
    { title: "Heritage & festivals", description: "Traditions, folk arts and annual celebrations.", icon: Landmark },
    { title: "Homestays & tourism", description: "Local experiences, food, crafts and places to visit.", icon: Building2 },
    { title: "Virtual gallery", description: "Old photographs, events and our development journey.", icon: FileText },
    { title: "Voice of the village", description: "Stories from elders, farmers and local experts.", icon: Users },
  ]},
  employment: { eyebrow: "Opportunity", title: "Employment & skills", description: "Find local work, tenders, training, self-help groups, enterprises and skilled people nearby.", items: [
    { title: "Local jobs", description: "Search verified village and nearby opportunities.", icon: BriefcaseBusiness },
    { title: "Tenders & contracts", description: "Current Panchayat procurement opportunities.", icon: FileText },
    { title: "Village talent directory", description: "Electricians, masons, tailors, plumbers and artists.", icon: Users },
    { title: "Women’s empowerment", description: "SHGs, local enterprises and training opportunities.", icon: HandHeart },
  ]},
  education: { eyebrow: "Learning & leadership", title: "Education & youth corner", description: "Schools, scholarships, careers, sports, youth voices and inspiring local achievements.", items: [
    { title: "School information", description: "Facilities, contacts and student performance.", icon: GraduationCap },
    { title: "Scholarships & careers", description: "Current opportunities and application guidance.", icon: BookOpen },
    { title: "Student of the month", description: "Celebrating learning, leadership and talent.", icon: Users },
    { title: "Youth Speak", description: "Blogs, videos and stories by village youth.", icon: Megaphone },
  ]},
  grievances: { eyebrow: "We are listening", title: "Grievance redressal", description: "Register, track and understand the resolution path for a civic complaint.", items: [
    { title: "Register a complaint", description: "Describe your issue and receive a complaint number.", icon: Megaphone },
    { title: "Track complaint", description: "View department, status and expected resolution.", icon: ClipboardCheck },
    { title: "Escalation matrix", description: "Panchayat, block and district escalation levels.", icon: Users },
    { title: "Resolution performance", description: "Monthly totals, resolution rate and average time.", icon: ShieldCheck },
  ]},
  environment: { eyebrow: "Green development", title: "Environment & sustainability", description: "Track trees, waste, water conservation, solar capacity and community campaigns.", items: [
    { title: "Green Scoreboard", description: "Trees, plastic reduction, water saved and solar capacity.", icon: Leaf },
    { title: "Adopt a Tree", description: "Support a tree and follow its location and growth.", icon: Trees },
    { title: "Waste classification", description: "Simple household segregation guidance.", icon: Sprout },
    { title: "Water conservation", description: "Rainwater harvesting and source restoration.", icon: Droplets },
  ]},
  agriculture: { eyebrow: "Farm & livelihood", title: "Agriculture support centre", description: "Simple, timely access to crop advisories, market prices, weather, inputs and farmer schemes.", items: [
    { title: "Crop advisories", description: "Seasonal guidance in simple language.", icon: Sprout },
    { title: "Market prices", description: "Recent indicative prices from nearby markets.", icon: BadgeIndianRupee },
    { title: "Weather guidance", description: "Today’s conditions and farm recommendations.", icon: Droplets },
    { title: "Farmer stories", description: "Practical ideas from local success stories.", icon: Users },
  ]},
};