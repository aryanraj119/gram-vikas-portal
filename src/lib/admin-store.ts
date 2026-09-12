export type GrievancePriority = "Water Supply" | "Sanitation" | "Roads" | "Electricity" | "General";
export type GrievanceStatus = "Under Review" | "Assigned" | "Resolved";

export type Grievance = {
  id: string;
  villageId: string;
  citizenName: string;
  ward: string;
  category: GrievancePriority;
  priority: "Low" | "Medium" | "High" | "Urgent";
  status: GrievanceStatus;
  date: string;
  description: string;
  assignedTo?: string | undefined;
};

export type SchemeBudget = {
  id: string;
  villageId: string;
  schemeName: string;
  code: string;
  allocatedAmount: number; // in INR Lakhs
  spentAmount: number;
  beneficiariesCount: number;
  status: "Active" | "Budget Exhausted" | "Near Completion";
  lastUpdated: string;
};

export type IncidentSeverity = "Low" | "Medium" | "High" | "Critical";
export type IncidentStatus = "Open" | "AI Analyzed" | "In Progress" | "Resolved";

export type AIDiagnosis = {
  rootCause: string;
  villageImpact: string;
  remediation: string;
  codePatch: string;
  analyzedAt: string;
};

export type Incident = {
  id: string;
  villageId: string;
  timestamp: string;
  routeUrl: string;
  userAgent: string;
  description: string;
  stackTrace?: string | undefined;
  severity: IncidentSeverity;
  status: IncidentStatus;
  aiDiagnosis?: AIDiagnosis | undefined;
  patchNotes?: string | undefined;
  resolvedAt?: string | undefined;
};

export type ActivityLog = {
  id: string;
  villageId: string;
  timestamp: string;
  user: string;
  action: string;
  category: "Fund Disbursed" | "Notice Published" | "Ward Update" | "Grievance Update" | "System Patch";
  details: string;
};

const INITIAL_GRIEVANCES: Grievance[] = [
  // GP Khed
  {
    id: "GRV-KHED-01",
    villageId: "gp-khed",
    citizenName: "Ramesh Patil",
    ward: "Ward 2 (Khed East)",
    category: "Water Supply",
    priority: "High",
    status: "Under Review",
    date: "11 Sep 2026",
    description: "Low water pressure in main tap pipeline near banyan tree.",
  },
  {
    id: "GRV-KHED-02",
    villageId: "gp-khed",
    citizenName: "Sunita Deshmukh",
    ward: "Ward 4 (Khed North)",
    category: "Roads",
    priority: "Medium",
    status: "Assigned",
    date: "10 Sep 2026",
    description: "Pothole near Zilla Parishad primary school entrance needs gravel filling.",
    assignedTo: "Junior Engineer (Roads)",
  },
  // GP Shivajinagar
  {
    id: "GRV-SHIV-01",
    villageId: "gp-shivajinagar",
    citizenName: "Anil Shinde",
    ward: "Ward 1 (Central)",
    category: "Electricity",
    priority: "Urgent",
    status: "Resolved",
    date: "08 Sep 2026",
    description: "Solar street lamp #14 flickering continuously at night.",
    assignedTo: "Electrical Contractor",
  },
  {
    id: "GRV-SHIV-02",
    villageId: "gp-shivajinagar",
    citizenName: "Priya Jadhav",
    ward: "Ward 3 (South)",
    category: "Sanitation",
    priority: "Medium",
    status: "Under Review",
    date: "12 Sep 2026",
    description: "Community compost bin requires scheduled clearance before festival week.",
  },
  // GP Pimpalgaon
  {
    id: "GRV-PIMP-01",
    villageId: "gp-pimpalgaon",
    citizenName: "Vikas Pawar",
    ward: "Ward 2 (West)",
    category: "Water Supply",
    priority: "High",
    status: "Under Review",
    date: "12 Sep 2026",
    description: "Overhead storage tank valve leaking into drainage line.",
  },
  // GP Chandanpuri
  {
    id: "GRV-CHAN-01",
    villageId: "gp-chandanpuri",
    citizenName: "Sanjay Thorat",
    ward: "Ward 1 (Temple Side)",
    category: "Roads",
    priority: "Low",
    status: "Assigned",
    date: "09 Sep 2026",
    description: "Speed breaker painting needed near Chandanpuri ST bus stop.",
    assignedTo: "Gram Sevak Office",
  },
];

const INITIAL_SCHEMES: SchemeBudget[] = [
  // GP Khed
  {
    id: "SCH-KHED-01",
    villageId: "gp-khed",
    schemeName: "Pradhan Mantri Awas Yojana (PMAY-G)",
    code: "PMAY-G-KHED",
    allocatedAmount: 48.5,
    spentAmount: 36.2,
    beneficiariesCount: 24,
    status: "Active",
    lastUpdated: "12 Sep 2026",
  },
  {
    id: "SCH-KHED-02",
    villageId: "gp-khed",
    schemeName: "Jal Jeevan Mission (Tap Water)",
    code: "JJM-KHED",
    allocatedAmount: 38.5,
    spentAmount: 27.7,
    beneficiariesCount: 1426,
    status: "Active",
    lastUpdated: "10 Sep 2026",
  },
  // GP Shivajinagar
  {
    id: "SCH-SHIV-01",
    villageId: "gp-shivajinagar",
    schemeName: "MGNREGA Rural Employment Scheme",
    code: "MGNREGA-SHIV",
    allocatedAmount: 25.0,
    spentAmount: 23.8,
    beneficiariesCount: 184,
    status: "Near Completion",
    lastUpdated: "09 Sep 2026",
  },
  {
    id: "SCH-SHIV-02",
    villageId: "gp-shivajinagar",
    schemeName: "Solar Street Light Corridor Project",
    code: "SOLAR-SHIV",
    allocatedAmount: 12.8,
    spentAmount: 12.8,
    beneficiariesCount: 1280,
    status: "Budget Exhausted",
    lastUpdated: "05 Sep 2026",
  },
  // GP Pimpalgaon
  {
    id: "SCH-PIMP-01",
    villageId: "gp-pimpalgaon",
    schemeName: "Jal Jeevan Mission Pipeline",
    code: "JJM-PIMP",
    allocatedAmount: 32.0,
    spentAmount: 18.4,
    beneficiariesCount: 1100,
    status: "Active",
    lastUpdated: "11 Sep 2026",
  },
  // GP Chandanpuri
  {
    id: "SCH-CHAN-01",
    villageId: "gp-chandanpuri",
    schemeName: "School Digital Learning Upgrade",
    code: "EDU-CHAN",
    allocatedAmount: 18.0,
    spentAmount: 14.5,
    beneficiariesCount: 420,
    status: "Active",
    lastUpdated: "07 Sep 2026",
  },
];

const INITIAL_INCIDENTS: Incident[] = [
  // GP Khed
  {
    id: "INC-9012",
    villageId: "gp-khed",
    timestamp: "12 Sep 2026, 17:42",
    routeUrl: "/citizen-services?villageId=gp-khed",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/128.0",
    description: "Property tax calculation form freezes when selecting Ward 4 in Khed village portal.",
    stackTrace: "Uncaught TypeError: Cannot read properties of undefined (reading 'rateMultiplier')\n  at calculateTax (tax-calculator.ts:42)\n  at HTMLButtonElement.dispatch (react-dom.js:1802)",
    severity: "High",
    status: "Open",
  },
  // GP Shivajinagar
  {
    id: "INC-9011",
    villageId: "gp-shivajinagar",
    timestamp: "12 Sep 2026, 14:15",
    routeUrl: "/progress?villageId=gp-shivajinagar",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) Safari/604.1",
    description: "Mobile viewport alignment issue on Shivajinagar Ward progress metric bars.",
    stackTrace: "Warning: Expected server HTML to match client HTML. Progress bar width string mismatch.",
    severity: "Medium",
    status: "Open",
  },
  // GP Pimpalgaon
  {
    id: "INC-9008",
    villageId: "gp-pimpalgaon",
    timestamp: "10 Sep 2026, 09:30",
    routeUrl: "/schemes?villageId=gp-pimpalgaon",
    userAgent: "Mozilla/5.0 (Linux; Android 14) Chrome/127.0",
    description: "Pimpalgaon PMAY-G application PDF download link returns 404.",
    stackTrace: "HTTP 404: /assets/downloads/pmayg-guidelines-marathi.pdf not found",
    severity: "Low",
    status: "Resolved",
    patchNotes: "Updated asset download path to static CDN fallback URL.",
    resolvedAt: "10 Sep 2026, 11:20",
  },
  // GP Chandanpuri
  {
    id: "INC-9005",
    villageId: "gp-chandanpuri",
    timestamp: "08 Sep 2026, 16:20",
    routeUrl: "/grievances?villageId=gp-chandanpuri",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/537.36",
    description: "Grievance status tracker fails to parse Chandanpuri ticket IDs with dash prefix.",
    stackTrace: "RangeError: Invalid array length at parseTicket (tracker.ts:18)",
    severity: "Medium",
    status: "Open",
  },
];

const INITIAL_LOGS: ActivityLog[] = [
  {
    id: "LOG-101",
    villageId: "gp-khed",
    timestamp: "12 Sep 2026, 16:30",
    user: "Gram Sevak (Khed)",
    action: "Funds Disbursed",
    category: "Fund Disbursed",
    details: "Disbursed ₹4.2 Lakh for PMAY-G Installment 3 in GP Khed.",
  },
  {
    id: "LOG-102",
    villageId: "gp-shivajinagar",
    timestamp: "11 Sep 2026, 11:00",
    user: "Sarpanch Office (Shivajinagar)",
    action: "Notice Published",
    category: "Notice Published",
    details: "Published official Gram Sabha notice for Shivajinagar meeting.",
  },
  {
    id: "LOG-103",
    villageId: "gp-pimpalgaon",
    timestamp: "10 Sep 2026, 15:45",
    user: "IT Admin",
    action: "System Patch Applied",
    category: "System Patch",
    details: "Applied asset path patch for scheme download files in Pimpalgaon (INC-9008).",
  },
];

const STORAGE_KEYS = {
  GRIEVANCES: "gp_admin_grievance_v2",
  SCHEMES: "gp_admin_schemes_v2",
  INCIDENTS: "gp_admin_incidents_v2",
  LOGS: "gp_admin_logs_v2",
  GEMINI_KEY: "gp_admin_gemini_key",
};

export function getStoredGrievances(villageId: string = "all"): Grievance[] {
  let list: Grievance[] = INITIAL_GRIEVANCES;
  if (typeof window !== "undefined") {
    const raw = localStorage.getItem(STORAGE_KEYS.GRIEVANCES);
    if (raw) {
      try { list = JSON.parse(raw); } catch { list = INITIAL_GRIEVANCES; }
    } else {
      localStorage.setItem(STORAGE_KEYS.GRIEVANCES, JSON.stringify(INITIAL_GRIEVANCES));
    }
  }
  if (!villageId || villageId === "all") return list;
  return list.filter((g) => g.villageId === villageId);
}

export function saveGrievances(data: Grievance[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.GRIEVANCES, JSON.stringify(data));
}

export function getStoredSchemes(villageId: string = "all"): SchemeBudget[] {
  let list: SchemeBudget[] = INITIAL_SCHEMES;
  if (typeof window !== "undefined") {
    const raw = localStorage.getItem(STORAGE_KEYS.SCHEMES);
    if (raw) {
      try { list = JSON.parse(raw); } catch { list = INITIAL_SCHEMES; }
    } else {
      localStorage.setItem(STORAGE_KEYS.SCHEMES, JSON.stringify(INITIAL_SCHEMES));
    }
  }
  if (!villageId || villageId === "all") return list;
  return list.filter((s) => s.villageId === villageId);
}

export function saveSchemes(data: SchemeBudget[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.SCHEMES, JSON.stringify(data));
}

export function getStoredIncidents(villageId: string = "all"): Incident[] {
  let list: Incident[] = INITIAL_INCIDENTS;
  if (typeof window !== "undefined") {
    const raw = localStorage.getItem(STORAGE_KEYS.INCIDENTS);
    if (raw) {
      try { list = JSON.parse(raw); } catch { list = INITIAL_INCIDENTS; }
    } else {
      localStorage.setItem(STORAGE_KEYS.INCIDENTS, JSON.stringify(INITIAL_INCIDENTS));
    }
  }
  if (!villageId || villageId === "all") return list;
  return list.filter((i) => i.villageId === villageId);
}

export function saveIncidents(data: Incident[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.INCIDENTS, JSON.stringify(data));
}

export function getStoredLogs(villageId: string = "all"): ActivityLog[] {
  let list: ActivityLog[] = INITIAL_LOGS;
  if (typeof window !== "undefined") {
    const raw = localStorage.getItem(STORAGE_KEYS.LOGS);
    if (raw) {
      try { list = JSON.parse(raw); } catch { list = INITIAL_LOGS; }
    } else {
      localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(INITIAL_LOGS));
    }
  }
  if (!villageId || villageId === "all") return list;
  return list.filter((l) => l.villageId === villageId);
}

export function addLog(villageId: string, user: string, action: string, category: ActivityLog["category"], details: string) {
  let list: ActivityLog[] = INITIAL_LOGS;
  if (typeof window !== "undefined") {
    const raw = localStorage.getItem(STORAGE_KEYS.LOGS);
    if (raw) try { list = JSON.parse(raw); } catch { list = INITIAL_LOGS; }
  }

  const newLog: ActivityLog = {
    id: `LOG-${Date.now().toString().slice(-4)}`,
    villageId,
    timestamp: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
    user,
    action,
    category,
    details,
  };
  const updated = [newLog, ...list];
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(updated));
  }
  return updated;
}

export function getGeminiKey(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(STORAGE_KEYS.GEMINI_KEY) || "";
}

export function saveGeminiKey(key: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.GEMINI_KEY, key.trim());
}

export function revokeGeminiKey() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEYS.GEMINI_KEY);
}

export async function testGeminiApiKey(apiKey: string): Promise<boolean> {
  if (!apiKey || apiKey.trim() === "") throw new Error("API key cannot be empty.");
  
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey.trim())}`;
  
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: "Respond with exact JSON: {\"status\": \"ok\"}" }] }]
    }),
  });

  if (!response.ok) {
    const errorJson = await response.json().catch(() => ({}));
    throw new Error(errorJson?.error?.message || `API request failed with status ${response.status}`);
  }

  const data = await response.json();
  return Boolean(data?.candidates?.[0]?.content);
}

/**
 * Context-Aware Gemini AI Diagnosis Engine with Village Scope Assessment
 */
export async function runGeminiIncidentDiagnosis(
  incident: Incident,
  apiKey: string,
  villageName: string = "Gram Panchayat Portal",
  lgdCode: string = "LGD-242000"
): Promise<AIDiagnosis> {
  if (!apiKey) throw new Error("Gemini API Key is missing. Please configure key first.");

  const prompt = `You are a Senior Web Developer and DevOps Engineer for the Multi-Tenant Gram Panchayat Digital Portal Network.
Analyze the following reported technical incident in the context of village "${villageName}" (LGD Code: ${lgdCode}).

INCIDENT PAYLOAD:
- Ticket ID: ${incident.id}
- Target Village: ${villageName} (ID: ${incident.villageId}, LGD: ${lgdCode})
- Route URL: ${incident.routeUrl}
- Client Device: ${incident.userAgent}
- System Severity: ${incident.severity}
- User Description: "${incident.description}"
- Stack Trace / Logs: "${incident.stackTrace || "No explicit stack trace provided."}"

Provide your diagnosis as a VALID JSON OBJECT ONLY matching this structure:
{
  "rootCause": "<Plain-language explanation of why this form or page broke for ${villageName}>",
  "villageImpact": "<Detailed assessment whether this glitch is isolated to ${villageName}'s localized data module or affects the core multi-tenant platform>",
  "remediation": "<Step-by-step action required to fix the issue>",
  "codePatch": "<Exact code diff or patch snippet in TypeScript/React/CSS to resolve the issue>"
}`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey.trim())}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
      }
    }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData?.error?.message || `Gemini API returned error code ${response.status}`);
  }

  const result = await response.json();
  const rawText = result?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!rawText) throw new Error("Received empty response from Gemini API.");

  try {
    const parsed = JSON.parse(rawText);
    return {
      rootCause: parsed.rootCause || `Issue detected in component rendering on ${incident.routeUrl}.`,
      villageImpact: parsed.villageImpact || `Isolated to localized data module for ${villageName}.`,
      remediation: parsed.remediation || "Apply safe fallback state and update input validation.",
      codePatch: parsed.codePatch || `// Fix for ${incident.id} (${villageName})\nconst safeData = data ?? [];`,
      analyzedAt: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
    };
  } catch {
    return {
      rootCause: `Uncaught exception in component state rendering on ${incident.routeUrl}`,
      villageImpact: `Localized to ${villageName} form submission context.`,
      remediation: "Add safe null-coalescing check and wrap route in fallback error boundary.",
      codePatch: `// Automated Fix for ${incident.id}\nconst safeData = data ?? {};`,
      analyzedAt: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
    };
  }
}
