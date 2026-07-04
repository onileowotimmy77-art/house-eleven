"use client";

import Link from "next/link";
import NavbarBlur from "./NavbarBlur";

export default function Navbar() {
return (
<header
className="
fixed
top-0
left-0
z-50
w-full
"
>
    <NavbarBlur />
<div
className="
mx-auto
flex
max-w-[1600px]
items-center
justify-between
px-10
py-8
lg:px-16
xl:px-24
"
>
{/* Logo */}

<Link
href="/"
className="
text-sm
font-semibold
uppercase
tracking-[0.55em]
"
>
HOUSE ELEVEN
</Link>

{/* Navigation */}

<nav className="hidden lg:flex items-center gap-14">

<Link
href="/collections"
className="uppercase text-xs tracking-[0.3em] text-white/60 hover:text-white transition-colors duration-500"
>
Collections
</Link>

<Link
href="/manifesto"
className="uppercase text-xs tracking-[0.3em] text-white/60 hover:text-white transition-colors duration-500"
>
Manifesto
</Link>

<Link
href="/journal"
className="uppercase text-xs tracking-[0.3em] text-white/60 hover:text-white transition-colors duration-500"
>
Journal
</Link>

<Link
href="/residents"
className="uppercase text-xs tracking-[0.3em] text-white/60 hover:text-white transition-colors duration-500"
>
Residents
</Link>

</nav>

{/* CTA */}

<button
className="
border
border-white/20
px-6
py-3
text-[11px]
uppercase
tracking-[0.35em]
transition-all
duration-500
hover:bg-white
hover:text-black
"
>
ENTER
</button>

</div>
</header>
);
}