"use client";

import MagneticLink from "../motion/MagneticLink";
import { useCursorContext } from "@/components/cursor/CursorProvider";

const links = [
"Collections",
"Manifesto",
"Journal",
"Residents",
];

export default function NavLinks() {

    const {
        setHovering,
        setLabel,
    } = useCursorContext();

return (
<nav className="hidden lg:flex items-center gap-14">

{links.map((link) => (

  <MagneticLink key={link}>

    <button
      onMouseEnter={() => {
        setHovering(true);
        setLabel("");
      }}

      onMouseLeave={() => {
        setHovering(false);
        setLabel("");
      }}

      className="
        group
        relative
        text-xs
        uppercase
        tracking-[0.35em]
        text-white/60
        transition
        duration-300
        hover:text-white
      "
    >

      {link}

      <span
        className="
          absolute
          -bottom-2
          left-0
          h-px
          w-0
          bg-white
          transition-all
          duration-300
          group-hover:w-full
        "
      />

    </button>
 </MagneticLink>
 

))}

</nav>
);
}