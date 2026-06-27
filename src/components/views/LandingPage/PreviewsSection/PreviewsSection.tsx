import Image from "next/image";
import { FaCheckSquare } from "react-icons/fa";
import { motion } from "motion/react";

const PreviewsSection = () => {
    return (
        <section id="preview" className="bg-blue-800 min-h-fit relative">
          <div className="max-w-7xl mx-auto px-4 py-24">

            <div className="max-w-120 mx-auto">
              <motion.h1 className="font-semibold text-white text-center text-xl lg:text-2xl"
                initial={{opacity:0, y:30}}
                whileInView={{opacity:1, y:0}}
                transition={{duration:0.6}}
                viewport={{once:true, amount:0.3}}
              >
                Powerful Dashboard Insights
              </motion.h1>
              <motion.p className="text-lg text-default-100 font-extralight text-center mt-4"
                initial={{opacity:0, y:30}}
                whileInView={{opacity:1, y:0}}
                transition={{duration:0.6}}
                viewport={{once:true, amount:0.3}}
              >
                Monitor your business with real-time analytics, sales trends, and operational reports.
              </motion.p>
            </div>


            <div className="mt-12 flex flex-col gap-10">
              <div className="flex flex-wrap gap-6">
                <motion.div className="w-full sm:w-1/2 sm:min-w-lg group"
                  initial={{opacity:0, x:-30}}
                  whileInView={{opacity:1, x:0}}
                  transition={{duration:0.6}}
                  viewport={{once:true, amount:0.3}}
                >
                  <Image src={`/landing-page/hero-owner.png`} alt="foto-previews" width={1080} height={1080} className="w-full group-hover:scale-104 group-hover:translate-x-10 group-hover:-translate-y-2 group-hover:shadow-xl shadow-blue-600/50 group-hover:border-1 border-blue-500 transition-all duration-200" />
                </motion.div>

                <motion.div className="flex-1 min-w-xs"
                  initial={{opacity:0, x:30}}
                  whileInView={{opacity:1, x:0}}
                  transition={{duration:0.6}}
                  viewport={{once:true, amount:0.3}}
                >
                  <h3 className="text-white font-semibold text-lg lg:text-xl">
                    Powerful Insights for Store Owners
                  </h3>
                  <p className="text-white font-light text-sm lg:text-base">
                    Stay in control of your business with a comprehensive dashboard that provides sales analytics, revenue tracking, and product performance. Everything you need to monitor your store is available in one place.
                  </p>
                  <ul className="mt-2 text-white font-light text-sm lg:text-base">
                    <li className="flex items-center gap-2">
                      <FaCheckSquare className="w-4 h-4 text-green-500 bg-white rounded"/>
                      Sales and revenue overview
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCheckSquare className="w-4 h-4 text-green-500 bg-white rounded"/>
                      Daily sales trend visualization
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCheckSquare className="w-4 h-4 text-green-500 bg-white rounded"/>
                      Top-selling products
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCheckSquare className="w-4 h-4 text-green-500 bg-white rounded"/>
                      Recent transaction history
                    </li>
                  </ul>
                </motion.div>
              </div>

              <div className="flex flex-wrap gap-6 flex-row-reverse">
                <motion.div className="w-full sm:w-1/2 sm:min-w-lg group"
                  initial={{opacity:0, x:30}}
                  whileInView={{opacity:1, x:0}}
                  transition={{duration:0.6}}
                  viewport={{once:true, amount:0.3}}
                >
                  <Image src={`/landing-page/hero-cashier.png`} alt="foto-previews" width={1080} height={1080} className="w-full group-hover:scale-104 group-hover:-translate-x-10 group-hover:-translate-y-2 group-hover:shadow-xl shadow-blue-600/50 group-hover:border-1 border-blue-500 transition-all duration-200" />
                </motion.div>

                <motion.div className="flex-1 min-w-xs"
                  initial={{opacity:0, x:-30}}
                  whileInView={{opacity:1, x:0}}
                  transition={{duration:0.6}}
                  viewport={{once:true, amount:0.3}}
                >
                  <h3 className="text-white font-semibold text-lg lg:text-xl">
                    Designed for Fast and Efficient Checkout
                  </h3>
                  <p className="text-white font-light text-sm lg:text-base">
                    Help cashiers process orders quickly with a clean and intuitive interface. Every transaction is organized automatically, making daily operations faster and more efficient.
                  </p>
                  <ul className="mt-2 text-white font-light text-sm lg:text-base">
                    <li className="flex items-center gap-2">
                      <FaCheckSquare className="w-4 h-4 text-green-500 bg-white rounded"/>
                      Quick order creation
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCheckSquare className="w-4 h-4 text-green-500 bg-white rounded"/>
                      Payment summary
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCheckSquare className="w-4 h-4 text-green-500 bg-white rounded"/>
                      Recent orders
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCheckSquare className="w-4 h-4 text-green-500 bg-white rounded"/>
                      Simple and user-friendly interface
                    </li>
                  </ul>
                </motion.div>
              </div>
            </div>


          </div>








          <div className="custom-shape-divider-top-1782458876 rotate-180">
              <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                  <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" fill="#fff" className="shape-fill"></path>
              </svg>
          </div>
                    
        </section>
    )
}

export default PreviewsSection;