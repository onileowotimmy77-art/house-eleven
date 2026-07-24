"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

import { useCursorContext } from "@/components/cursor/CursorProvider";

export default function ManifestoImage() {
const { scrollYProgress } = useScroll();

const y = useTransform(scrollYProgress, [0, 1], [0, -120]);

const {
  setHovering,
  setLabel,
} = useCursorContext();

return (
<motion.div
   

    style={{ y }}

    onMouseEnter={() => {
        setHovering(true);
        setLabel("EXPLORE");
    }}

    onMouseLeave={() => {
        setHovering(false);
        setLabel("");
    }}

    className="relative h-full w-full"
>
<Image
src="/manifesto.jpg"
alt="House Eleven Collection"
fill
priority
className="object-cover object-right"
/>

{/* Left Fade */}
<div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-transparent" />

{/* Top Shadow */}
<div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />

{/* Bottom Shadow */}
<div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

{/* Luxury Border */}
<div className="absolute inset-0 border-l border-white/10" />

<div
className="
absolute
right-[-180px]
top-1/2
h-[700px]
w-[700px]
-translate-y-1/2
rounded-full
bg-amber-300/10
blur-[180px]
"
/>
</motion.div>
);
}