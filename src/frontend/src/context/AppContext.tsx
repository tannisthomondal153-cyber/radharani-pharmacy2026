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
  specialization?: string;
  experience?: string;
  position?: string;
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

// CANONICAL doctor list — v4. This is the permanent source of truth.
// To update: change data here AND bump DOCTOR_VERSION below.
const DOCTOR_VERSION = "4";

const SEED_DOCTORS: Doctor[] = [
  {
    id: 1,
    name: "Dr. Alimpan Basak",
    specialty: "General Physician",
    qualifications:
      "MBBS (Cal), USLS-BLA-1, CCCS (London), CCEBDM, CIMT, F.C.C.S",
    specialization: "Diabetes Management, Cardiovascular Diseases, Stroke Care",
    schedule: "Monday, Wednesday & Saturday (Afternoon)",
    description:
      "Dr. Basak is a seasoned physician with extensive expertise in managing chronic and lifestyle-related disorders. His clinical approach emphasizes precision diagnosis and long-term patient care.",
  },
  {
    id: 2,
    name: "Dr. Gaurav Taparia",
    specialty: "Orthopaedic & Spine Surgeon",
    qualifications: "MBBS, MS (Orthopaedics), FNB (Spine)",
    specialization: "Bone, Joint & Spine Disorders",
    schedule: "Monday & Thursday",
    description:
      "Dr. Taparia specializes in advanced orthopaedic and spinal treatments, offering both surgical and non-surgical solutions for fractures, joint conditions, and complex spine pathologies.",
  },
  {
    id: 3,
    name: "Dr. Kaushik Ray",
    specialty: "Consultant Paediatrician",
    qualifications: "MBBS, DCH, MD",
    experience:
      "Formerly associated with Dr. B.C. Roy Children's Hospital, Medical College Kolkata, Neotia Hospital, and Devine Child Care",
    schedule: "By Appointment Only",
    description:
      "Dr. Ray provides comprehensive pediatric care, focusing on the physical, emotional, and developmental well-being of infants, children, and adolescents.",
  },
  {
    id: 4,
    name: "Dr. Tuhin Shubhra Sarkar",
    specialty: "General Physician",
    qualifications: "MBBS, MD (Medicine)",
    position: "Assistant Professor, R.G. Kar Medical College & Hospital",
    schedule: "Thursday (7:00 PM)",
    description:
      "Dr. Sarkar combines academic excellence with clinical expertise, offering thorough evaluation and management of a wide spectrum of adult medical conditions.",
  },
  {
    id: 5,
    name: "Dr. Tanima Garai",
    specialty: "Consultant Dermatologist",
    qualifications: "MBBS (CMC), MD (Dermatology)",
    specialization: "Skin, Hair & Nail Disorders",
    schedule: "Every Sunday (6:00 PM)",
    description:
      "Dr. Garai specializes in modern dermatological care, providing advanced treatments for various skin, hair, and nail conditions with a focus on aesthetic and medical outcomes.",
  },
  {
    id: 6,
    name: "Dr. Sandipta Ghosh",
    specialty: "Consultant Psychiatrist",
    qualifications: "MBBS, MD",
    specialization: "Mental Health, Anxiety, Depression, Stress Disorders",
    schedule: "Daily (6:00 PM)",
    description:
      "Dr. Ghosh is committed to promoting mental well-being through compassionate care and scientifically grounded psychiatric treatments tailored to individual needs.",
  },
  {
    id: 7,
    name: "Dr. Krishnendu Das",
    specialty: "Consultant Gynaecologist",
    qualifications: "MBBS, MS (G&O), DNB",
    experience:
      "Former Visiting Surgeon at Ramakrishna Mission Seva Pratishthan; Associated with P.G. Hospital, Sishumangal Hospital & Woodlands Hospital, Kolkata",
    schedule: "Monday, Wednesday & Friday (6:00 PM)",
    description:
      "Dr. Das brings extensive experience in women's healthcare, including pregnancy management, reproductive health, and advanced gynecological treatments.",
  },
  {
    id: 8,
    name: "Dr. Rahul Dey",
    specialty: "ENT Specialist (Otorhinolaryngologist)",
    qualifications: "MBBS (Cal), MS (ENT)",
    specialization: "Ear, Nose, Throat & Head-Neck Surgery",
    schedule: "Daily",
    description:
      "Dr. Dey provides comprehensive ENT care, including both medical and surgical management of conditions affecting the ear, nose, throat, and related structures.",
  },
  {
    id: 9,
    name: "Dr. Jagnnath Saha",
    specialty: "Consultant \u2013 General Medicine",
    qualifications: "MBBS, MD (Radiotherapy)",
    schedule: "By Appointment Only",
    description:
      "Dr. Saha offers general medical consultation and expert guidance for a wide range of health concerns, ensuring accurate diagnosis and holistic management.",
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
      // Bump DOCTOR_VERSION whenever seed data changes to force reset on all devices
      if (localStorage.getItem("rp_doctors_v") !== DOCTOR_VERSION) {
        localStorage.removeItem("rp_doctors");
        localStorage.setItem("rp_doctors_v", DOCTOR_VERSION);
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

  // NOTE: Doctors are managed locally only. Do NOT load from backend —
  // the backend may contain outdated data that would overwrite the canonical list.
  useEffect(() => {
    const loadSettings = async () => {
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
    loadSettings();
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
