import PageHead from "@/components/commons/PageHead"
import { Button } from "@heroui/react";
import { signOut } from "next-auth/react";

interface TypeProps {
  children : React.ReactNode;
  title: string;
}

const CreateStoreLayout = (props: TypeProps) => {
    const {
      title,
      children
    } = props;

    return (
        <>
          <PageHead title={title} />

          <main>
						<div className=" w-full min-h-screen flex flex-col-reverse lg:flex-row-reverse">
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
							<Button onPress={() => signOut()}>
                keluar
              </Button>
						</div>
					</main>
        </>
    )
}


export default CreateStoreLayout;