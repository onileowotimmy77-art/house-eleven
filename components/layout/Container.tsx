interface ContainerProps {
children: React.ReactNode;
className?: string;
}

export default function Container({
children,
className = "",
}: ContainerProps) {
return (
<div
className={`
mx-auto
w-full
max-w-[1600px]
px-8
lg:px-24
${className}
`}
>
{children}
</div>
);
}