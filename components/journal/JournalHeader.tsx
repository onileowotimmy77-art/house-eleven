"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

export default function JournalHeader() {
return (
<motion.div
    {...fadeUp}
className="mx-auto mb-32 max-w-3xl text-center"
>
<p className="font-mono text-xs uppercase tracking-[0.45em] text-white/40">
JOURNAL
</p>

<h2 className="mt-6 text-[clamp(4rem,8vw,7rem)] font-black uppercase leading-[0.9] tracking-[-0.06em]">
Stories
</h2>

<p className="mx-auto mt-8 max-w-xl text-lg leading-8 text-white/55">
Essays, campaigns and conversations shaping the future of House Eleven.
</p>
</motion.div>
);
}