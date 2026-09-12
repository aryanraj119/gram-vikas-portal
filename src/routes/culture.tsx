import { createFileRoute } from "@tanstack/react-router";
import { InteriorPage } from "@/components/portal-ui";

export const Route = createFileRoute("/culture")({
  head: () => ({
    meta: [
      { title: "Village Culture & Heritage | Aaple Gaon Gram Panchayat" },
      { name: "description", content: "Discover our village history, festivals, traditions, homestays, virtual gallery and community voices." },
    ],
  }),
  component: () => <InteriorPage pageKey="culture" />,
});
