"use client";

import Grid from "@/components/GridBackground";
import SearchForm from "@/components/SearchForm";
import { TypeAnimation } from "react-type-animation";
import GlowBlobs from "@/components/GlowBlobs";

export default function Home() {
  return (
    <>
      <div className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden">
        {/* grid background */}
        <div className="absolute inset-0">
          <Grid />
        </div>

        {/* glow blobs layer — hidden on mobile */}
        <div className="hidden md:block absolute inset-0">
          <GlowBlobs layout="home" />
        </div>

        <div className="w-[62.87px] h-[62.87px] relative rounded-[37.65px] mt-6 md:my-10 lg:hidden">
          <div className="w-[62.87px] h-[62.87px] absolute left-0 top-0 bg-[#f0f0f3] rounded-[36px] shadow-[0.9908041656px_0.9908041656px_1.9816083312px_0px_rgba(174,174,192,0.40),_-0.6605361254px_-0.6605361254px_4.0953236818px_0px_rgba(255,255,255,1)]" />
          <div className="w-[57.62px] h-[57.62px] absolute left-[2.63px] top-[2.63px] bg-[#eeeeee] rounded-[32.36px] shadow-[inset_0.9908041656px_0.9908041656px_0.6605361254px_0px_rgba(174,174,192,0.20),_inset_-0.6605361254px_-0.6605361254px_0.6605361254px_0px_rgba(255,255,255,0.70)]" />
          <img
            src="/sites/landing/stickerBrackets.gif"
            alt="stickerBrackets"
            className="w-18 aspect-auto absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
          />
        </div>

        {/* content container */}
        <div className=" relative flex flex-col my-4 px-4 max-w-7xl mx-auto w-full ">
          {/* heading  */}
          <div className="w-full font-bold flex justify-center lg:mb-5 min-h-[60px] max-w-[400px] sm:max-w-[400px] sm:min-h-[80px] md:max-w-[600px] lg:max-w-[900px] md:min-h-[120px] lg:min-h-[142px] mx-auto lg:mt-20">
            <TypeAnimation
              sequence={[
                "B",
                100,
                "Bridging the gap between theory and practice.",
                1000,
              ]}
              wrapper="span"
              preRenderFirstString={true}
              cursor={true}
              speed={1}
              repeat={Infinity}
              className="blue-cursor text-center text-[25px] md:text-[45px] lg:text-[69px] font-bold leading-[29px] sm:leading-[38px] md:leading-[52px] lg:leading-[64px] xl:leading-[70.76px] tracking-wide [text-shadow:_0px_4px_15px_rgb(0_0_0_/_0.35)] dark:[text-shadow:_0px_4px_15px_rgb(255_255_255_/_0.35)]"
            />
          </div>

          {/* subheading/description */}
          <div className="w-full text-center my-4 text-[14px] sm:text-[16px] md:text-[17px] lg:text-xl text-zinc-400 dark:text-zinc-400 leading-tight">
            <div className="flex flex-col md:max-w-2xl gap-1 mx-auto px-4">
             <div className="inline-block leading-snug">
                GDG PUP helps student developers grow through real projects,
                events, and mentorship connecting classroom learning to industry practice.
              </div>
            </div>
          </div>

          {/* Search Form */}
          <SearchForm />

          {/* sparky image */}
          <img
            src="/sites/landing/SparkyPose.svg"
            alt="sparky"
            className="mx-auto aspect-auto mt-4 mb-[100px] z-20"
          />
        </div>
      </div>
    </>
  );
}
