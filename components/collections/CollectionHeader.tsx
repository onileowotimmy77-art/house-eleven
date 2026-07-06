"use client";

import { fadeUp } from "@/lib/motion";
import { motion } from "framer-motion";

export default function CollectionHeader() {
return (
<motion.div
    {...fadeUp}
>
<p className="mb-6 font-msono text-xs uppercase tracking-[0.45em] text-white/40">
COLLECTIONS
</p>

<h2 className="text-[clamp(4rem,8vw,8rem)] font-black uppercase leading-[0.9] tracking-[-0.06em]">
FOUNDATION
</h2>

<p className="mx-auto mt-10 max-w-xl text-lg leading-8 text-white/55">
The opening chapter of House Eleven.
Modern tailoring meets cinematic street luxury.
</p>
</motion.div>
);
}