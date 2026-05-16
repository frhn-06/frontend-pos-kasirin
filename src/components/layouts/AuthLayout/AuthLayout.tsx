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
                {children}
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