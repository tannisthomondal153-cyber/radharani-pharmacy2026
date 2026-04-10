import AppointmentSection from "../components/AppointmentSection";
import DoctorsSection from "../components/DoctorsSection";
import Footer from "../components/Footer";
import HealthCorner from "../components/HealthCorner";
import Hero from "../components/Hero";
import MapSection from "../components/MapSection";
import MedicineForm from "../components/MedicineForm";
import PaymentsBlock from "../components/PaymentsBlock";

interface HomePageProps {
  onNavigate?: (path: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <main>
      <Hero />
      <DoctorsSection />
      <AppointmentSection />
      <PaymentsBlock />
      <MapSection />
      <MedicineForm />
      <HealthCorner />
      <Footer onNavigate={onNavigate} />
    </main>
  );
}
