import { createFileRoute } from "@tanstack/react-router";
import { WeddingInvitation } from "@/components/wedding/WeddingInvitation";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Rajnish & Kavita — Wedding Invitation" },
      { name: "description", content: "Join Rajnish and Kavita for their wedding celebrations at Zestin Banquets, Ghaziabad, 29 Nov – 2 Dec 2026." },
      { property: "og:title", content: "Rajnish weds Kavita — 1 December 2026" },
      { property: "og:description", content: "With joyful hearts, we invite you to celebrate our wedding in Ghaziabad." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() {
  return <WeddingInvitation />;
}
