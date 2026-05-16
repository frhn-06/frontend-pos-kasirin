import Toaster from "@/components/ui/Toaster";
import { toasterContext } from "@/context/toasterContext";
import { Inter } from "next/font/google";
import { useContext, useEffect } from "react";



const inter = Inter({
  subsets: ['latin'],
})



interface TypeProps {
    children: React.ReactNode;
}


const AppShell = (props: TypeProps) => {
    const {
        children
    } = props

    const {toaster, setToaster} = useContext(toasterContext);


    useEffect(() => {
      const timeOut = setTimeout(() => {
        setToaster({
          type: "",
          message: ""
        })
      }, 800);

      return () => clearTimeout(timeOut);
    })



    return (
        <main className={inter.className}>
          <div className="relative">
            {children}


            {toaster.type !== "" && (
              <Toaster type={toaster.type} message={toaster.message} />
            )}
          </div>
        </main>
    )
}


export default AppShell;