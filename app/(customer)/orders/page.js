export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Pehno by Sajeel Nawaz",
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