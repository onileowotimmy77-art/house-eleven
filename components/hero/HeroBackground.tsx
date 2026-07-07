import Parallax from "@/components/motion/Parallax";

export default function HeroBackground() {
    return (
    <>
        <div className="absolute inset-0 -z-30 bg-black" />

        <Parallax speed={15}>
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_60%)]" />
        </Parallax>
        <Parallax speed={30}>
            <div
                className="
                absolute
                inset-0
                -z-10
                opacity-[0.045]
                [background-image:
                linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),
                linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)]
                [background-size:64px_64px]
                "   
            />
        </Parallax>

        <div
            className="
            absolute
            inset-0
            opacity-[0.02]
            bg-[url('/noise.png')]
            mix-blend-overlay
            "
        />
    </>
    );
}
