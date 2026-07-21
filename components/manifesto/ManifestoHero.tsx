import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

export default function ManifestoHero() {
  return (
    <Section padding="xl">
      <Container>
        <div className="max-w-5xl">
          <p
            className="
              font-mono
              text-[11px]
              uppercase
              tracking-[0.45em]
              text-white/35
            "
          >
            House Eleven
          </p>

          <h1
            className="
              mt-10
              text-[clamp(4rem,10vw,8rem)]
              font-black
              uppercase
              leading-[0.9]
              tracking-[-0.06em]
            "
          >
            Manifesto
          </h1>
        </div>
      </Container>
    </Section>
  );
}