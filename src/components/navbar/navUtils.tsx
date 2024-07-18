"use client";

import { ButtonVariant, buttonVariants } from "@/components/ui/button";

import Link from "next/link";
import { Oswald } from "next/font/google";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePathname } from "next/navigation";

const oswald = Oswald({ subsets: ["latin"] });

export interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const NavLink = ({ href, children, className }: NavLinkProps) => {
  const currentPath = usePathname();

  return (
    <Link
      className={cn(
        buttonVariants({
          variant: "link",
        }),
        href && currentPath === href && "text-orange-400",
        oswald.className,
        className,
        "uppercase tracking-widest text-2xl md:text-sm"
      )}
      href={href}
    >
      <div className="mt-1">{children}</div>
    </Link>
  );
};

export interface NavButtonProps {
  text: string;
  href: string;
  style: ButtonVariant;
}

export const NavButton = ({ text, href, style }: NavButtonProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Link
      href={href}
      className={buttonVariants({
        variant: style,
        size: isMobile ? "lg" : "xs",
        className: cn(
          "uppercase tracking-widest font-normal",
          oswald.className
        ),
      })}
    >
      {text}
    </Link>
  );
};
