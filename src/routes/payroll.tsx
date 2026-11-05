import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";
import { pageHead } from "@/components/dashboard/ui";

export const Route = createFileRoute("/payroll")({
  head: pageHead("Payroll", "Oakline Payroll runs and team pay."),
  component: () => <PlaceholderPage title="Payroll" />,
});
