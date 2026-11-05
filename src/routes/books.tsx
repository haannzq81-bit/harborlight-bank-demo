import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";
import { pageHead } from "@/components/dashboard/ui";

export const Route = createFileRoute("/books")({
  head: pageHead("Books", "Oakline Books profit and loss overview."),
  component: () => <PlaceholderPage title="Books" />,
});
