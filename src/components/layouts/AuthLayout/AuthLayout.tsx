import PageHead from "@/components/commons/PageHead";
import Link from "next/link";
import Image from 'next/image';
import { FaAngleDoubleDown } from "react-icons/fa";
import { useRef } from "react";


interface TypeProps {
	title: string;
	children: React.ReactNode;
  authTitle: string;
}
const AuthLayout = (props: TypeProps) => {
		const {
			title,
			children,
      authTitle
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
						<div className=" w-full min-h-screen flex flex-col lg:flex-row">
							<div className="flex-1 min-h-screen flex justify-center items-center">
								<div className=" w-1/3">
                  <div className="w-full">
                    <Image src={`/auth/auth.png`} alt={`foto-${title}`} width={1080} height={1080} className="w-full" />
                  </div>
									<h1 className="text-blue-500 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-4 mb-8 text-center">
                    {authTitle}
                  </h1>
                  <div className="lg:hidden w-18 mx-auto">
                    <FaAngleDoubleDown className="w-full h-full Animee-buttonDownAuth" onClick={onDown} />
                  </div>
								</div>
							</div>

							<div className=" lg:min-w-140 lg:min-h-screen px-4 py-12 flex justify-center items-center h-full rounded-t-2xl lg:rounded-tr-none lg:rounded-l-2xl bg-blue-500">
								<div className=" w-full max-w-90">
									{children}          
								</div>

							</div>

              <div ref={down}></div>
						</div>

						<div className="fixed bottom-4 right-4">
							<Link href="/" className="bg-yellow-500 text-white py-1 px-2 rounded-xl hover:bg-yellow-600 active:bg-yellow-600 active:scale-0 transition-all duration-100">
								home
							</Link>
						</div>
					</main>
				</>
    )
}


export default AuthLayout;