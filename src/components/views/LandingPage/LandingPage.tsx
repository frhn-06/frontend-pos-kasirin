import NavbarLayout from "@/components/layouts/NavbarLayout";
import CtaSection from "./CtaSection";
import FeaturesSection from "./FeaturesSection";
import HeroSection from "./HeroSection";
import HowItWorksSection from "./HowItWorksSection";
import PreviewsSection from "./PreviewsSection";
import FooterLayout from "@/components/layouts/FooterLayout";
import { useEffect, useState } from "react";

const LandingPage = () => {  
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setActiveSection(entry.target.id);
            }
          })

          return () => {
            observer.disconnect();
          }
      }, {
        threshold: 0.5
      });



      const sections = document.querySelectorAll("section");
      
      sections.forEach((section) => {
        observer.observe(section);
      });
    },[])
        
       

    return (
        <>
          <NavbarLayout activeSection={activeSection} />
            <main className="min-h-[3000] overflow-x-hidden">
              <HeroSection />

              <FeaturesSection />

              <PreviewsSection />

              <HowItWorksSection />

              <CtaSection />
            </main> 
          <FooterLayout />
        </>
    )
}

export default LandingPage;