"use client";

import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import Entrance from "@/components/motion/Entrance";
import { useCursorContext } from "@/components/cursor/CursorProvider";

export default function HeroContent() {
  const { setHovering, setLabel } = useCursorContext();

  return (
    <Container className="h-full">
      <div
        className="
          flex
          h-full
          items-end
  ]     "
      >
        <div
          className="
            
            max-w-5xl
            space-y-10
          "
        >
          {/* Headline */}
          <Entrance delay={0.5}>
            <h1
              className="
                max-w-4xl
              
                font-black
                uppercase
                tracking-[-0.06em]
                leading-[0.88]
                text-[clamp(2.8rem,5.7vw,10rem)]
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

          {/* Description */}
          <Entrance delay={0.8}>
            <p
              id="hero-text"
              className="
                max-w-xl
                text-lg
                leading-8
                text-white/65
                
              "
            >
             
            A modern luxury fashion house crafting
            timeless essentials for ambitious individuuals
              
            </p>
          </Entrance>

          {/* CTA */}
          <Entrance delay={1.1}>
            <div className="-mt-5">
              <Button
              
                onMouseEnter={() => {
                  setHovering(true);
                  setLabel("ENTER");
                }}
                onMouseLeave={() => {
                  setHovering(false);
                  setLabel("");
                }}
              >
                ENTER THE HOUSE
              </Button>
            </div>
          </Entrance>
        </div>
      </div>
    </Container>
  );
}