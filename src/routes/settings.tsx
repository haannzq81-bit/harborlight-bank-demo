import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";
import { pageHead } from "@/components/dashboard/ui";

export const Route = createFileRoute("/settings")({
  head: pageHead("Settings", "Profile, notifications, security and company settings."),
  component: () => <PlaceholderPage title="Settings" />,
});
