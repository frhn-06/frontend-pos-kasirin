import { Inter } from "next/font/google";



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
    return (
        <main className={inter.className}>
            {children}
        </main>
    )
}


export default AppShell;