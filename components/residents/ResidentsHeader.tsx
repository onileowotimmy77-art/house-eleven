"use client";

import { fadeUp } from "@/lib/motion";
import { motion } from "framer-motion";

export default function ResidentsHeader() {
return (
<motion.div
    {...fadeUp}
className="mx-auto mb-32 max-w-3xl text-center"
>
<p className="font-mono text-xs uppercase tracking-[0.45em] text-white/40">
RESIDENTS
</p>

<h2 className="mt-6 text-[clamp(4rem,8vw,7rem)] font-black uppercase leading-[0.9] tracking-[-0.06em]">
The House
</h2>

<p className="mx-auto mt-8 max-w-xl text-lg leading-8 text-white/55">
Designers, photographers, musicians and artists building the culture
of House Eleven.
</p>
</motion.div>
);
}
