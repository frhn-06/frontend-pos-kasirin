import { Card, CardBody, CardHeader } from "@heroui/react";
import listFieatures from "./lisFeatures";
import { motion } from "motion/react";


const FeaturesSection = () => {
    return (
        <section id="features" className="bg-white min-h-fit relative">
          <div className="max-w-7xl mx-auto px-4 lg:px-0 py-24">
            <div className="max-w-120 mx-auto">
              <motion.h1 className="font-semibold text-blue-500 text-center text-xl lg:text-2xl"
                initial={{opacity:0, y:30}}
                whileInView={{opacity:1, y:0}}
                transition={{duration:0.6}}
                viewport={{once:true, amount:0.3}}
              >
                Everything You Need A complete POS solution for your business
              </motion.h1>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {listFieatures.map((f, i) => (
                <motion.div key={i} className="shadow-xl rounded-2xl group hover:-translate-y-1 hover:shadow-blue-400/40 transition-all duration-200"
                  initial={{opacity:0}}
                  whileInView={{opacity:1}}
                  transition={{duration:0.6, delay:i * 0.15}}
                  viewport={{once:true, amount:0.3}}
                >
                  <Card  shadow="none" className="p-4 h-full border-2 bg-white group-hover:bg-blue-50 border-blue-200">
                    <CardHeader className="gap-2 flex-col border-b-1 border-gray-400 items-start">
                      <div className="w-12 h-12 text-default-700 group-hover:text-blue-700 group-hover:scale-120 group-hover:rotate-12 transition-all duration-200">
                        {f.icon}
                      </div>
                      <h1 className="font-semibold text-default-700 group-hover:text-blue-700 transition-all duration-200">
                        {f.title}
                      </h1>
                    </CardHeader>

                    <CardBody>
                      <p className="text-default-700 group-hover:text-blue-700 transition-all duration-200">
                        {f.description}
                      </p>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
              
            </div>
          </div>







          <div className="custom-shape-divider-top-1782439610 rotate-180">
              <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                  <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill" fill="oklch(42.4% 0.199 265.638)"></path>
              </svg>
          </div>
        </section>
    )
}

export default FeaturesSection;