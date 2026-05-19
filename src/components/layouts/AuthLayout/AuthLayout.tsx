import PageHead from "@/components/commons/PageHead";
import Link from "next/link";


interface TypeProps {
	title: string;
	children: React.ReactNode;
}
const AuthLayout = (props: TypeProps) => {
		const {
			title,
			children
		} = props;


    return (
				<>
					<PageHead title={title} />

					<main>
						<div className=" w-full min-h-screen flex flex-col lg:flex-row">
              <div className="flex-1 min-h-screen bg-amber-800">

              </div>

              <div className=" lg:min-w-120 lg:min-h-screen">
                
                <div className="px-4 py-12 flex justify-center items-center h-full">
                  <div className=" w-full max-w-90">
                    {children}          
                  </div>
                </div>
              </div>
						</div>

						<div className="fixed bottom-4 right-4">
							<Link href="/">
								home
							</Link>
						</div>
					</main>
				</>
    )
}


export default AuthLayout;