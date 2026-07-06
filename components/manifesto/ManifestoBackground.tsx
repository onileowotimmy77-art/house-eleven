export default function ManifestoBackground() {
return (
<>
<div className="absolute inset-0 bg-black" />

<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_70%)]" />

<div
className="
absolute
inset-0
opacity-[0.03]
[background-image:
linear-gradient(rgba(255,255,255,.15)_1px,transparent_1px),
linear-gradient(90deg,rgba(255,255,255,.15)_1px,transparent_1px)]
[background-size:72px_72px]
"
/>
</>
);
}
