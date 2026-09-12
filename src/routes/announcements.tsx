import { createFileRoute } from "@tanstack/react-router";
import { InteriorPage } from "@/components/portal-ui";

export const Route = createFileRoute("/announcements")({
  head: () => ({
    meta: [
      { title: "Announcements & Public Records | Aaple Gaon Gram Panchayat" },
      { name: "description", content: "Gram Sabha notices, circulars, office orders, village health camps and official downloadable forms." },
    ],
  }),
  component: () => <InteriorPage pageKey="announcements" />,
});
