"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { formatPhoneNumber, isAdmin, isAdminOrUp, isDev } from "@/lib/utils";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { BusinessInfo } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const TopBarItems = [
  {
    icon: Phone,
    content: () => (
      <a
        href={`tel:${BusinessInfo.phoneRaw}`}
        className="flex items-center gap-2 underline hover:text-orange-400"
      >
        {BusinessInfo.phone}
      </a>
    ),
    text: BusinessInfo.phone,
  },
  {
    icon: Mail,
    content: () => (
      <a
        href={`mailto:${BusinessInfo.email}`}
        className="flex items-center gap-2 underline hover:text-orange-400"
      >
        {BusinessInfo.email}
      </a>
    ),
    text: BusinessInfo.email,
  },
  {
    icon: MapPin,
    content: () => (
      <p className="flex items-center gap-2">{BusinessInfo.address}</p>
    ),
    text: BusinessInfo.address,
  },
];

const TopBar = () => {
  const { data: session } = useSession();
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const topBarItemsDuration = 5000;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || isHovered) return;

    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % TopBarItems.length);
    }, topBarItemsDuration);

    return () => clearInterval(interval);
  }, [mounted, isHovered]);

  const CurrentIcon = TopBarItems[index].icon;

  return (
    <div className="bg-[#0c0b09] h-[40px] backdrop-blur-lg w-full">
      <div className="container mx-auto flex justify-between h-full py-2 text-sm">
        <div className="flex items-center h-full gap-4 overflow-hidden">
          <AnimatePresence mode="wait">
            {mounted && (
              <motion.div
                key={TopBarItems[index].text}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  duration: 0.3,
                }}
                className="flex items-center gap-2"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <CurrentIcon className="w-4 h-4 text-orange-400" />
                {TopBarItems[index].content()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center py-1 text-right">
          {session?.user && (
            <>
              {isAdminOrUp(session.user.role) && (
                <Link href="/admin" className="px-2 hover:text-orange-400">
                  Admin
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
