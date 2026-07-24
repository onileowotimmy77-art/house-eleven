import ManifestoHero from "@/src/manifesto/ManifestoHero";
import ManifestoStatements from "@/src/manifesto/ManifestoStatements";
import ManifestoArrival from "@/src/manifesto/ManifestoArrival";

export default function ManifestoPage() {
  return (
    <>
      <ManifestoHero />
      <ManifestoStatements full />
      <ManifestoArrival />
    </>
  );
}