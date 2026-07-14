import CheckoutById from "@/features/checkout/checkout-by-id";

export default async function Page({
  params,
}: {
  params: Promise<{ orderNumber: string }>;
}) {
  const { orderNumber } = await params;

  return <CheckoutById orderNumber={orderNumber} />;
}
