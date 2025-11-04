"use client";

import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { BsStars } from "react-icons/bs";
import Grid from "@/components/GridBackground";
import GlowBlobs from "@/components/GlowBlobs";
import { cn } from "@/lib/utils";
import { useGlobalContext } from "@/providers/GlobalContextProvider";
import Link from "next/link";
import { useState } from "react";

const AboutPage = () => {
  const router = useRouter();
  const handleCta = () => router.push("/");

  const { isDarkMode } = useGlobalContext();

  return (
    <div className="relative  z-0">
      {/* background grid */}
      <Grid />

      {/* glow blobs — only show on large screens */}
      <div className="hidden lg:block">
        <GlowBlobs layout="about" />
      </div>

      {/* floating stickers — only show on large screens */}
      <div
        className="hidden lg:flex absolute left-[100px] top-[50vh] -translate-y-1/2 
        w-[105px] h-[105px] items-center justify-center rounded-full bg-white/90 
          backdrop-blur-sm 
         shadow-[0_0_20px_5px_rgba(255,255,255,0.6)] border-4 border-white/60  rotate-20 z-0"
      >
        <img
          src="/sites/about/stickerBrackets.gif"
          alt="Sticker Brackets"
          className="w-full h-full object-contain"
        />
      </div>

      <div
        className="hidden lg:flex absolute right-[100px] top-[60px]
        w-[105px] h-[105px] items-center justify-center rounded-full bg-white/90 
       shadow-[0_0_20px_5px_rgba(255,255,255,0.6)] border-4 border-white/60 backdrop-blur-sm 
          -rotate-12 z-10"
      >
        <img
          src="/sites/about/stickerBrackets.gif"
          alt="Sticker Brackets"
          className="w-full h-full object-contain"
        />
      </div>

      {/* content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-10 pt-10 pb-10 -translate-y-4 lg:-translate-y-10">
        <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-7xl gap-0 relative lg:my-24">
          {/* Mobile Layout — Titles above Image */}
          <div className="block lg:hidden text-center">
            <h1
              className={cn(
                "font-bold  text-4xl xs:text-5xl sm:text-6xl leading-none mb-1 text-gdg-blue mt-8",
                "drop-shadow-[0_0_2px_var(--color-gdg-blue)]"
              )}
            >
              Project Vision
            </h1>
            <h2 className="font-semibold text-lg sm:text-xl text-text leading-tight ">
              Digital ID Platform
            </h2>
          </div>

          {/* Left: Sparky image */}
          <div className="flex-shrink-0 w-full lg:w-1/2 flex justify-center lg:justify-end relative z-20 lg:translate-x-10">
            <img
              src="/sites/about/animatedCardStack.gif"
              alt="sparky"
              className="w-[90%] sm:w-[80%] lg:w-full max-w-[620px] aspect-auto 
              -mr-0 sm:-mr-8 lg:-mr-14 -mb-10 lg:-mb-20"
            />
          </div>

          {/* Right: text & CTA */}
          <div className="flex flex-col items-center lg:items-start w-full lg:w-1/2 text-center lg:text-left relative z-10 mt-6 lg:mt-0">
            {/* (hidden on mobile) */}
            <div className="hidden lg:block group">
              <h1
                className={cn(
                  "font-bold text-6xl leading-none mb-0 text-[#4285F4] hover:scale-x-105 transition-all duration-200 text-center",
                  "drop-shadow-[0_0_2px_var(--color-gdg-blue)]"
                )}
              >
                Project Vision
              </h1>
              <h2 className="font-semibold text-xl lg:text-2xl text-text leading-tight mt-4 mb-8 lg:translate-x-22">
                Digital ID Platform
              </h2>
            </div>

            {/* about card */}
            <div
              className={cn(
                "z-100 relative p-5 lg:p-6 rounded-2xl bg-gradient-to-b from-surface-high to-surface backdrop-blur-sm  max-w-md lg:max-w-lg mt-4 mb-3 text-base sm:text-lg lg:text-xl leading-[1.6]  text-justify tracking-[0.01em]  shadow-[0_4px_20px_rgba(0,0,0,0.08),_0_8px_30px_rgba(0,0,0,0.05)] lg:-translate-x-12 ",
                isDarkMode && "border-outline border-2"
              )}
            >
              Designed to connect, engage, and empower the community, GDG PUP’s
              flagship project for the 2026 cohort sets the stage for a smarter
              and more connected member experience.
            </div>

            {/* CTA button */}
            <div className="mt-6 lg:translate-x-22">
              <Button
                onClick={handleCta}
                className="w-fit flex items-center text-sm sm:text-base lg:text-lg px-5 py-2"
              >
                <BsStars />
                <span className="ml-2 whitespace-nowrap">
                  Get My Digital ID
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* contributors section */}
      <div className="w-full relative  z-10  max-w-7xl mx-auto px-4  mt-16 md:mt-0 ">
        {/* main header */}
        <div className="w-full flex flex-row justify-center mb-4 md:mb-8 text-center">
          <h1
            className={cn(
              "font-bold  text-4xl xs:text-5xl sm:text-6xl leading-none mb-1 text-gdg-blue ",
              "drop-shadow-[0_0_2px_var(--color-gdg-blue)]"
            )}
          >
            Project Contributors
          </h1>
        </div>

        {/* per team section */}
        <div className="flex flex-col w-full gap-16">
          {CONTRIBUTORS.map((team, index) => (
            <div
              key={`team-${index}`}
              className="flex flex-col w-full gap-2 md:gap-4"
            >
              {/* team header */}
              <div
                className={cn(
                  "font-bold  text-2xl xs:text-2xl sm:text-3xl leading-none",
                  "w-full text-center",
                  team.textColor === "blue" &&
                    "text-gdg-blue drop-shadow-[0_0_2px_var(--color-gdg-blue)]",
                  team.textColor === "orange" &&
                    "text-gdg-orange drop-shadow-[0_0_2px_var(--color-gdg-orange)]",
                  team.textColor === "green" &&
                    "text-gdg-green drop-shadow-[0_0_2px_var(--color-gdg-green)]",
                  team.textColor === "red" &&
                    "text-gdg-red drop-shadow-[0_0_2px_var(--color-gdg-red)]"
                )}
              >
                {team.group}
              </div>
              {/* team members */}
              {index === 2 && (
                <div className="  w-full  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:flex lg:flex-row lg:flex-wrap lg:justify-center lg:grid-cols-none  gap-0">
                  {team.members.map((member, index) => (
                    <div
                      key={`helloworld${index}`}
                      className=" lg:min-w-sm items-center flex justify-center"
                    >
                      <MemberCard key={index} member={member} />
                    </div>
                  ))}
                </div>
              )}

              {index !== 2 && (
                <div className="  w-full  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:flex lg:flex-row lg:justify-center lg:grid-cols-none  gap-0">
                  {team.members.map((member, index) => (
                    <MemberCard key={index} member={member} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

const MemberCard = ({ member }: { member: MemberType }) => {
  const [rotation, setRotation] = useState(0);

  const handleMouseEnter = () => {
    const randomDeg = Math.random() * 2 - 1; // random between -20° and +20°
    setRotation(randomDeg);
  };

  const handleMouseLeave = () => {
    setRotation(0); // reset when hover ends
  };

  return (
    <div
      className="w-full flex-1  max-w-none lg:max-w-xs relative hover:scale-105 transition-all duration-200 "
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {/* card template */}
      <img
        src={member.image}
        alt="contributor card"
        className="w-full h-auto object-cover"
      />

      <div className="w-full flex flex-row justify-center gap-[3.5%] absolute bottom-[18.5%] left-1/2 -translate-x-1/2 ">
        {member.fb && (
          <Link
            className=" w-[6%] aspect-square hover:scale-105 hover:drop-shadow-sm hover:drop-shadow-gdg-orange/20 transition-all duration-200 "
            href={member.fb}
            target="_blank"
          >
            <img
              src="/contributors/fb.svg"
              alt="contributor card"
              className=" w-full h-full object-cover "
            />
          </Link>
        )}
        {member.ig && (
          <Link
            className=" w-[6%] aspect-square hover:scale-105 hover:drop-shadow-sm hover:drop-shadow-gdg-orange/20 transition-all duration-200 "
            href={member.ig}
            target="_blank"
          >
            <img
              src="/contributors/ig.svg"
              alt="contributor card"
              className=" w-full h-full object-cover "
            />
          </Link>
        )}
        {member.linkedin && (
          <Link
            className=" w-[6%] aspect-square hover:scale-105 hover:drop-shadow-sm hover:drop-shadow-gdg-orange/20 transition-all duration-200 "
            href={member.linkedin}
            target="_blank"
          >
            <img
              src="/contributors/linkedin.svg"
              alt="contributor card"
              className=" w-full h-full object-cover "
            />
          </Link>
        )}
      </div>
    </div>
  );
};

type MemberType = {
  name: string;
  image: string;
  role: string;
  fb?: string;
  ig?: string;
  linkedin?: string;
};

type TeamType = {
  group: string;
  textColor: string;
  members: MemberType[];
};

const CONTRIBUTORS: TeamType[] = [
  {
    group: "UI/UX Team",
    textColor: "red",
    members: [
      {
        name: "Jedia Nicole Sagun",
        image: "/contributors/cards/jedia.png",
        role: "UI/UX Designer",
        fb: "https://www.facebook.com/jedianicole.sagun/",
        ig: "https://www.instagram.com/_jnsagun/",
        linkedin: "https://www.linkedin.com/in/jnsagun/",
      },
      {
        name: "Kassandra Rychelle Balona",
        image: "/contributors/cards/kassandra.png",
        role: "UI/UX Designer",
        fb: "https://www.facebook.com/kasrych",
        ig: "https://www.instagram.com/kasrych/",
        linkedin: "https://www.linkedin.com/in/kasrych/",
      },
      {
        name: "Joyrel Baladjay",
        image: "/contributors/cards/joyrel.png",
        role: "UI/UI Designer",
        fb: "https://www.facebook.com/joyyirel",
        ig: "https://www.instagram.com/joyyirel/",
        linkedin: "https://www.linkedin.com/in/joyrel-baladjay-421371195/",
      },
      {
        name: "Kacey Michaela Solis",
        image: "/contributors/cards/kacey.png",
        role: "UI/UI Designer",
        fb: "https://www.facebook.com/kayex13/",
        ig: "https://www.instagram.com/miikayella/",
        linkedin: "https://www.linkedin.com/in/kacey-michaela-solis-a76577312/",
      },
    ],
  },
  {
    group: "Web Development Team",
    textColor: "orange",
    members: [
      {
        name: "Erwin Daguinotas",
        image: "/contributors/cards/erwin.png",
        role: "Full Stack Developer",
        fb: "https://www.facebook.com/DaguinotasErwin",
        ig: "https://www.instagram.com/winnnwnwnwn/",
        linkedin: "https://www.linkedin.com/in/erwin-daguinotas/",
      },
      {
        name: "Rhandie Sales Jr",
        image: "/contributors/cards/rhandie.png",
        role: "Full Stack Developer",
        fb: "https://www.facebook.com/rhandie.sales.1",
        ig: "https://www.instagram.com/rhandiejrr/",
        linkedin: "https://www.linkedin.com/in/rhandie-sales/",
      },
      {
        name: "Gerald Berongoy",
        image: "/contributors/cards/gerald.png",
        role: "Full Stack Developer",
        fb: "https://www.facebook.com/gerald.berongoy0904#",
        ig: "https://www.instagram.com/g333rald",
        linkedin: "https://www.linkedin.com/in/geraldberongoy",
      },
      {
        name: "Daniella Simara",
        image: "/contributors/cards/daniella.png",
        role: "Full Stack Developer",
        fb: "https://www.facebook.com/share/1Ee1wU4gyA/",
        ig: "https://www.instagram.com/d.simara_?igsh=dzAyems5YXg5Z2Zk",
        linkedin: "www.linkedin.com/in/daniella-simara-908b8229a",
      },
    ],
  },
  {
    group: "Executive Technology Team",
    textColor: "green",
    members: [
      {
        name: "Carlos Jerico Dela Torre",
        image: "/contributors/cards/jerico.png",
        role: "Chief Technology Officer",
        fb: "https://www.facebook.com/2iLiTE/",
        ig: "https://www.instagram.com/__rikin__/",
        linkedin: "https://www.linkedin.com/in/delatorrecj/",
      },
      {
        name: "Nyzel Cayat",
        image: "/contributors/cards/nyzel.png",
        role: "Deputy Chief Technology Officer",
        fb: "https://www.facebook.com/chiaki.wme",
        ig: "https://www.instagram.com/chiaki.wme",
        linkedin: "https://www.linkedin.com/in/nyzel-cayat-665749284",
      },
      {
        name: "Aurold John Sadullo",
        image: "/contributors/cards/aj.png",
        role: "Deputy Chief Technology Officer",
        fb: "https://www.facebook.com/ajsadullo",
        ig: "https://www.instagram.com/ajsdllo/",
        linkedin: "https://www.linkedin.com/in/ajsadullo/",
      },
      {
        name: "Randy Carlo Lorenzo",
        image: "/contributors/cards/randy.png",
        role: "Chapter Lead & President",
        fb: "https://www.facebook.com/randycarlo.lorenzo",
        ig: "https://www.instagram.com/randy_lrnz/",
        linkedin: "https://www.linkedin.com/in/randycarlolorenzo/ ",
      },
      {
        name: "Shunrenn Locaylocay",
        image: "/contributors/cards/shunrenn.png",
        role: "Chief Executive Officer",
        fb: "https://www.facebook.com/shun.locs ",
        ig: "https://www.instagram.com/shun_locs/ ",
        linkedin: "https://ph.linkedin.com/in/shunrenn-locaylocay/",
      },
    ],
  },
];
