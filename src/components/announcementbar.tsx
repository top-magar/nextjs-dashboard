import { StickyBanner } from "@/components/ui/sticky-banner";
 
export function AnnouncementBar() {
  return (
    <StickyBanner className="bg-gradient-to-b from-blue-500 to-blue-600">
      <p className="mx-0 max-w-[90%] text-white drop-shadow-md">
        Announcing $10M seed funding from project mayhem ventures.{" "}
        <a href="#" className="transition duration-200 hover:underline">
          Read announcement
        </a>
      </p>
    </StickyBanner>
  );
}
 