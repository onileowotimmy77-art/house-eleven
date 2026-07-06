interface SectionProps {
children: React.ReactNode;
className?: string;
}

export default function Section({
children,
className = "",
}: SectionProps) {
return (
<section
className={`
relative
overflow-hidden
bg-black
py-40
text-white
${className}
`}
>
{children}
</section>
);
}