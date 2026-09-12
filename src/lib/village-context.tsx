import React, { createContext, useContext, useState, useEffect } from "react";

export type Village = {
  id: string;
  name: string;
  marathiName: string;
  lgdCode: string;
  taluka: string;
  district: string;
  population: number;
  households: number;
  sarpanch: string;
  sarpanchPhone: string;
  gramSevak: string;
  gramSevakPhone: string;
  isAll?: boolean;
};

export const VILLAGES_DATA: Village[] = [
  {
    id: "all",
    name: "All Villages (Block / Cluster Level)",
    marathiName: "सर्व गावे (गट ग्रामपंचायत)",
    lgdCode: "BLK-242000",
    taluka: "Combined Block",
    district: "Pune / Ahilyanagar",
    population: 24770,
    households: 5120,
    sarpanch: "Block Panchayat Samiti Officer",
    sarpanchPhone: "+91 98220 11000",
    gramSevak: "Block Development Officer (BDO)",
    gramSevakPhone: "+91 98220 11001",
    isAll: true,
  },
  {
    id: "gp-khed",
    name: "Gram Panchayat Khed",
    marathiName: "ग्रामपंचायत खेड",
    lgdCode: "LGD-242011",
    taluka: "Khed",
    district: "Pune",
    population: 8420,
    households: 1740,
    sarpanch: "Smt. Sunita Khedkar",
    sarpanchPhone: "+91 98221 44101",
    gramSevak: "Shri. Rajesh Patil",
    gramSevakPhone: "+91 98221 44102",
  },
  {
    id: "gp-shivajinagar",
    name: "Gram Panchayat Shivajinagar",
    marathiName: "ग्रामपंचायत शिवाजीनगर",
    lgdCode: "LGD-242012",
    taluka: "Haveli",
    district: "Pune",
    population: 6150,
    households: 1280,
    sarpanch: "Shri. Ramesh Shinde",
    sarpanchPhone: "+91 98222 55201",
    gramSevak: "Smt. Priya Deshmukh",
    gramSevakPhone: "+91 98222 55202",
  },
  {
    id: "gp-pimpalgaon",
    name: "Gram Panchayat Pimpalgaon",
    marathiName: "ग्रामपंचायत पिंपळगाव",
    lgdCode: "LGD-242013",
    taluka: "Junnar",
    district: "Pune",
    population: 5280,
    households: 1100,
    sarpanch: "Smt. Anandi Jadhav",
    sarpanchPhone: "+91 98223 66301",
    gramSevak: "Shri. Anil Pawar",
    gramSevakPhone: "+91 98223 66302",
  },
  {
    id: "gp-chandanpuri",
    name: "Gram Panchayat Chandanpuri",
    marathiName: "ग्रामपंचायत चंदनपुरी",
    lgdCode: "LGD-242014",
    taluka: "Sangamner",
    district: "Ahilyanagar",
    population: 4920,
    households: 1000,
    sarpanch: "Shri. Balasaheb Thorat",
    sarpanchPhone: "+91 98224 77401",
    gramSevak: "Smt. Kavita More",
    gramSevakPhone: "+91 98224 77402",
  },
];

type VillageContextType = {
  activeVillageId: string;
  activeVillage: Village;
  villagesList: Village[];
  switchVillage: (id: string) => void;
};

const VillageContext = createContext<VillageContextType | undefined>(undefined);

const STORAGE_KEY = "gp_admin_active_village_id";

export function VillageProvider({ children }: { children: React.ReactNode }) {
  const [activeVillageId, setActiveVillageId] = useState<string>(() => {
    if (typeof window === "undefined") return "all";

    // 1. Check URL query params ?villageId=gp-khed
    const params = new URLSearchParams(window.location.search);
    const queryId = params.get("villageId");
    if (queryId && VILLAGES_DATA.some((v) => v.id === queryId)) {
      return queryId;
    }

    // 2. Check localStorage
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && VILLAGES_DATA.some((v) => v.id === saved)) {
      return saved;
    }

    return "all";
  });

  const activeVillage = VILLAGES_DATA.find((v) => v.id === activeVillageId) || VILLAGES_DATA[0]!;

  const switchVillage = (id: string) => {
    if (!VILLAGES_DATA.some((v) => v.id === id)) return;
    setActiveVillageId(id);

    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, id);

      // Sync URL search params without page reload
      const url = new URL(window.location.href);
      if (id === "all") {
        url.searchParams.delete("villageId");
      } else {
        url.searchParams.set("villageId", id);
      }
      window.history.replaceState({}, "", url.toString());
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const queryId = params.get("villageId");
      if (queryId && queryId !== activeVillageId && VILLAGES_DATA.some((v) => v.id === queryId)) {
        setActiveVillageId(queryId);
      }
    }
  }, []);

  return (
    <VillageContext.Provider
      value={{
        activeVillageId,
        activeVillage,
        villagesList: VILLAGES_DATA,
        switchVillage,
      }}
    >
      {children}
    </VillageContext.Provider>
  );
}

export function useVillageContext() {
  const context = useContext(VillageContext);
  if (!context) {
    throw new Error("useVillageContext must be used within a VillageProvider");
  }
  return context;
}
