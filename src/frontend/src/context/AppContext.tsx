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
  description?: string;
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
    specialty: "General Physician",
    qualifications:
      "MBBS (Cal), USLS-BLA-1, CCCS (London), CCEBDM, CIMT, F.C.C.S",
    schedule: "Monday, Wednesday & Saturday (Afternoon)",
    description:
      "An experienced physician known for managing chronic and lifestyle-related diseases with precision and care. Specialization: Diabetes, Heart Disease, Stroke Management.",
  },
  {
    id: 2,
    name: "Dr. Gaurav Taparia",
    specialty: "Orthopaedic & Spine Surgeon",
    qualifications: "MBBS, MS (Ortho), FNB (Spine)",
    schedule: "Monday & Thursday",
    description:
      "Expert in treating fractures, joint pain, and complex spine conditions with modern orthopaedic solutions. Specialization: Bone, Joint & Spine Disorders.",
  },
  {
    id: 3,
    name: "Dr. Kaushik Ray",
    specialty: "Paediatrician",
    qualifications: "MBBS, DCH, MD",
    schedule: "By Appointment Only",
    description:
      "Provides specialized care for infants, children, and adolescents with a focus on overall growth and development. Formerly associated with Dr. B.C. Roy Children Hospital, Medical College Kolkata, Neotia Hospital, Devine Child Care.",
  },
  {
    id: 4,
    name: "Dr. Tuhin Shubhra Sarkar",
    specialty: "General Physician",
    qualifications: "MBBS, MD (Medicine)",
    schedule: "Thursday (7:00 PM)",
    description:
      "Offers expert consultation for a wide range of adult medical conditions with academic excellence and clinical expertise. Assistant Professor, R.G. Kar Medical College & Hospital.",
  },
  {
    id: 5,
    name: "Dr. Tanima Garai",
    specialty: "Dermatologist",
    qualifications: "MBBS (CMC), MD (Dermatology)",
    schedule: "Every Sunday (6:00 PM)",
    description:
      "Specialist in modern dermatological treatments for healthy skin and hair care. Specialization: Skin, Hair & Nail Disorders.",
  },
  {
    id: 6,
    name: "Dr. Sandipta Ghosh",
    specialty: "Consultant Psychiatrist",
    qualifications: "MBBS, MD",
    schedule: "Every Day (6:00 PM)",
    description:
      "Dedicated to improving mental well-being through compassionate and evidence-based psychiatric care. Specialization: Mental Health, Anxiety, Depression, Stress Disorders.",
  },
  {
    id: 7,
    name: "Dr. Krishnendu Das",
    specialty: "Gynaecologist",
    qualifications: "MBBS, MS (G&O), DNB",
    schedule: "Monday, Wednesday & Friday (6:00 PM)",
    description:
      "Highly experienced in women's health, pregnancy care, and gynecological treatments. Ex-Visiting Surgeon at Ramkrishna Mission Seva Pratishthan; Associated with P.G. Hospital, Sishumangal Hospital & Woodlands Hospital, Kolkata.",
  },
  {
    id: 8,
    name: "Dr. Rahul Dey",
    specialty: "ENT Specialist",
    qualifications: "MBBS (Cal), MS (ENT)",
    schedule: "Every Day",
    description:
      "Provides expert care for ENT-related issues with surgical and non-surgical treatments. Specialization: Ear, Nose, Throat & Head-Neck Surgery.",
  },
  {
    id: 9,
    name: "Dr. Jagnnath Saha",
    specialty: "General Medicine",
    qualifications: "MBBS, MD (Radiotherapy)",
    schedule: "By Appointment Only",
    description:
      "Offers general medical consultation and guidance for various health concerns.",
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
      if (localStorage.getItem("rp_doctors_v") !== "2") {
        localStorage.removeItem("rp_doctors");
        localStorage.setItem("rp_doctors_v", "2");
      }
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
