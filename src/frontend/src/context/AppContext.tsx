import type React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { backendInterface } from "../backend";
import { createActorWithConfig } from "../config";

export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  qualifications: string;
  schedule: string;
}

export interface Inquiry {
  id: number;
  name: string;
  phone: string;
  medicines: string;
  submittedAt: number;
}

export interface Settings {
  businessHours: string;
  phone1: string;
  phone2: string;
  upiId: string;
}

interface AppContextType {
  doctors: Doctor[];
  inquiries: Inquiry[];
  settings: Settings;
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  addDoctor: (doctor: Omit<Doctor, "id">) => Promise<void>;
  updateDoctor: (id: number, doctor: Omit<Doctor, "id">) => Promise<void>;
  deleteDoctor: (id: number) => Promise<void>;
  addInquiry: (inquiry: Omit<Inquiry, "id" | "submittedAt">) => void;
  clearInquiries: () => void;
  updateSettings: (settings: Settings) => Promise<void>;
}

const SEED_DOCTORS: Doctor[] = [
  {
    id: 1,
    name: "Dr. Alimpan Basak",
    specialty: "General Physician, Diabetes & Heart",
    qualifications: "MBBS, CCCS, FCCS",
    schedule: "Mon, Wed, Sat",
  },
  {
    id: 2,
    name: "Dr. Gaurav Taparia",
    specialty: "Orthopedic & Spine Surgeon",
    qualifications: "MBBS, MS, FNB",
    schedule: "Mon, Thu",
  },
  {
    id: 3,
    name: "Dr. Kaushik Roy",
    specialty: "Pediatrician",
    qualifications: "MBBS, DCH, MD",
    schedule: "Evening",
  },
  {
    id: 4,
    name: "Dr. Tuhin Shubhra Sarkar",
    specialty: "Internal Medicine",
    qualifications: "MBBS, MD",
    schedule: "Thu 7 PM",
  },
  {
    id: 5,
    name: "Dr. Tanima Garai",
    specialty: "Dermatologist",
    qualifications: "MBBS, MD",
    schedule: "Sun 6 PM",
  },
  {
    id: 6,
    name: "Dr. Sandeeptha Ghosh",
    specialty: "Psychiatrist",
    qualifications: "MBBS, MD",
    schedule: "Daily 6 PM",
  },
  {
    id: 7,
    name: "Dr. Krishnendu Das",
    specialty: "Gynecologist",
    qualifications: "MBBS, MS, DNB",
    schedule: "Mon, Wed, Fri 6 PM",
  },
  {
    id: 8,
    name: "Dr. Rahul De",
    specialty: "ENT Specialist",
    qualifications: "MBBS, MS",
    schedule: "Daily Evening",
  },
  {
    id: 9,
    name: "Dr. Jagannath Saha",
    specialty: "General Medicine",
    qualifications: "MBBS, MD",
    schedule: "Evening",
  },
];

const DEFAULT_SETTINGS: Settings = {
  businessHours: "Mon-Sat: 8 AM \u2013 10 PM | Sun: 9 AM \u2013 8 PM",
  phone1: "+91 6289660967",
  phone2: "+91 9831279222",
  upiId: "SBIBHIM.INSTANT92788270875563486@SBIPAY",
};

let actorInstance: backendInterface | null = null;
async function getActor(): Promise<backendInterface> {
  if (!actorInstance) {
    actorInstance = await createActorWithConfig();
  }
  return actorInstance;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [doctors, setDoctors] = useState<Doctor[]>(() => {
    try {
      const stored = localStorage.getItem("rp_doctors");
      return stored ? JSON.parse(stored) : SEED_DOCTORS;
    } catch {
      return SEED_DOCTORS;
    }
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    try {
      const stored = localStorage.getItem("rp_inquiries");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [settings, setSettings] = useState<Settings>(() => {
    try {
      const stored = localStorage.getItem("rp_settings");
      return stored ? JSON.parse(stored) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem("rp_auth") === "true";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem("rp_doctors", JSON.stringify(doctors));
  }, [doctors]);
  useEffect(() => {
    localStorage.setItem("rp_inquiries", JSON.stringify(inquiries));
  }, [inquiries]);
  useEffect(() => {
    localStorage.setItem("rp_settings", JSON.stringify(settings));
  }, [settings]);
  useEffect(() => {
    localStorage.setItem("rp_auth", String(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    const load = async () => {
      try {
        const actor = await getActor();
        const backendDoctors = await actor.getDoctors();
        if (backendDoctors && backendDoctors.length > 0) {
          const mapped = backendDoctors.map((d, i) => ({ ...d, id: i + 1 }));
          setDoctors(mapped);
        }
      } catch {
        /* use seed data */
      }
      try {
        const actor = await getActor();
        const [bh, p1, p2, upi] = await Promise.all([
          actor.getBusinessHours(),
          actor.getPhone1(),
          actor.getPhone2(),
          actor.getUpiId(),
        ]);
        setSettings({ businessHours: bh, phone1: p1, phone2: p2, upiId: upi });
      } catch {
        /* use defaults */
      }
    };
    load();
  }, []);

  const login = useCallback((username: string, password: string): boolean => {
    if (username === "Tannistho" && password === "PopularPenny_077") {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  const addDoctor = useCallback(async (doctor: Omit<Doctor, "id">) => {
    let newId = Date.now();
    try {
      const actor = await getActor();
      const backendId = await actor.addDoctor(doctor);
      newId = Number(backendId);
    } catch {
      /* local only */
    }
    setDoctors((prev) => [...prev, { ...doctor, id: newId }]);
  }, []);

  const updateDoctor = useCallback(
    async (id: number, doctor: Omit<Doctor, "id">) => {
      try {
        const actor = await getActor();
        await actor.updateDoctor(BigInt(id), doctor);
      } catch {
        /* local only */
      }
      setDoctors((prev) =>
        prev.map((d) => (d.id === id ? { ...doctor, id } : d)),
      );
    },
    [],
  );

  const deleteDoctor = useCallback(async (id: number) => {
    try {
      const actor = await getActor();
      await actor.removeDoctor(BigInt(id));
    } catch {
      /* local only */
    }
    setDoctors((prev) => prev.filter((d) => d.id !== id));
  }, []);

  const addInquiry = useCallback(
    (inquiry: Omit<Inquiry, "id" | "submittedAt">) => {
      const newInquiry: Inquiry = {
        ...inquiry,
        id: Date.now(),
        submittedAt: Date.now(),
      };
      setInquiries((prev) => [newInquiry, ...prev]);
      getActor()
        .then((actor) => {
          actor
            .addPrescription({
              ...inquiry,
              submittedAt: BigInt(newInquiry.submittedAt),
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    [],
  );

  const clearInquiries = useCallback(() => {
    setInquiries([]);
  }, []);

  const updateSettings = useCallback(async (s: Settings) => {
    setSettings(s);
    try {
      const actor = await getActor();
      await Promise.all([
        actor.setBusinessHours(s.businessHours),
        actor.setPhone1(s.phone1),
        actor.setPhone2(s.phone2),
        actor.setUpiId(s.upiId),
      ]);
    } catch {
      /* local only */
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        doctors,
        inquiries,
        settings,
        isAuthenticated,
        login,
        logout,
        addDoctor,
        updateDoctor,
        deleteDoctor,
        addInquiry,
        clearInquiries,
        updateSettings,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
