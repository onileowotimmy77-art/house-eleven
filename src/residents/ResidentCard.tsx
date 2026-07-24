"use client";

import Image from "next/image";
import { useCursorContext } from "@/components/cursor/CursorProvider";
import HoverCard from "../../components/motion/HoverCard";
import Reveal from "@/components/motion/Reveal";

interface ResidentCardProps {
image: string;
name: string;
role: string;
}

export default function ResidentCard({
image,
name,
role,
}: ResidentCardProps) {

    const {
      setHovering,
      setLabel,
    } = useCursorContext();

return (
<Reveal>
<HoverCard>
<article
onMouseEnter={() => {
        setHovering(true);
        setLabel("MEET");
    }}

    onMouseLeave={() => {
        setHovering(false);
        setLabel("");
    }}

    className="group"
>
<div className="relative aspect-[4/5] overflow-hidden rounded-sm">
<Image
src={image}
alt={name}
fill
className="
object-cover 
transition-transform
duration-700 
ease-out
group-hover:scale-[1.05]
"
/>

<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
</div>

<div className="mt-6">
<h3
  className="
    mt-4
    text-5xl
    font-black
    uppercase
    leading-none
    tracking-[-0.05em]
    transition-all
    duration-500
    group-hover:translate-y-[-4px]
  "
>
{name}
</h3>

<p className="mt-2 font-mono text-xs uppercase tracking-[0.35em] text-white/40">
{role}
</p>
</div>
</article>
</HoverCard>
</Reveal>
);
}
