"use client";

import Button from "@/components/Button";
import { useGlobalContext } from "@/providers/GlobalContextProvider";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Footer = () => {
  const { isDarkMode } = useGlobalContext();
  const router = useRouter();

  return (
    <footer
      className="relative overflow-hidden py-6 px-4 mt-8"
      style={{
        background: `
          linear-gradient(
            to bottom,
            rgba(var(--color-background-rgb), 0) 0%,
            var(--color-background-variant) 100%
          )
        `,
      }}
    >
      <div className="w-full max-w-7xl mx-auto overflow-x-hidden px-0 relative">
        <Image
          src="/sites/contacts/border.png"
          alt="Footer border"
          width={1920}
          height={100}
          className="w-full h-auto object-contain block"
          priority
        />
      </div>

      {/* footer content */}
      <div
        className="
          w-full max-w-6xl mx-auto 
          flex flex-col lg:flex-row 
          items-center lg:items-center  
          justify-center lg:justify-between 
          mt-10 gap-6 sm:gap-8 md:gap-10 pb-6 
          text-center lg:text-left
        "
      >
        {/* logo */}
        <div
          className="flex items-center justify-center lg:justify-start w-full lg:w-auto cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image
            src={
              isDarkMode
                ? "/sites/footer/gdgnewnewlogo.png"
                : "/sites/footer/gdgnewlogo.png"
            }
            alt="GDG Footer Logo"
            width={150}
            height={40}
            className="h-6 w-auto object-contain"
            priority
          />
        </div>

        {/* footer links */}
        <div
          className="
            flex-1
            flex-col sm:flex-row
            flex flex-wrap sm:justify-around 
            items-center gap-2   
            text-[var(--foreground)] 
            text-sm sm:text-base font-normal 
            w-full lg:w-auto mt-4 lg:mt-0
          "
        >
          {LINKS.map((link, index) => (
            <Link
              href={link.href}
              key={index}
              className="hover:text-[var(--color-gdg-blue-light)] transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* partner button */}
        <div className="w-full lg:w-auto flex justify-center lg:justify-end mt-3 lg:mt-0">
          <Button
            variant="green"
            className="!text-white text-xs sm:text-sm px-5 py-2 sm:px-6 sm:py-2.5 hover:opacity-90 transition"
            onClick={() =>
              window.open(
                "https://docs.google.com/forms/d/e/1FAIpQLSe9KuQFnKNJ2XvN8lWX0YcTBL2e9HAmtL-e9cOtanV09ukG9g/viewform",
                "_blank",
                "noopener,noreferrer"
              )
            }
          >
            <div className="w-full h-full flex flex-row items-center justify-center">
              Partner with Us
            </div>
          </Button>
        </div>
      </div>

      {/* divider */}
      <div
        className="w-full max-w-6xl mx-auto border-t mt-6 mb-6"
        style={{ borderColor: "var(--color-text-muted)" }}
      ></div>

      {/* bottom section */}
      <div
        className="
        flex-1
          w-full max-w-6xl mx-auto 
          flex flex-col sm:flex-row 
          items-center sm:items-center justify-between 
          gap-3 pb-6 text-center sm:text-left
        "
      >
        {/* copyright */}
        <p className="text-xs sm:text-sm text-[var(--foreground)] order-1 sm:order-1">
          © 2025 GDG PUP | All Rights Reserved.
        </p>

        {/* social icons */}
        <div
          className="
            flex justify-center sm:justify-end items-center 
            gap-4 sm:gap-3 mt-3 sm:mt-0
            order-2 sm:order-2
          "
        >
          {SOCIALS.map((social, index) => (
            <a
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              key={index}
            >
              <Image
                src={social.image}
                alt="LinkedIn"
                className="h-5 w-5 object-contain hover:opacity-80 transition"
                width={0}
                height={0}
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

const LINKS = [
  {
    name: "About",
    href: "/about",
  },
  {
    name: "FAQs",
    href: "/faqs",
  },
  {
    name: "Contact",
    href: "/contacts",
  },
  {
    name: "Coming Soon",
    href: "/comingsoon",
  },
];

const SOCIALS: {
  image: string;
  link: string;
}[] = [
  {
    image: "/sites/footer/f-facebook.svg",
    link: "https://www.facebook.com/gdg.pupmnl",
  },
  {
    image: "/sites/footer/f-linkedin.svg",
    link: "https://www.linkedin.com/company/gdgpup",
  },
  {
    image: "/sites/footer/f-instagram.svg",
    link: "https://www.instagram.com/gdg.pupmnl",
  },
  {
    image: "/sites/footer/f-tiktok.svg",
    link: "https://www.tiktok.com/@gdg.pupmnl",
  },
  {
    image: "/sites/footer/f-github.svg",
    link: "https://github.com/gdgpupmnl",
  },
];
