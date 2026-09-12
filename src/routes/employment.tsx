import { createFileRoute } from "@tanstack/react-router";
import { InteriorPage } from "@/components/portal-ui";

export const Route = createFileRoute("/employment")({
  head: () => ({
    meta: [
      { title: "Employment & Skills | Aaple Gaon Gram Panchayat" },
      { name: "description", content: "Find local jobs, village tenders, skill development programmes, self-help groups and talent directory." },
    ],
  }),
  component: () => <InteriorPage pageKey="employment" />,
});
