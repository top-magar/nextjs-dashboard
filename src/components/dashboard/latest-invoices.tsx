import { ArrowPathIcon } from '@heroicons/react/24/outline';

import { displayFont } from '@/config/fonts';
import { fetchLatestInvoices } from '@/lib/data';
import type { LatestInvoice } from '@/lib/definitions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

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
          <div className="bg-white rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-b">
                  <TableHead className="h-12 px-4 font-medium">Customer</TableHead>
                  <TableHead className="h-12 px-4 font-medium text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {latestInvoices.map((invoice: LatestInvoice) => {
                  return (
                    <TableRow
                      key={invoice.id}
                      className="hover:bg-muted/50 border-b last:border-0"
                    >
                      <TableCell className="p-4">
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
                      </TableCell>
                      <TableCell className="p-4 text-right">
                        <p
                          className={`${displayFont.className} truncate text-sm font-medium md:text-base`}
                        >
                          {invoice.amount}
                        </p>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
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
