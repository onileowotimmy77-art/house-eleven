"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

import AccountSidebar from "./AccountSidebar";

interface AccountLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function AccountLayout({
  title,
  description,
  children,
}: AccountLayoutProps) {
  return (
    <Section customPadding="py-48">

      <Container>

        <div
          className="
            grid
            gap-24

            lg:grid-cols-[260px_minmax(0,1fr)]
            lg:items-start
          "
        >

          <aside>

            <AccountSidebar />

          </aside>

          <main>

            <header className="mb-20">

              <h1
                className="
                  text-[clamp(2.5rem,5vw,4rem)]
                  font-medium
                  tracking-[-0.05em]
                  leading-[0.95]
                "
              >
                {title}
              </h1>

              {description && (
                <p
                  className="
                    mt-6
                    max-w-2xl
                    text-lg
                    leading-8
                    text-white/55
                  "
                >
                  {description}
                </p>
              )}

            </header>

            {children}

          </main>

        </div>

      </Container>

    </Section>
  );
}