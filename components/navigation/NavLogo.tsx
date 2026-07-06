"use client";

import MagneticLink from "../motion/MagneticLink";

export default function NavLogo() {
return (

    <div className="leading-none">
<MagneticLink>        
    <h1 className="font-black uppercase tracking-[-0.06em] text-xl">
        HOUSE ELEVEN
    </h1>
</MagneticLink>
<p className="mt-1 font-mono text-[10px] uppercase tracking-[0.35em] text-white/40">
EST. 2026
</p>
</div>
);
}
