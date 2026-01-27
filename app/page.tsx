import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import CapabilitiesBento from "./components/CapabilitiesBento";
import FeaturedProjects from "./components/FeaturedProjects";
import ContactSection from "./components/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <CapabilitiesBento />
      <FeaturedProjects />
      <ContactSection />
    </>
  );
}
