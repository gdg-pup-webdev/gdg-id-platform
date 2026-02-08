"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const cards = [
  { id: 1, src: "/cards/front.webp", z: 5 },
  { id: 2, src: "/cards/red.webp", z: 4 },
  { id: 3, src: "/cards/yellow.webp", z: 3 },
  { id: 4, src: "/cards/green.webp", z: 2 },
  { id: 5, src: "/cards/blue.webp", z: 1 },
];

// Tune how much you see of the sides
const COLLAPSED_SPINE_STEP = 3;  // tight stack like book side
const REVEAL_STEP = 12;          // small right expansion per layer (~0.5 inch total)
const ROTATE_CLOSED_Y = 3;       // small right-tilt when closed
const ROTATE_OPEN_STEP_Y = 10;    // right-tilt per layer when open

export default function AnimatedCardStack() {
  return (
    <div
      className="
        relative w-[420px] h-[260px]
        overflow-hidden
        [perspective:1200px]
      "
    >
      {cards.map((card, i) => {
        const closedX = i * COLLAPSED_SPINE_STEP;             // tight right offset (book spine)
        const openX = i * (REVEAL_STEP + COLLAPSED_SPINE_STEP); // fan out rightwards
        const closedRotateY = ROTATE_CLOSED_Y + i * 0.3;
        const openRotateY = ROTATE_CLOSED_Y + i * ROTATE_OPEN_STEP_Y;

        return (
          <motion.div
            key={card.id}
            className="
              absolute inset-0 origin-left
              will-change-transform
              [backface-visibility:hidden]
              rounded-2xl
            "
            style={{ zIndex: card.z }}
            initial={{
              x: closedX,
              rotateY: closedRotateY,
              scale: 1 - i * 0.01,
            }}
            animate={{
              x: [closedX, openX, closedX],        // open to the right, close back
              rotateY: [closedRotateY, openRotateY, closedRotateY],
            }}
            transition={{
              duration: 4.2,
              delay: i * 0.12,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            <Image
              src={card.src}
              alt={`Card ${card.id}`}
              fill
              sizes="420px"
              priority={i === 0}
              className="object-cover rounded-2xl pointer-events-none select-none"
            />
          </motion.div>
        );
      })}
    </div>
  );
}
