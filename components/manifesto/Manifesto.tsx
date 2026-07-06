"use client";

import ManifestoImage from "./ManifestoImage";
import ManifestoContent from "./ManifestoContent";
import Section from "../layout/Section";
import Container from "../Container";

export default function Manifesto() {
return (
<Section>
{/* Background */}
<Container>

{/* Editorial Grid */}
<div
className="
absolute
inset-0
opacity-[0.03]
[background-image:
linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),
linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)]
[background-size:72px_72px]
"
/>

<div className="relative mx-auto flex min-h-screen max-w-[1600px] items-center px-8 lg:px-24">
{/* LEFT CONTENT */}
<div className="relative z-20 w-full lg:w-[46%]">
<ManifestoContent />
</div>

{/* RIGHT IMAGE */}
<div className="absolute right-0 top-0 h-full w-[58%] overflow-hidden">
<ManifestoImage />

{/* Fade into content */}
<div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent" />

{/* Bottom fade */}
<div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
</div>
</div>
</Container>
</Section>
);
}
