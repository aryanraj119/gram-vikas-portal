import { createFileRoute } from "@tanstack/react-router";
import { InteriorPage } from "@/components/portal-ui";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | Aaple Gaon Gram Panchayat" },
      { name: "description", content: "Understand our village history, elected body, responsibilities, office services and emergency support." },
    ],
  }),
  component: () => <InteriorPage pageKey="about" />,
});
