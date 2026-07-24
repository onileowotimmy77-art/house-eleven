import ManifestoHero from "@/src/features/manifesto/ManifestoHero";
import ManifestoStatements from "@/src/homepage/manifesto/ManifestoStatements";
import ManifestoArrival from "@/src/features/manifesto/ManifestoArrival";

export default function ManifestoPage() {
  return (
    <>
      <ManifestoHero />
      <ManifestoStatements full />
      <ManifestoArrival />
    </>
  );
}