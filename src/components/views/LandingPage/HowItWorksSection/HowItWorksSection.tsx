import { Card, CardBody, CardHeader, Chip } from "@heroui/react";
import listHowItWork from "./listHowItWorks";
import { motion } from "motion/react";


interface TypeProps {
  id: string;
}
const HowItWorksSection = (props: TypeProps) => {
    const {
      id
    } = props;


    return (
        <section id="how" className="min-h-fit relative">
          <div className="max-w-7xl mx-auto px-4 py-24">
            
            <div className="max-w-120 mx-auto">
              <motion.h1 className="font-semibold text-blue-500 text-center text-xl lg:text-2xl"
                initial={{opacity:0, y:30}}
                whileInView={{opacity:1, y:0}}
                transition={{duration:0.6}}
                viewport={{once:true, amount:0.3}}
              >
                How It Works
              </motion.h1>
              <motion.p className="text-blue-500 text-lg font-light text-center mt-4"
                initial={{opacity:0, y:30}}
                whileInView={{opacity:1, y:0}}
                transition={{duration:0.6}}
                viewport={{once:true, amount:0.3}}
              >
                Start managing your store in just a few simple steps.
              </motion.p>
            </div>


            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {listHowItWork.map((how, i) => (
                <motion.div key={i} className="shadow-xl rounded-2xl group hover:-translate-y-1 hover:shadow-blue-400/40 transition-all duration-200"
                  initial={{opacity:0}}
                  whileInView={{opacity:1}}
                  transition={{duration:0.6, delay:i * 0.15}}
                  viewport={{once:true, amount:0.3}}
                >
                  <Card  shadow="none" className="p-4 h-full border-2 bg-white group-hover:bg-blue-50 border-blue-200">
                    <CardHeader className="gap-3 flex-row border-b-1 border-gray-400 items-start">
                      <div className="w-12 h-12 text-default-700 bg-blue-300 rounded-xl p-2 group-hover:text-blue-700 group-hover:scale-120 group-hover:rotate-12 transition-all duration-200">
                        {how.icon}
                      </div>
                      <div>
                        <span className="text-sm mr-2">
                          STEP {how.id}
                        </span>
                        <Chip size="sm" className="bg-blue-300 text-blue-800">
                          {how.key}
                        </Chip>
                        <h1 className="font-semibold text-default-700 group-hover:text-blue-700 transition-all duration-200">
                          {how.title}
                        </h1>
                      </div>
                    </CardHeader>

                    <CardBody>
                      <p className="text-default-700 group-hover:text-blue-700 transition-all duration-200">
                        {how.description}
                      </p>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
              
            </div>
          </div>
        </section> 
    )
}

export default HowItWorksSection;