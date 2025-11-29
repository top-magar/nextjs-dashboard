import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Badge } from '@/components/ui/badge';

export default function InvoiceStatus({ status }: { status: string }) {
  return (
    <Badge
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500 hover:bg-gray-100': status === 'pending',
          'bg-green-500 text-white hover:bg-green-500': status === 'paid',
        },
      )}
      variant={status === 'pending' ? 'secondary' : 'default'}
    >
      {status === 'pending' ? (
        <>
          Pending
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'paid' ? (
        <>
          Paid
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </Badge>
  );
}
