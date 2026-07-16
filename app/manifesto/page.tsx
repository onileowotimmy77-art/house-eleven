import ManifestoHero from "@/components/manifesto/ManifestoHero";
import ManifestoStatements from "@/components/manifesto/ManifestoStatements";
import ManifestoArrival from "@/components/manifesto/ManifestoArrival";

export default function ManifestoPage() {
  return (
    <>
      <ManifestoHero />
      <ManifestoStatements full />
      <ManifestoArrival />
    </>
  );
}