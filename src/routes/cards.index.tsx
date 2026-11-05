import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";
import { pageHead } from "@/components/dashboard/ui";

export const Route = createFileRoute("/cards/")({
  head: pageHead("Cards", "Manage physical and virtual Oakline cards for your team."),
  component: () => <PlaceholderPage title="Cards" />,
});
