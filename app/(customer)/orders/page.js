export const metadata = {
  title: "My Orders | Afia's Herbal Oil",
  description: "View and track your orders.",
  robots: {
    index: false,
    follow: false,
  },
};

import OrdersPageClient from "./OrdersPageClient";

export default function Page() {
  return <OrdersPageClient />;
}