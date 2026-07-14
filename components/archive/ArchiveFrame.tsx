import type { ReactNode } from "react";
import Container from "@/components/layout/Container";

interface ArchiveFrameProps {
  children: ReactNode;
  className?: string;
}

export default function ArchiveFrame({
  children,
  className = "",
}: ArchiveFrameProps) {
  return (
    <Container className={className}>
      <div className="mx-auto w-full max-w-5xl">
        {children}
      </div>
    </Container>
  );
}