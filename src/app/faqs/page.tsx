"use client";

import { FaPlus } from "react-icons/fa6";
import Grid from "@/components/GridBackground";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useGlobalContext } from "@/providers/GlobalContextProvider";
import GlowBlobs from "@/components/GlowBlobs";
import { FaMinus } from "react-icons/fa";
import Image from "next/image";

const FAQsPage = () => {
  return (
    <div className="min-h-screen ">
      <Grid />
      <div className="hidden lg:block">
        <GlowBlobs layout="about" />
      </div>
      {/* content container */}
      <div className="w-full flex flex-col px-8 z-10 relative">
        {/* heading part */}
        <div className="flex flex-row justify-center items-center w-full mx-auto  relative max-w-lg py-8 group">
          {/* sparky image */}
          <div className="w-[30%] xs:w-[20%] md:w-[30%] lg:w-[40%] group-hover:rotate-3 transition-all duration-200 max-w-50 aspect-auto ">
            <Image
              src="/sites/faqs/SittingSparky.webp"
              alt="sparky "
              width={624}
              height={856}
            />
          </div>

          <div className="flex flex-col gap-2">
            <h1
              className={cn(
                "text-6xl 2xs:text-7xl xs:text-8xl md:text-9xl font-bold leading-none",
                // gradient text
                "bg-gradient-to-br from-gdg-green-light to-gdg-green-dark bg-clip-text text-transparent",
                // glow effect using drop-shadow
                "drop-shadow-[0_0_5px_var(--color-gdg-green-light)]",
                "group-hover:tracking-wide transition-all duration-200"
              )}
            >
              FAQs
            </h1>

            <p className="ml-4 sm:ml-8 md:ml-12 text-sm sm:text-lg md:text-xl ">
              Frequently Asked Questions
            </p>
          </div>
        </div>

        {/* question rows */}
        <div className="flex flex-col gap-8 mx-auto max-w-5xl w-full">
          {QUESTIONS.map((question, index) => (
            <QuestionRow key={index} question={question}></QuestionRow>
          ))}
        </div>
      </div>
    </div>
  );
};

export type Question = {
  question: string;
  answer: string;
};

export const QuestionRow = ({ question }: { question: Question }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { isDarkMode } = useGlobalContext();

  return (
    <div
      className={cn(
        "w-full flex flex-col p-4 rounded-2xl  shadow-[inset_0_-6px_6px_rgba(0,0,0,1)] py-6 gap-4 group   transition-all duration-150",
        !isDarkMode &&
          (isOpen
            ? "bg-gradient-to-b  from-surface-low  to-[#63b1ff]"
            : "bg-gradient-to-b from-surface to-background-variant"),
        isDarkMode &&
          (isOpen
            ? "bg-gradient-to-b  from-surface  to-[#0D3772] hover:inset-shadow-sm  inset-shadow-white/20"
            : "bg-gradient-to-b from-surface to-background-variant"),
        isDarkMode && "shadow-[0px_0px_5px_1px_rgba(255,255,255,0.5)]",
        !isDarkMode && "shadow-shadow shadow-lg "
      )}
    >
      {/* head part */}
      <div
        className="flex flex-row items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* question */}
        <div
          className={cn(
            "flex-1 font-bold w-full",
            "transition-all, duration-150",
            !isOpen && " group-hover:text-gdg-blue-light"
          )}
        >
          {question.question}
        </div>
        <div
          className={cn(
            "ml-4 text-gdg-blue transition-all duration-200 group-hover:scale-130",
            isOpen ? "rotate-0" : "rotate-180"
          )}
        >
          {isOpen ? <FaMinus className="text-[0.8em]" /> : <FaPlus />}
        </div>
      </div>

      {/* answer part */}
      {isOpen && <div className="">{question.answer}</div>}
    </div>
  );
};

const QUESTIONS: Question[] = [
  {
    question: "What is the GDG PUP Digital ID Platform?",
    answer:
      "The GDG PUP Digital ID Platform is a system that provides members with secure, branded digital IDs featuring scannable QR codes for event tracking. It strengthens community identity and lays the foundation for future features like gamification and NFC integration.",
  },
  {
    question: "How do I get my digital ID?",
    answer:
      "You can get your digital ID by entering your registered email on the platform. Once your profile is found, your digital ID will be displayed, and you can download it as a PNG and PDF file.",
  },
  {
    question: "What information appears on the Digital ID?",
    answer:
      "The Digital ID displays your name, GDG PUP ID number, college and program, and a scannable QR code linked to your profile.",
  },
  {
    question: "Can I download my Digital ID?",
    answer:
      "Yes, you can easily download your Digital ID as a PNG and PDF file directly from the platform after viewing it.",
  },
  {
    question: "Will more features be added in the future?",
    answer:
      "Yes! Future updates will include event tracking, points and leaderboards, and NFC-enabled physical cards for an enhanced experience.",
  },
  {
    question: "What should I do if I encounter problems using the site?",
    answer:
      "If you encounter any issues, please contact the GDG PUP admin team for support or report the problem through the platform’s help/contact section.",
  },
];

export default FAQsPage;
