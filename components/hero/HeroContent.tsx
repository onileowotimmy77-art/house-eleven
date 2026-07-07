"use client";

import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import Stagger from "@/components/motion/Stagger";
import { useCursorContext } from "@/components/cursor/CursorProvider";
import Parallax from "@/components/motion/Parallax";

export default function HeroContent() {
  const {
    setLabel,
    setHovering,
  } = useCursorContext();

  return (
    <div className="flex flex-col justify-center">
      <Stagger>
        <Reveal>
          
            <h1
                className="
                mt-6 lg:mt-12
                max-w-[8ch]
                font-extrabold
                uppercase
                tracking-[-0.06em]
                leading-[0.88]
                text-[clamp(3.8rem,6vw,7.5rem)]
                "
            >
                EVERY
                <br />
                HOUSE
                <br />
                BEGINS
                <br />
                SOMEWHERE.
            </h1>
         
        </Reveal>

        <Reveal>
          
            <p
                className="
                mt-10
                max-w-lg
                text-lg
                leading-8
                text-white/65
                "
            >
                A modern fashion and creative house built for the next generation.
            </p>
        
        </Reveal>

        <Reveal>
            
                <div className="mt-12 lg:mt-16">
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
         
        </Reveal>
      </Stagger>
    </div>
  );
}