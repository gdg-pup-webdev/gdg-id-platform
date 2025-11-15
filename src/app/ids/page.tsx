"use client";

import Grid from "@/components/GridBackground";
import Image from "next/image";
import Button from "@/components/Button";
import { Download } from "lucide-react";
import { useSearchParams } from "next/navigation";
import GlowBlobs from "@/components/GlowBlobs";
import { Suspense, useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import { getMember } from "@/lib/client/apiEndpoints/memberEndpoints";
import { Member } from "@/types/member";
import { useGlobalContext } from "@/providers/GlobalContextProvider";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useMemberQuery } from "@/lib/client/apiQueries/memberQueries";
import { CardImage } from "./_components/CardImage";

export default function TrueIdPageWithSuspenseBoundary() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <IDPage />
    </Suspense>
  );
}

const calculateFont = (
  text: string,
  maxWidthPixels: number,
  normalFontSize: number,
  bold: boolean = true
): string => {
  // Create a canvas context for measuring text
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const fontWeight = bold ? "bold" : "normal";
  
  if (!ctx) return `${fontWeight} ${normalFontSize}px Arial`;

  let fontSize = normalFontSize;
  ctx.font = `${fontWeight} ${fontSize}px Arial`;

  // Measure the actual rendered width
  const textWidth = ctx.measureText(text).width;

  // Scale down if text is too wide
  if (textWidth > maxWidthPixels) {
    fontSize = (maxWidthPixels / textWidth) * fontSize;
  }

  return `${fontWeight} ${fontSize}px Arial`;
};

const IDPage = () => {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState<string | undefined>(undefined);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { member, isLoading, isError, error } = useMemberQuery(email);

  console.log("member", member);

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Fetch member data
  useEffect(() => {
    const email = searchParams.get("email") || undefined;
    if (email) setEmail(email);
  }, [searchParams]);

  // Draw ID on canvas (client-side)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !member) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const template = new window.Image();
    template.src = "/cards/front_empty_skeleton_updated.svg"; // your base template image
    template.onload = () => {
      // High-resolution multiplier for crisp downloads
      const downloadScale = 2;

      // CSS/logical dimensions
      const cssWidth = template.width;
      const cssHeight = template.height;

      // Helper function to draw ID card content
      const drawCard = (context: CanvasRenderingContext2D, scale: number) => {
        const width = cssWidth;
        const height = cssHeight;

        // Clear and draw template
        context.clearRect(0, 0, width, height);
        context.drawImage(template, 0, 0, width, height);

        // Enable high-quality rendering
        context.imageSmoothingEnabled = true;

        // Extend the CanvasRenderingContext2D type safely
        const extendedCtx = context as CanvasRenderingContext2D & {
          imageSmoothingQuality: "low" | "medium" | "high";
        };

        extendedCtx.imageSmoothingQuality = "high";

        // --- Draw texts (all coordinates in CSS pixels) ---
        context.textAlign = "center";
        context.fillStyle = "#1a1a1a";

        // Display name
        const displayName =  member.displayName || "";
        context.font = calculateFont(displayName || "", 180, 32);
        context.fillText(displayName || "", width / 2, 465);

        // GDG ID
        const gdgid = member.gdgId || "";
        context.font = calculateFont(displayName || "", 180, 20, false);
        context.fillText(member.gdgId || "", width / 2, 495);

        // Bottom section - Two column layout for better alignment
        // Left column: Labels
        context.textAlign = "left";
        context.fillStyle = "#ffffff";
        context.font = "16px Arial";

        const labelX = 70;
        const labelSpacing = 30;
        let currentY = 575;

        const maxTextWidth = width - 180 - 70;

        if (member.firstName || member.middleName || member.lastName) {
          context.fillText(`Name:`, labelX, currentY);
          currentY += labelSpacing;
        }

        if (member.email) {
          context.fillText(`Email:`, labelX, currentY);
          currentY += labelSpacing;
        }

        if (member.program) {
          context.fillText(`Program:`, labelX, currentY);
          currentY += labelSpacing;
        }

        if (member.department) {
          context.fillText(`Department:`, labelX, currentY);
        }

        // Right column: Values
        context.font = "bold 16px Arial";
        const valueX = 180; // Increased gap for better alignment
        currentY = 575;

        const fullName = `${member.firstName || ""}${
          member.middleName ? ` ${member.middleName}` : ""
        }${member.lastName ? ` ${member.lastName}` : ""}`;

        if (member.firstName || member.middleName || member.lastName) {
          if (fullName.length > 32) {
            context.font = calculateFont(fullName, maxTextWidth, 16);
          }

          context.fillText(`${fullName}`, valueX, currentY);

          context.font = "bold 16px Arial";
          currentY += labelSpacing;
        }

        // up to 32 chars in width
        if (member.email) {
          const email = member.email;
          console.log("email", email, "email length", email.length);
          if (email.length > 32) {
            const font = calculateFont(email, maxTextWidth, 16);
            context.font = font;
            console.log("font", font);
          }

          context.fillText(`${email || ""}`, valueX, currentY);

          context.font = "bold 16px Arial";
          currentY += labelSpacing;
        }

        if (member.program) {
          const program = `${member.program} `;
          console.log("program", program, "program length", program.length);
          if (program.length > 32) {
            context.font = calculateFont(program, maxTextWidth, 16);
            console.log("font", calculateFont(program, 32, 16));
          }

          context.fillText(`${program || ""}`, valueX, currentY);

          context.font = "bold 16px Arial";
          currentY += labelSpacing;
        }

        if (member.department) {
          if (member.department.length > 32) {
            context.font = calculateFont(member.department, maxTextWidth, 16);
          }

          context.fillText(`${member.department || ""}`, valueX, currentY);
        }
      };

      // Render high-res canvas for downloads (hidden, 4x resolution)
      canvas.width = cssWidth * downloadScale;
      canvas.height = cssHeight * downloadScale;
      canvas.style.width = cssWidth + "px";
      canvas.style.height = cssHeight + "px";

      ctx.scale(downloadScale, downloadScale);
      drawCard(ctx, downloadScale);

      // Create a preview canvas at 2-3x resolution for sharp display even when CSS scales
      const previewScale = 3; // Higher resolution preview to stay sharp when CSS scales it
      const previewCanvas = document.createElement("canvas");
      previewCanvas.width = cssWidth * previewScale;
      previewCanvas.height = cssHeight * previewScale;

      const previewCtx = previewCanvas.getContext("2d");
      if (previewCtx) {
        previewCtx.scale(previewScale, previewScale);
        drawCard(previewCtx, previewScale);

        // Use preview canvas for the image URL - CSS will scale but image has headroom
        setImageUrl(previewCanvas.toDataURL("image/png"));
      } else {
        // Fallback to main canvas
        setImageUrl(canvas.toDataURL("image/png"));
      }
    };
  }, [member]);

  const handleDownloadPNG = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.href = canvasRef.current.toDataURL("image/png");
    link.download = `${member?.displayName || "GDG_PUP"}_ID.png`;
    link.click();
  };

  const handleDownloadPDF = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`${member?.displayName || "GDG_PUP"}_ID.pdf`);
  };

  const { isDarkMode } = useGlobalContext();

  return (
    <div className="min-h-screen">
      <section className="relative flex flex-row min-h-screen items-center justify-center overflow-hidden">
        <Grid />
        <div className="hidden lg:block">
          <GlowBlobs layout="home" />
        </div>

        {/* MOBILE VIEW */}

        {/* DESKTOP VIEW */}
        <div className=" flex flex-col lg:flex-row relative z-10 text-center items-center p-8">
          <h1
            className="
                font-bold  
                text-slate-800 
                drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)]
                dark:text-transparent dark:bg-clip-text
                dark:bg-[linear-gradient(to_bottom,rgba(147,197,253,1)_0%,rgba(255,255,255,1)_50%,rgba(147,197,253,1)_100%)]
                dark:drop-shadow-[0_0_20px_rgba(147,197,253,0.8)]
                lg:hidden
                my-8 text-4xl

                flex flex-row flex-wrap justify-center
              "
          >
            OFFICIAL GDG&nbsp;PUP DIGITAL ID
          </h1>

          <div className="flex-1">
            <div className="w-[17rem] xs:w-sm sm:w-md xl:w-lg ">
              <CardImage
                imageUrl={imageUrl}
                isLoading={isLoading}
                isError={isError}
              />
            </div>
          </div>

          <div className="flex flex-1 flex-col items-center px-5 max-w-2xl ">
            <h1
              className="
                text-6xl font-bold  
                text-slate-800 
                drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)]
                dark:text-transparent dark:bg-clip-text
                dark:bg-[linear-gradient(to_bottom,rgba(147,197,253,1)_0%,rgba(255,255,255,1)_50%,rgba(147,197,253,1)_100%)]
                dark:drop-shadow-[0_0_20px_rgba(147,197,253,0.8)]
                hidden lg:flex

                
                 flex-row flex-wrap justify-center w-full
              "
            >
              OFFICIAL GDG&nbsp;PUP DIGITAL ID
            </h1>

            {/* GDG Logo (light/dark mode for desktop) */}
            <div className="h-auto w-full max-w-sm scale-140 mx-auto hidden lg:flex">
              {/* Light mode logo */}
              <img
                src={
                  isDarkMode
                    ? "/sites/idgenerate/GDGLogo_Dark.png"
                    : "/sites/idgenerate/GDGLogo_Light.png"
                }
                alt="GDG Logo Light"
                className="  h-auto w-full object-contain mx-auto"
              />
            </div>

            <div className="flex justify-center gap-3 mt-16 lg:mt-0 flex-col xs:flex-row">
              <Button variant="blue" onClick={handleDownloadPNG}>
                <Download className="mr-2 size-5 stroke-white" />
                <span>Download as PNG</span>
              </Button>
              <Button variant="green" onClick={handleDownloadPDF}>
                <Download className="mr-2 size-5 stroke-white" />
                <span>Download as PDF</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Hidden canvas for generation */}
        <canvas ref={canvasRef} className="hidden" />
      </section>
    </div>
  );
};
