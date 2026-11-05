import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";
import { pageHead } from "@/components/dashboard/ui";

export const Route = createFileRoute("/payments/wire-drawdowns")({
  head: pageHead("Wire Drawdowns", "Wire drawdown requests on your accounts."),
  component: () => <PlaceholderPage title="Wire Drawdowns" />,
});
