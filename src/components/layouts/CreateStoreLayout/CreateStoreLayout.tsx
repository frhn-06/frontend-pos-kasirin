import PageHead from "@/components/commons/PageHead"
import { Button } from "@heroui/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRef } from "react";
import { FaAngleDoubleDown } from "react-icons/fa";

interface TypeProps {
  children : React.ReactNode;
  title: string;
}

const CreateStoreLayout = (props: TypeProps) => {
    const {
      title,
      children
    } = props;

    const down = useRef<HTMLDivElement>(null);
    
    const onDown = () => {
      down.current?.scrollIntoView({
        behavior: "smooth",
        block: "end"
      })
    }

    return (
        <>
          <PageHead title={title} />

          <main>
						<div className=" w-full min-h-screen flex flex-col lg:flex-row-reverse">

              <div className="flex-1 min-h-screen flex justify-center items-center">
                <div className=" w-1/3">
                  <div className="w-full">
                    <Image src={`/auth/auth.png`} alt={`foto-${title}`} width={1080} height={1080} className="w-full" />
                  </div>
                  <h1 className="text-blue-500 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-4 mb-8 text-center">
                    Create Store
                  </h1>
                  <div className="lg:hidden w-18 mx-auto">
                    <FaAngleDoubleDown className="w-full h-full Animee-buttonDownAuth" onClick={onDown} />
                  </div>
                </div>
              </div>

              <div className=" lg:min-w-120 lg:min-h-screen bg-blue-500 rounded-t-2xl lg:rounded-tl-none lg:rounded-r-2xl">
                <div className="px-4 py-12 flex justify-center items-center h-full">
                  <div className=" w-full max-w-90">
                    {children}          
                  </div>
                </div>
              </div>

              <div ref={down}></div>
						
            </div>

						<div className="fixed bottom-4 right-4">
							<Button onPress={() => signOut()} className="bg-yellow-500 text-white">
                keluar
              </Button>
						</div>
					</main>
        </>
    )
}


export default CreateStoreLayout;