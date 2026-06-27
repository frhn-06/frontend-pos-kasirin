import listFooter from "./listFooter";
import Link from "next/link";
import { motion } from "motion/react";

const FooterLayout = () => {
    return (
        <motion.section className="min-h-36 bg-blue-800"
          initial={{opacity:0, y:30}}
          whileInView={{opacity:1, y:0}}
          transition={{duration:0.6}}
          viewport={{once:true, amount:0.3}}
        >
          <div className="py-6 flex flex-col gap-6">
            <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 border-b-1 border-b-gray-300">
              <div>
                <div className="w-1/2 min-h-16 bg-gray-400 mb-3">
                  <div className="w-full h-full border-4 border-default-800 flex justify-center items-center text-default-800">
                    <h1 className="text-2xl">
                      POS KASIRIN
                    </h1>
                  </div>
                </div>
                <p className="text-white">
                  A modern point-of-sale application that helps small businesses manage products, sales, cashiers, and reports efficiently.
                </p>
              </div>

              <div>
                <h1 className="text-lg font-semibold text-white mb-3">
                  Quick Links
                </h1>
                <div className="flex flex-col gap-1">
                  {listFooter.quickLinks.map((f, i) => (
                    <Link href={`${f.link}`} key={i} className="w-fit text-white hover:text-default-300 active:text-default-300">
                      {f.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h1 className="text-lg font-semibold text-white mb-3">
                  Resources
                </h1>
                <div className="flex flex-col gap-1">
                  {listFooter.resources.map((r, i) => (
                    <Link href={`${r.link}`} key={i} className="w-fit text-white flex gap-3 items-center hover:text-default-300 active:text-default-300">
                      <div className="w-5 h-5">
                        {r.icon}
                      </div>
                      <span>
                        {r.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <p className="text-white text-sm">
                &copy; 2026 | Farhan munif
              </p>
            </div>
          </div>
          <div>

          </div>
        </motion.section>
    )
}

export default FooterLayout;