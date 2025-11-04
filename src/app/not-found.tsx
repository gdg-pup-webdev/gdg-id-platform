"use client";

import Grid from "@/components/GridBackground";
import GlowBlobs from "@/components/GlowBlobs";
import Image from "next/image";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

export default function ComingSoonPage () {
    const router = useRouter();

    const handleBackClick = () => {
        router.push("/");
    };

    return (
        <div className="relative flex flex-col items-center w-full pt-16 overflow-hidden min-h-screen sm:min-h-[130vh] md:min-h-[150vh]">
            {/* grid background */}
            <div className="absolute inset-0 z-0">
                <Grid />
            </div>

            {/* glow blobs layer — hidden on mobile */}
            <div className="hidden sm:block absolute inset-0 -z-0">
                <GlowBlobs
                    layout="custom"
                    blobs={[
                        { top: "60px", left: "20px", color: "rgba(52,168,83,0.9)" },
                        { top: "40px", right: "5px", color: "rgba(234,67,53,0.95)" },
                        { bottom: "40px", left: "160px", color: "rgba(255,191,0,0.9)" },
                        { bottom: "0px", right: "120px", color: "rgba(66,133,244,0.9)" },
                    ]}
                />
            </div>

            {/* 404 text  */}
            <div className="relative z-20 flex items-center justify-center w-full mt-16 md:mt-0">
                <h1
                    className="text-[180px] sm:text-[300px] md:text-[420px] font-extrabold leading-none text-transparent"
                    style={{
                        WebkitTextStroke: "8px transparent",
                        backgroundImage:
                            "linear-gradient(to bottom right, #1888F8, #1752A1)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        WebkitTextStrokeColor: "url(#gradient)",
                    }}
                >
                    404
                </h1>
            </div>

            {/* modal */}
            <div className=" group inset-0 flex items-center justify-center px-2 sm:px-4 z-40 -translate-y-16 sm:-translate-y-32 md:-translate-y-48">
                <div
                    className="relative backdrop-blur-sm bg-surface/10 sm:bg-surface/20 border border-white/20 rounded-2xl sm:rounded-3xl shadow-2xl text-center w-[85%] sm:w-full max-w-xl pt-6 sm:pt-14 pb-10 sm:pb-12 px-4 sm:px-16"
                    style={{
                        boxShadow: "inset 0 0 20px rgba(255,255,255,0.25)",
                    }} // , 0 0 25px rgba(255,255,255,0.1)
                >
                    <div className="-top-14 sm:-top-16 absolute left-1/2 -translate-x-1/2 z-50 group-hover:scale-105 group-hover:rotate-2 transition-all duration-200">
                        <Image
                            src="/sites/comingsoon/restingSparky.svg"
                            alt="Resting Sparky"
                            width={70}
                            height={70}
                            className="object-contain sm:w-[120px] sm:h-[120px]"
                            priority
                        />
                    </div>

                    {/* modal content */}
                    <h2 className="text-xl sm:text-3xl font-bold  mb-2">
                        Uh-oh! Page Not Found
                    </h2>
                    <h2 className="text-xl sm:text-3xl font-bold  mb-4 sm:mb-6">
                        (But Sparky&apos;s here!)
                    </h2>

                    <p className="text-sm sm:text-base  mb-3 sm:mb-4">
                        Looks like this page took a vacation without telling us! Don’t fret,
                        even our amazing Sparky can’t find everything instantly.
                    </p>

                    <p className="text-sm sm:text-base  mb-6 sm:mb-8">
                        In the meantime, let’s get you back to where the magic happens.
                    </p>

                    <div className="flex justify-center">
                        <Button
                            onClick={handleBackClick}
                            variant="blue"
                            className="text-white font-semibold text-sm sm:text-base px-5 sm:px-8 py-2 sm:py-3"
                        >
                            Back
                        </Button>
                    </div>
                </div>
            </div>

            {/* thinking sparky image */}
            <div className="absolute  z-30 bottom-[90px] sm:bottom-[-400px] flex justify-center w-full overflow-hidden pointer-events-none   sm:-translate-y-112 md:-translate-y-112">
                <Image
                    src="/sites/comingsoon/thinkingSparky.svg"
                    alt="Thinking Sparky"
                    width={1000}
                    height={1000}
                    className="object-contain opacity-100 w-[340px] sm:w-[560px] md:w-[700px]"
                    priority
                />
            </div>

            {/* gradient definition for stroke */}
            <svg width="0" height="0">
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop stopColor="#1888F8" offset="0%" />
                    <stop stopColor="#1752A1" offset="100%" />
                </linearGradient>
            </svg>
        </div>
    );
};