"use client";

import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import Entrance from "@/components/motion/Entrance";

import useCursorTarget from "@/components/cursor/useCursorTarget";
import { CursorLabels } from "@/lib/cursor";
import { motion } from "framer-motion";
import { useEntrance } from "@/components/entrance/EntranceProvider";


export default function HeroContent() {
  const enterCursor = useCursorTarget(CursorLabels.ENTER);

  const {
    entranceState,
    enterHouse,
  } = useEntrance();

  return (
    <Container className="h-full">
      <div
        className="
          flex
          h-full
          items-center
          pb-24
        "
      >
        <motion.div
  animate={
    entranceState === "transitioning"
      ? {
          opacity: 0,
          y: -48,
        }
      : {
          opacity: 1,
          y: 0,
        }
  }
  transition={{
    duration: 0.9,
    ease: [0.22, 1, 0.36, 1],
  }}
  className="
    max-w-5xl
    flex
    flex-col
    justify-end
    gap-6
  "
>
          <Entrance delay={0.5}>
            <h1
              className="
                max-w-4xl
                font-black
                uppercase
                mt-58
                tracking-[-0.06em]
                leading-[0.88]
                text-[clamp(2.8rem,4.7vw,8rem)]
              "
            >
              FOR
              <br />
              THOSE
              <br />
              WHO MOVE
              <br />
              FIRST.
            </h1>
          </Entrance>

          <Entrance delay={0.8}>
            <p
              id="hero-text"
              className="
                max-w-[22rem]
                text-[15px]
                leading-7
                text-white/65
              "
            >
              A modern luxury fashion house crafting timeless essentials
              for ambitious individuals.
            </p>
          </Entrance>

          <Entrance delay={1.1}>
            <div className="pt-6">
              <Button
                {...enterCursor}
                className="
                  px-3
                  py-2
                  text-[10px]
                  tracking-[0.42em]
                "
                disabled={entranceState !== "idle"}
                onClick={enterHouse}
              >
                {entranceState === "welcome"
                  ? "WELCOME HOME"
                  : "ENTER THE HOUSE"}
              </Button>
            </div>
          </Entrance>
        </div>
      </div>
    </Container>
  );
}