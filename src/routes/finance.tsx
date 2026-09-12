import { createFileRoute } from "@tanstack/react-router";
import { InteriorPage } from "@/components/portal-ui";

export const Route = createFileRoute("/finance")({
  head: () => ({
    meta: [
      { title: "Finance & Budget Transparency | Aaple Gaon Gram Panchayat" },
      { name: "description", content: "Understand annual income, expenditure, grants and transparent village budget spending." },
    ],
  }),
  component: () => <InteriorPage pageKey="finance" />,
});
