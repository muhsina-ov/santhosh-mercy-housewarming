import { createFileRoute } from "@tanstack/react-router";
import { DoorReveal } from "@/components/invitation/DoorReveal";
import { InvitationCard } from "@/components/invitation/InvitationCard";

const title = "புதுமனை புகுவிழா | House Warming Invitation — 11.10.2026";
const description =
  "இறைவன் அருளால் புதிய இல்லம் — 11.10.2026 ஞாயிற்றுக்கிழமை, காலை 10.00 மணி, பைத்தூர், ஆத்தூர், சேலம். அன்புடன் அழைக்கிறோம்.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <DoorReveal>
      <InvitationCard />
    </DoorReveal>
  );
}
