"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { IoMenu, IoClose } from "react-icons/io5";
import ThemeToggle from "@/components/ThemeToggle";
import { useGlobalContext } from "@/providers/GlobalContextProvider"; 

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showShadow, setShowShadow] = useState(true);
  const [showBackdropBlur, setShowBackdropBlur] = useState(true);
  const pathname = usePathname();

  const { isDarkMode: isDark } = useGlobalContext();

  useEffect(() => {
    if (open) {
      setShowShadow(false);
      const blurTimer = setTimeout(() => setShowBackdropBlur(false), 200);
      return () => clearTimeout(blurTimer);
    } else {
      setShowBackdropBlur(true);
      const shadowTimer = setTimeout(() => setShowShadow(true), 200);
      return () => clearTimeout(shadowTimer);
    }
  }, [open]);

  const desktopLogo = isDark
    ? "/sites/navbar/gdg-logo-dark.svg"
    : "/sites/navbar/gdg-logo.svg";

  const mobileLogo = "/sites/navbar/mobile-logo.svg";

  return (
    <>
      <nav
        className={cn(
          "flex items-center justify-between sticky top-0 left-0 h-14 md:h-20 bg-white/0 md:border-[0.50px] md:backdrop-blur-[6px] md:border-b-[#a6a4a5]/30 overflow-hidden w-full z-100 transition-all duration-300",
          showShadow ? "shadow-shadow shadow-md md:shadow-none" : "shadow-none",
          showBackdropBlur ? "backdrop-blur-[6px]" : "backdrop-blur-none"
        )}
      >
        <div className="max-w-7xl mx-auto w-full flex px-6 md:px-8">
          <div className="flex justify-between items-center h-full w-full">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center flex-row justify-start gap-2"
              onClick={() => setOpen(false)}
            >
              {/* Mobile logo (same for both modes) */}
              <img
                src={mobileLogo}
                alt="GDG Mobile Logo"
                className="block md:hidden w-auto h-8"
              />

              {/* Desktop logo (switches by theme) */}
              <img
                src={desktopLogo}
                alt="GDG Logo"
                className="hidden md:block w-auto h-10 transition-opacity duration-300"
              />
            </Link>

            {/* Right side: links + theme toggle */}
            <div className="flex items-center gap-3 md:gap-5 lg:gap-15 text-text">
              <div className="hidden md:flex items-center gap-1.5 md:gap-5 lg:gap-15 h-full">
                {LINKS.map((link, index) => (
                  <Link
                    href={link.href}
                    key={index}
                    className={cn(
                      "text-base font-normal transition-all duration-200",
                      pathname === link.href
                        ? "text-gdg-blue dark:text-gdg-green [filter:drop-shadow(0_0_6px_rgba(174,205,253,1))] font-bold"
                        : "text-text hover:text-gdg-blue dark:hover:text-gdg-green hover:[filter:drop-shadow(0_0_6px_rgba(174,205,253,1))]"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Dark/Light Mode Toggle */}
              <ThemeToggle />

              {/* Burger menu (below md) */}
              <div
                className="flex md:hidden hover:bg-gray-200 cursor-pointer"
                onClick={() => setOpen(!open)}
              >
                <div
                  className={cn(
                    "transition-transform duration-300 ease-in-out",
                    open ? "rotate-90" : "rotate-0"
                  )}
                >
                  {open ? (
                    <IoClose className="text-3xl" />
                  ) : (
                    <IoMenu className="text-3xl" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* overlay */}
      <div
        className={cn(
          "fixed top-0 left-0 transition-all duration-200 w-[100vw] h-[100vh] md:hidden z-[49]",
          open ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={() => setOpen(!open)}
      />

      {/* dropdown */}
      <div
        className={cn(
          open ? "translate-y-0" : "translate-y-[-150%]",
          "w-full fixed top-0 left-0 transition duration-500 ease-in-out z-50 md:hidden"
        )}
      >
        <div className="py-6 bg-surface/75 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] backdrop-blur-[6px] flex flex-col justify-start items-start gap-6 pt-20">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(!open)}
              className={cn(
                "w-full text-center text-xl font-bold leading-[30px] tracking-wide",
                pathname === link.href ? "text-gdg-blue" : "text-text"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

const LINKS = [
  { name: "About", href: "/about" },
  { name: "FAQs", href: "/faqs" },
  { name: "Contact", href: "/contacts" },
  { name: "Coming Soon", href: "/comingsoon" },
];
