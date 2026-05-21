import CheckoutById from "@/features/checkout/checkout-by-id";

export default async function Page({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;

  return <CheckoutById id={orderId} />;
}
