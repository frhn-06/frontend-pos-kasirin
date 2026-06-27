import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { SetStateAction } from "react";

interface TypeProps {
  setActiveSection: React.Dispatch<SetStateAction<string>>
  id: string;
}

const HeroSection = (props: TypeProps) => {
    const {
      setActiveSection,
      id
    } = props;

    return (
        <motion.section id="home" className="bg-blue-500 min-h-fit relative"
          initial={{
            opacity: 0,
            y: 50
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.6
          }}
        >
        
          <div className="max-w-6xl m-auto py-24 px-4 lg:px-0 flex flex-wrap justify-around items-center gap-10">

            <div className="min-w-full sm:min-w-120 w-1/3 lg:px-0">
              <h1 className="text-2xl lg:text-4xl text-white font-semibold">
                Manage Your Store Faster and Smarter
              </h1>
              <p className="text-white mt-3 font-light lg:text-lg">
                POS system for managing products, sales, reports, and cashiers in one dashboard.
              </p>

              <div className="mt-6 flex gap-4">
                <Button as={Link} href="/auth/register" className="bg-yellow-500 text-white font-semibold">
                  Get Started
                </Button>
                <Button as={Link} href="#preview" className="bg-yellow-500 text-white font-semibold">
                  View Demo
                </Button>
              </div>
            </div>

            <div className="min-w-full px-6 sm:px-0 sm:min-w-120 w-1/2 min-h-100">
              <div className="relative bg-amber-600 w-full">
                <div className="w-full absolute">
                  <Image src={`/landing-page/hero-cashier.png`} alt="hero-cashier" width={1080} height={1080} className="w-full" />
                </div>
                <div className="w-full absolute bg-black/30 translate-x-3 translate-y-7">
                  <Image src={`/landing-page/hero-owner.png`} alt="hero-owner" width={1080} height={1080} className="w-full opacity-0" />                  
                </div>
                <div className="w-full absolute translate-x-15 translate-y-20">
                  <Image src={`/landing-page/hero-owner.png`} alt="hero-owner" width={1080} height={1080} className="w-full" />
                </div>
              </div>
            </div>

          </div>







          <div className=" top-auto w-full min-h-[100px] bg-white">
            <div className="custom-shape-divider-top-1782353894">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill z-10" fill="oklch(62.3% 0.214 259.815)"></path>
                </svg>
            </div>
          </div>
        </motion.section>
    )
}

export default HeroSection;