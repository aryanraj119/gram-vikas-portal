import { createFileRoute } from "@tanstack/react-router";
import { InteriorPage } from "@/components/portal-ui";

export const Route = createFileRoute("/agriculture")({
  head: () => ({
    meta: [
      { title: "Agriculture Support Centre | Aaple Gaon Gram Panchayat" },
      { name: "description", content: "Crop advisories, local market prices, weather updates, agricultural inputs and farmer welfare schemes." },
    ],
  }),
  component: () => <InteriorPage pageKey="agriculture" />,
});
