import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

export const CardImage = ({
  imageUrl,
  isLoading,
  isError,
}: {
  imageUrl: string | null;
  isLoading: boolean;
  isError: boolean;
}) => {
  // show the true image after 1 second to allow the actual card to load in the background
  const [showTrue, setShowTrue] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      const stuff = async () => {
        console.log("showing true");

        setTimeout(() => {
          setShowTrue(true);
          console.log("done showing true");
        }, 2000);
      };
      stuff();
    }
  }, [isLoading]);

  const [rotation, setRotation] = useState(0);

  const handleMouseEnter = () => {
    const randomDeg = (Math.random() * 1 + 2) * (Math.random() > 0.5 ? 1 : -1);
    setRotation(randomDeg);
    console.log("hovering");
  };

  const handleMouseLeave = () => {
    setRotation(0); // reset when hover ends
    console.log("not hovering");
  };

  return (
    <>
      <div
        className="relative flex items-center overflow-visible z-0 w-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative w-full overflow-visible">
          {!isLoading && isError && (
            <div className="flex flex-col items-center justify-center text-center space-y-6">
              <img
                src="/sites/comingsoon/restingSparky.svg"
                alt="Error Illustration"
                className="w-64 h-auto opacity-90"
              />
              <p
                className="
                    text-3xl font-bold  
                  text-red-600
                    drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)]
                    dark:text-transparent dark:bg-clip-text
                    dark:bg-[linear-gradient(to_bottom,rgba(239,68,68,1)_0%,rgba(252,165,165,1)_50%,rgba(239,68,68,1)_100%)]
                    dark:drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]
                    "
              >
                An error has occurred
              </p>
            </div>
          )}

          {!isError && (
            <>
              {/* BACK IMAGE */}
              <img
                src="/backcard.webp"
                alt="GDG ID Back"
                className="absolute top-1/2 left-1/2 
                             -translate-x-1/2 -translate-y-1/2 
                             scale-110 -z-10"
              />

              {/* invisible placeholder card to avoid flickering  */}

              {/* FRONT GENERATED IMAGE */}
              <div
                className={cn(
                  " relative w-full h-full",
                  "transition-all duration-200",
                  showTrue && "animate-rotateY360"
                )}
              >
                <img
                  src="/cards/front_empty_skeleton_updated.svg"
                  alt="GDG ID Front Skeleton"
                  className="w-full h-auto opacity-0"
                />
                {true && (
                  <div className="w-full h-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <img
                      src="/cards/front_empty_skeleton_updated.svg"
                      alt="GDG ID Front Skeleton"
                      className={cn(
                        "w-full h-auto  ",
                        !showTrue && "animate-wiggle",

                        "transition-all duration-800",
                        showTrue && "opacity-0",
                        !showTrue && "opacity-100"
                      )}
                    />
                  </div>
                )}
                {true && (
                  <div
                    className={cn(
                      "w-full h-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-200"
                    )}
                    style={{
                      transform: `rotate(${rotation}deg)`,
                    }}
                  >
                    <img
                      src={imageUrl!}
                      alt="Generated GDG ID"
                      className={cn(
                        "w-full h-auto ",
                        "image-rendering-crisp-edges", // Prevent browser from blurring when scaling
                        "transition-all duration-400",
                        !showTrue && "opacity-0",
                        showTrue && "opacity-100"
                      )}
                      style={{
                        imageRendering: "crisp-edges",
                      }}
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
