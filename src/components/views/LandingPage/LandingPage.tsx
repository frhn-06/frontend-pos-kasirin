import CtaSection from "./CtaSection";
import FeaturesSection from "./FeaturesSection";
import HeroSection from "./HeroSection";
import HowItWorksSection from "./HowItWorksSection";
import NavbarLayout from "../../layouts/NavbarLayout";
import PreviewsSection from "./PreviewsSection";
import FooterLayout from "@/components/layouts/FooterLayout";

const LandingPage = () => {
    return (
          <main className="min-h-[3000] overflow-x-hidden">
            <HeroSection />

            <FeaturesSection />

            <PreviewsSection />

            <HowItWorksSection />

            <CtaSection />
          </main> 
    )
}

export default LandingPage;