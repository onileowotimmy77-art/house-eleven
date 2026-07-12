"use client";

import Container from "@/components/layout/Container";
import Section from "../layout/Section";
import FinaleNavigation from "./FinaleNavigation";
import FinaleWordmark from "./FinaleWordmark";
import Stagger from "@/components/motion/Stagger";
import Reveal from "@/components/motion/Reveal";

export default function Finale() {
return (
<Section 
  padding="py-56"
>

    <Container>

        <Stagger className="relative z-20">

          <FinaleWordmark />

          <FinaleNavigation />

            <Reveal>
                <div className="mt-32 text-center">

                    <p className="font-mono text-xs uppercase tracking-[0.45em] text-white/30">
                    © 2026 House Eleven
                    </p>

                    <p className="mt-5 text-white/45">
                    Built Somewhere.
                    <br />
                    Worn Everywhere.
                    </p>

                </div>
            </Reveal>
        </Stagger>

    </Container>
</Section>
);
}

