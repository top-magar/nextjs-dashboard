import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { displayFont } from '@/config/fonts';
import { fetchLatestInvoices } from '@/lib/data';
import type { LatestInvoice } from '@/lib/definitions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default async function LatestInvoices() {
  const latestInvoices = await fetchLatestInvoices();
  return (
    <Card className="flex w-full flex-col md:col-span-4">
      <CardHeader>
        <CardTitle className={`${displayFont.className} text-xl md:text-2xl`}>
          Latest Invoices
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
          <div className="bg-white px-6">
            {latestInvoices.map((invoice: LatestInvoice, i: number) => {
              return (
                <div
                  key={invoice.id}
                  className={clsx(
                    'flex flex-row items-center justify-between py-4',
                    {
                      'border-t': i !== 0,
                    },
                  )}
                >
                  <div className="flex items-center">
                    <Avatar className="mr-4 h-8 w-8">
                      <AvatarImage src={invoice.image_url} alt={`${invoice.name}'s profile picture`} />
                      <AvatarFallback>{invoice.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold md:text-base">
                        {invoice.name}
                      </p>
                      <p className="hidden text-sm text-gray-500 sm:block">
                        {invoice.email}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`${displayFont.className} truncate text-sm font-medium md:text-base`}
                  >
                    {invoice.amount}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="flex items-center pb-2 pt-6">
            <ArrowPathIcon className="h-5 w-5 text-gray-500" />
            <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
