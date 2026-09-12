import { createFileRoute } from "@tanstack/react-router";
import { InteriorPage } from "@/components/portal-ui";

export const Route = createFileRoute("/education")({
  head: () => ({
    meta: [
      { title: "Education & Youth Corner | Aaple Gaon Gram Panchayat" },
      { name: "description", content: "Schools, Anganwadis, scholarships, career guidance, youth initiatives and inspiring village achievements." },
    ],
  }),
  component: () => <InteriorPage pageKey="education" />,
});
