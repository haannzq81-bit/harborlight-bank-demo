import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";
import { pageHead } from "@/components/dashboard/ui";

export const Route = createFileRoute("/payments/recipients")({
  head: pageHead("Recipients", "Vendors and people you pay from Oakline."),
  component: () => <PlaceholderPage title="Recipients" />,
});
