import { createFileRoute } from "@tanstack/react-router";
import { InteriorPage } from "@/components/portal-ui";

export const Route = createFileRoute("/grievances")({
  head: () => ({
    meta: [
      { title: "Grievance Redressal Portal | Aaple Gaon Gram Panchayat" },
      { name: "description", content: "Register a civic complaint, track status, view escalation matrix and department resolution performance." },
    ],
  }),
  component: () => <InteriorPage pageKey="grievances" />,
});
