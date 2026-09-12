import { createFileRoute } from "@tanstack/react-router";
import { InteriorPage } from "@/components/portal-ui";

export const Route = createFileRoute("/infrastructure")({
  head: () => ({
    meta: [
      { title: "Village Infrastructure & Map | Aaple Gaon Gram Panchayat" },
      { name: "description", content: "Explore essential village facilities, roads, water supply, schools, health centres and facility map." },
    ],
  }),
  component: () => <InteriorPage pageKey="infrastructure" />,
});
