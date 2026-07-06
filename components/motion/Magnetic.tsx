"use client";

import {
    useRef,
    ReactNode,
} from "react";

import gsap from "gsap";

interface MagneticProps {
    children: ReactNode;
}

export default function Magnetic({
    children,
}: MagneticProps) {

    const ref = useRef<HTMLDivElement>(null);

    const handleMove = (
        e: React.MouseEvent<HTMLDivElement>
    ) => {

        if (!ref.current) return;

        const rect =
            ref.current.getBoundingClientRect();

        const x =
            e.clientX - rect.left - rect.width / 2;

        const y =
            e.clientY - rect.top - rect.height / 2;

        gsap.to(ref.current, {
            x: x * 0.18,
            y: y * 0.18,
            duration: 0.45,
            ease: "power3.out",
        });

    };

    const handleLeave = () => {

        if (!ref.current) return;

        gsap.to(ref.current, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "elastic.out(1,0.35)",
        });

    };

    return (

        <div

            ref={ref}

            onMouseMove={handleMove}

            onMouseLeave={handleLeave}

            className="inline-block"

        >

            {children}

        </div>

    );

}