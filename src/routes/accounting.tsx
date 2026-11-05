import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";
import { pageHead } from "@/components/dashboard/ui";

export const Route = createFileRoute("/accounting")({
  head: pageHead("Accounting", "Choose where your books live: Oakline Books or another accounting tool."),
  component: () => <PlaceholderPage title="Accounting" />,
});
