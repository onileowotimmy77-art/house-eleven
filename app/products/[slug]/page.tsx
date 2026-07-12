import ProductPage from "@/src/features/product/ProductPage";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Page({
  params,
}: PageProps) {
  const { slug } = await params;

  return (
    <ProductPage
      slug={slug}
    />
  );
}