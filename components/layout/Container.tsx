interface ContainerProps {
children: React.ReactNode;
}

export default function Container({
children,
}: ContainerProps) {
return (
<div
className="
mx-auto
w-full
max-w-[1440px]
px-8
lg:px-24
"
>
{children}
</div>
);
}
