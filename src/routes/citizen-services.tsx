import { createFileRoute } from "@tanstack/react-router";
import { InteriorPage } from "@/components/portal-ui";

export const Route = createFileRoute("/citizen-services")({
  head: () => ({
    meta: [
      { title: "Citizen Services & Portal | Aaple Gaon Gram Panchayat" },
      { name: "description", content: "Certificates, village tax payments, grievances, application tracking and official downloadable forms." },
    ],
  }),
  component: () => <InteriorPage pageKey="citizen-services" />,
});
