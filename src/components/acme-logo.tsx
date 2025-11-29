import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { displayFont } from '@/config/fonts';

export default function AcmeLogo({ className }: { className?: string }) {
  return (
    <div
      className={`${displayFont.className} flex flex-row items-center leading-none text-white ${className}`}
    >
      <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[44px]">Acme</p>
    </div>
  );
}
