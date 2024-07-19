"use client";

import { NavButton, NavLink } from "@/components/navbar/navUtils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import CartButton from "@/components/navbar/CartButton";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Oswald } from "next/font/google";
import TopBar from "@/components/navbar/TopBar";
import UserButton from "@/components/navbar/UserButton";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const oswald = Oswald({ subsets: ["latin"] });

const Navbar = () => {
  const { data: session } = useSession();
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 0) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const slideInVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i = 0) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: i * 0.2,
      },
    }),
  };

  return (
    <>
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-transform duration-200",
          isHidden ? "-translate-y-[40px]" : "translate-y-0"
        )}
      >
        <TopBar />
      </div>
      <div
        className={cn(
          "fixed top-[40px] left-0 right-0 z-40 py-4 px-0 backdrop-blur-lg bg-black/80 h-[60px] transition-transform duration-200",
          isHidden ? "-translate-y-[40px]" : "translate-y-0"
        )}
      >
        <div className="container mx-auto flex items-center justify-between h-full">
          <Link href="/">
            <h1 className={cn("text-xl tracking-wide", oswald.className)}>
              Case Study Coffee Lounge
            </h1>
          </Link>
          <div className="flex md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="relative ml-4 aspect-square">
                  <Menu className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="p-8 min-w-[350px] w-full max-w-[70vw] h-full"
                autoFocus={false}
              >
                <nav className="flex flex-col justify-between h-full">
                  <div className="flex flex-col gap-4 mt-16 space-y-4">
                    <motion.div
                      variants={slideInVariants}
                      initial="hidden"
                      animate="visible"
                      custom={0}
                    >
                      <NavLink href="/">Home</NavLink>
                    </motion.div>
                    <motion.div
                      variants={slideInVariants}
                      initial="hidden"
                      animate="visible"
                      custom={1}
                    >
                      <NavLink href="/beans">Beans</NavLink>
                    </motion.div>
                    <motion.div
                      variants={slideInVariants}
                      initial="hidden"
                      animate="visible"
                      custom={2}
                    >
                      <NavLink href="/menu">Menu</NavLink>
                    </motion.div>
                    <motion.div
                      variants={slideInVariants}
                      initial="hidden"
                      animate="visible"
                      custom={3}
                    >
                      <NavLink href="/contact">Contact</NavLink>
                    </motion.div>
                  </div>
                  <div className="flex flex-col-reverse md:flex-col w-full gap-4 mt-4">
                    <CartButton />
                    {!session?.user ? (
                      <>
                        <Button
                          variant="link"
                          className={cn(
                            "text-muted-foreground uppercase tracking-widest",
                            oswald.className
                          )}
                          onClick={(e) => signIn("google")}
                        >
                          <div className="mt-1">Log in</div>
                        </Button>
                        <NavButton
                          href="/contact"
                          text="Contact"
                          style="stone"
                        />
                        <NavButton
                          href="/sign-up"
                          text="Sign Up"
                          style="orange"
                        />
                      </>
                    ) : (
                      <>
                        <NavButton
                          href="/contact"
                          text="Contact"
                          style="ghost"
                        />
                        <UserButton />
                      </>
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
          <div className="hidden md:flex ml-4 mr-auto">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/beans">Beans</NavLink>
            <NavLink href="/menu">Menu</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </div>
          <div className="hidden md:flex items-center gap-2">
            {!session?.user ? (
              <>
                <Button
                  variant="link"
                  className={cn(
                    "text-muted-foreground uppercase tracking-widest",
                    oswald.className
                  )}
                  onClick={(e) => signIn("google")}
                >
                  <div className="mt-1">Log in</div>
                </Button>
                <NavButton href="/contact" text="Contact" style="stone" />
                <NavButton href="/sign-up" text="Sign Up" style="orange" />
              </>
            ) : (
              <>
                <NavButton href="/contact" text="Contact" style="ghost" />
                <UserButton />
              </>
            )}

            <CartButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
