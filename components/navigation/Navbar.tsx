"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import NavLogo from "./NavLogo";
import NavLinks from "./NavLinks";
import NavButton from "./NavButton";

export default function Navbar() {
const [scrolled, setScrolled] = useState(false);

useEffect(() => {
const handleScroll = () => {
setScrolled(window.scrollY > 24);
};

window.addEventListener("scroll", handleScroll);

return () =>
window.removeEventListener("scroll", handleScroll);
}, []);

return (
<motion.header
initial={{ y: -80 }}
animate={{ y: 0 }}
transition={{ duration: 0.8 }}
className={`
fixed
top-0
left-0
z-50
w-full
transition-all
duration-500
mx-8
${
scrolled
? "bg-black/40 backdrop-blur-xl"
: "bg-transparent"
}
`}
>
<div className="mx-auto flex h-[72px] max-w-[1600px] items-center justify-between px-8 lg:px-24">

<NavLogo />

<NavLinks />

<NavButton />

</div>
</motion.header>
);
}
