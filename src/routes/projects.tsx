import { createFileRoute } from "@tanstack/react-router";
import { InteriorPage } from "@/components/portal-ui";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects & Initiatives | Aaple Gaon Gram Panchayat" },
      { name: "description", content: "See completed, ongoing and proposed village development work with transparent costs and timelines." },
    ],
  }),
  component: () => <InteriorPage pageKey="projects" />,
});
