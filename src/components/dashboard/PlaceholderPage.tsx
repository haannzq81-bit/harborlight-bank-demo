import { Hammer } from "lucide-react";
import { EmptyState, Page, PageHeader } from "./ui";

/** Temporary page for menu sections not yet built out in the demo. */
export function PlaceholderPage({ title }: { title: string }) {
  return (
    <Page>
      <PageHeader title={title} />
      <EmptyState
        icon={Hammer}
        title={`${title} is coming next`}
        body="This section of the Oakline demo is still being built. The menu, layout and navigation are in place."
      />
    </Page>
  );
}
