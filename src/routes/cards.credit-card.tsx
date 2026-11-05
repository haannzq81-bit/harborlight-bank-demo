import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";
import { pageHead } from "@/components/dashboard/ui";

export const Route = createFileRoute("/cards/credit-card")({
  head: pageHead("Credit Card", "Oakline credit card balance, statements and autopay."),
  component: () => <PlaceholderPage title="Credit Card" />,
});
