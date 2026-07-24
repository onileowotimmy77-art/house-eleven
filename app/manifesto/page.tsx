import ManifestoHero from "@/src/homepage/manifesto/ManifestoHero";
import ManifestoStatements from "@/src/homepage/manifesto/ManifestoStatements";
import ManifestoArrival from "@/src/homepage/manifesto/ManifestoArrival";

export default function ManifestoPage() {
  return (
    <>
      <ManifestoHero />
      <ManifestoStatements full />
      <ManifestoArrival />
    </>
  );
}