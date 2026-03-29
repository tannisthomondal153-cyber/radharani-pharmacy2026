import DoctorsSection from "../components/DoctorsSection";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import MapSection from "../components/MapSection";
import MedicineForm from "../components/MedicineForm";
import PaymentsBlock from "../components/PaymentsBlock";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <DoctorsSection />
      <PaymentsBlock />
      <MapSection />
      <MedicineForm />
      <Footer />
    </main>
  );
}
