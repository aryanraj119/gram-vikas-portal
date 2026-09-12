import { createFileRoute } from "@tanstack/react-router";
import { InteriorPage } from "@/components/portal-ui";

export const Route = createFileRoute("/schemes")({
  head: () => ({
    meta: [
      { title: "Government Schemes | Aaple Gaon Gram Panchayat" },
      { name: "description", content: "Search central, Maharashtra and district welfare schemes, eligibility criteria and application guidance." },
    ],
  }),
  component: () => <InteriorPage pageKey="schemes" />,
});
