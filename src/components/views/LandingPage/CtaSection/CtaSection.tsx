import { Button, Card, CardBody, CardHeader } from "@heroui/react";
import Link from "next/link";
import { motion } from "motion/react";

const CtaSection = () => {

  
    return (
        <section className="bg-white min-h-fit relative">
          <div className="max-w-6xl mx-auto px-4 lg:px-0 py-24">
            <motion.div
              initial={{scale:0, y:30}}
              whileInView={{scale:1, y:0}}
              transition={{duration:0.6}}
              viewport={{once:true, amount:0.3}}
            >
              <Card className="p-6 bg-blue-500">
                <CardHeader className="justify-center">
                  <h1 className="font-semibold text-white text-center text-xl lg:text-2xl">
                    Ready to Get Started?
                  </h1>
                </CardHeader>
                <CardBody className="items-center gap-4">
                  <p className="text-white">
                    Start managing products, sales, cashiers, and reports with one modern POS platform today.
                  </p>

                  <div className="flex">
                    <Button as={Link} href="/auth/register" className="bg-yellow-500 text-white">
                      Get Started
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          </div>
        </section>
    )
}

export default CtaSection;