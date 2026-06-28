import { Avatar, Button, cn, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@heroui/react";
import navList from "./navList";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { ISesson } from "@/types/auth";


interface TypeProps {
  activeSection: string;
}
const NavbarLayout = (props: TypeProps) => {
    const {
      activeSection
    } = props;

    const session = useSession();
    const user = session.data?.user as ISesson;

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [isScroll, setScroll] = useState(false);

    const onScroll = (posisi: number) => {
      if(posisi > 1) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    }


    
    

    

    const NavbarMenuContent = () => {
        return (
          <NavbarMenu>
            {navList.map((nav) => (
              <NavbarMenuItem key={`${nav.id}`}>
                <Link
                  className="w-full"
                  href={`${nav.href}`}
                  size="lg"
                >
                  {nav.label}
                </Link>
              </NavbarMenuItem>
            ))}
          </NavbarMenu>
        ) 
    }

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} isBordered={isScroll} position="sticky"  maxWidth="2xl" 
        onScrollPositionChange={onScroll} className={cn("z-90", {"bg-blue-500" : !isScroll})}>
          <NavbarContent>
            <NavbarBrand>
              <p className={cn("font-bold text-white", {"text-inherit" : isScroll})}>
                POS KASIRIN
              </p>
            </NavbarBrand>
          </NavbarContent>

          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            {navList.map((nav) => (
              <NavbarItem key={nav.id}>
                <Link href={`${nav.href}`} className={cn("text-white" , {"text-blue-500" : isScroll, "font-bold" : activeSection === nav.id})}>
                  {nav.label}
                </Link>
                <div className={cn("w-full h-1 rounded-2xl bg-white scale-0 transition-all duration-250", {"bg-blue-500" : isScroll, "scale-100" : activeSection === nav.id})}></div>
              </NavbarItem>
            ))}
          </NavbarContent>

          <NavbarContent justify="end">
            {session.status !== "authenticated" && !user ? (
              <>
                <NavbarItem>
                  <Button as={Link} href="/auth/login" variant="flat" className={cn("bg-white text-blue-500", {"bg-yellow-500 text-white" : isScroll})}>
                    Login
                  </Button>
                </NavbarItem>
                <NavbarItem>
                  <Button as={Link} href="/auth/register" variant="flat" className={cn("hidden sm:flex bg-white text-blue-500", {"bg-yellow-500 text-white" : isScroll,})}>
                    Sign Up
                  </Button>
                </NavbarItem> 
              </>
            ) : (
              <NavbarItem>
                <Button as={Link} href={`/${user.role}/dashboard`} variant="flat" className={cn("bg-white text-blue-500", {"bg-yellow-500 text-white" : isScroll})}>
                  Dashboard
                </Button>
              </NavbarItem>
            )}

            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className={cn("sm:hidden text-white" ,{ "text-black" : isScroll })}
            />
          </NavbarContent>
          

          {NavbarMenuContent()}
        </Navbar>


    )
}

export default NavbarLayout;