import { createFileRoute } from "@tanstack/react-router";
import { InteriorPage } from "@/components/portal-ui";

export const Route = createFileRoute("/environment")({
  head: () => ({
    meta: [
      { title: "Environment & Green Village | Aaple Gaon Gram Panchayat" },
      { name: "description", content: "Track tree plantation campaigns, plastic reduction, rainwater harvesting and village Green Scoreboard." },
    ],
  }),
  component: () => <InteriorPage pageKey="environment" />,
});
