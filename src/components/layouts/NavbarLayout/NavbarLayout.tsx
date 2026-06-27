import { Button, cn, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@heroui/react";
import { useState } from "react";
import navList from "./navList";
import { useRouter } from "next/router";

const NavbarLayout = () => {
    const router = useRouter();

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
                <Link href={`${nav.href}`} className={cn("text-white" , {"text-blue-500" : isScroll})}>
                  {nav.label}
                </Link>
                <div className={cn("w-full h-[2px] bg-white rounded-2xl" , {
                  "hidden" : router.pathname !== nav.href,
                  "bg-blue-500" : isScroll
                })}>

                </div>
              </NavbarItem>
            ))}
          </NavbarContent>

          <NavbarContent justify="end">
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