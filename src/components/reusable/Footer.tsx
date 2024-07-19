"use client";

import * as Icons from "simple-icons/icons";

import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";

// Define the possible icon names
type IconName = "instagram" | "facebook" | "youtube"; // Add more as needed

// Ensure proper typing for the Icons object
interface SimpleIcon {
  title: string;
  slug: string;
  hex: string;
  source: string;
  svg: string;
  path: string;
}

const Icon = ({
  name,
  size = 24,
  color = "black",
}: {
  name: IconName;
  size?: number;
  color?: string;
}) => {
  const icon = Icons[
    `si${name.charAt(0).toUpperCase()}${name.slice(1)}` as keyof typeof Icons
  ] as SimpleIcon;

  if (!icon) {
    return null;
  }

  return (
    <svg
      role="img"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={icon.path} />
    </svg>
  );
};

const UsefulLinkItem = ({ title, href }: { title: string; href: string }) => {
  return (
    <Link
      href={href}
      className="flex items-center w-full px-2 py-3 mx-auto ml-2 text-center text-orange-400 transition-colors duration-100 cursor-pointer md:py-0 hover:text-white"
    >
      {title}
    </Link>
  );
};

const SocialLink = ({ name, href }: { name: IconName; href: string }) => {
  return (
    <Link
      href={href}
      target="_blank"
      className="h-[45px] w-[45px] relative rounded-full p-0 flex justify-center items-center bg-[#28251f] hover:bg-orange-400 aspect-square"
    >
      <Icon name={name} size={22} color="#fff" />
    </Link>
  );
};

const Footer = ({ className }: { className?: string }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <footer className={cn(className, "bg-[#0c0b09] border-t")}>
      <div className="container flex flex-col items-center justify-start gap-16 py-16 md:flex-row md:items-start md: ">
        <div className="text-center md:text-left">
          {/* <span className="font-serif text-xl uppercase">CaseStudy</span> */}
          <Image
            src={`/images/logos/white-logo-${
              isMobile ? "centered" : "left"
            }.svg`}
            alt="casestudy logo"
            width={80}
            height={50}
            className="mx-auto w-[120px] h-[50px] md:mx-0"
          ></Image>
          <p className="my-4">4802 N 16th st Phoenix Az, USA</p>
          <p>Phone: (480) 590-4270</p>
          <p>
            Email:{" "}
            <a href="mailto:william@casestudyphoenix.com?subject=CaseStudy%20Contact%20Form Message&body=">
              william@casestudyphoenix.com
            </a>
          </p>
          <div className="flex justify-center w-full gap-2 mt-8 md:justify-start">
            <SocialLink
              name="instagram"
              href="https://www.instagram.com/casestudycoffeelounge/"
            />
            <SocialLink
              name="facebook"
              href="https://www.facebook.com/profile.php?id=100087501033604"
            />
            <SocialLink
              name="youtube"
              href="https://www.youtube.com/@WilliamDouglasCo"
            />
          </div>
        </div>
        <div className="w-full px-1 py-6 border-t md:py-0 md:border-none md:w-auto">
          <h3 className="mb-2 font-serif text-lg text-center uppercase md:mb-4">
            Links
          </h3>
          <ul className="grid w-full grid-cols-2 gap-2 md:grid-cols-1">
            <UsefulLinkItem title="Home" href="/" />
            <UsefulLinkItem title="About" href="/about" />
            <UsefulLinkItem title="Menu" href="/menu" />
            <UsefulLinkItem title="Contact" href="/contact" />
            <UsefulLinkItem title="Admin" href="/admin" />
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 py-8 bg-black border-t">
        <p className="text-sm">
          Developed By{" "}
          <Link
            href="https://ayezeewebdesigns.com"
            className="text-orange-400 underline hover:no-underline"
          >
            AyeZeeWebDesigns
          </Link>
        </p>
        <p className="text-center text-gray-400 text-md">
          &copy; {new Date().getFullYear()} <strong>CaseStudyPhoenix</strong>.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
