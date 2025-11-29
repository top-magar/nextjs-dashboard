import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
import InvoiceStatus from '@/app/ui/invoices/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredInvoices } from '@/app/lib/data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const invoices = await fetchFilteredInvoices(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {invoices?.map((invoice) => (
              <Card
                key={invoice.id}
                className="mb-2 w-full"
              >
                <CardHeader className="flex flex-row items-center justify-between border-b pb-4 p-4">
                  <div className="flex items-center">
                    <Avatar className="mr-2 h-7 w-7">
                      <AvatarImage src={invoice.image_url} alt={`${invoice.name}'s profile picture`} />
                      <AvatarFallback>{invoice.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{invoice.name}</p>
                      <p className="text-sm text-gray-500">{invoice.email}</p>
                    </div>
                  </div>
                  <InvoiceStatus status={invoice.status} />
                </CardHeader>
                <CardContent className="flex w-full items-center justify-between pt-4 p-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(invoice.amount)}
                    </p>
                    <p>{formatDateToLocal(invoice.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateInvoice id={invoice.id} />
                    <DeleteInvoice id={invoice.id} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Table className="hidden min-w-full text-gray-900 md:table">
            <TableHeader className="rounded-lg text-left text-sm font-normal">
              <TableRow>
                <TableHead scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </TableHead>
                <TableHead scope="col" className="px-3 py-5 font-medium">
                  Email
                </TableHead>
                <TableHead scope="col" className="px-3 py-5 font-medium">
                  Amount
                </TableHead>
                <TableHead scope="col" className="px-3 py-5 font-medium">
                  Date
                </TableHead>
                <TableHead scope="col" className="px-3 py-5 font-medium">
                  Status
                </TableHead>
                <TableHead scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white">
              {invoices?.map((invoice) => (
                <TableRow
                  key={invoice.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <TableCell className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-7 w-7">
                        <AvatarImage src={invoice.image_url} alt={`${invoice.name}'s profile picture`} />
                        <AvatarFallback>{invoice.name[0]}</AvatarFallback>
                      </Avatar>
                      <p>{invoice.name}</p>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-3 py-3">
                    {invoice.email}
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(invoice.amount)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(invoice.date)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-3 py-3">
                    <InvoiceStatus status={invoice.status} />
                  </TableCell>
                  <TableCell className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateInvoice id={invoice.id} />
                      <DeleteInvoice id={invoice.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
