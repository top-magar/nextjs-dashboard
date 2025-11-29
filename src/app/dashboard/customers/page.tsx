import { Metadata } from 'next';
import { fetchFilteredCustomers } from '@/lib/data';
import { displayFont } from '@/config/fonts';
import Search from '@/components/search';
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
import { CustomersTableType } from '@/lib/definitions';

export const metadata: Metadata = {
  title: 'Customers',
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const customers = await fetchFilteredCustomers(query);

  return (
    <div className="w-full">
      <h1 className={`${displayFont.className} mb-8 text-xl md:text-2xl`}>
        Customers
      </h1>
      <Search placeholder="Search customers..." />
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {customers?.map((customer: CustomersTableType) => (
                  <Card
                    key={customer.id}
                    className="mb-2 w-full"
                  >
                    <CardHeader className="flex flex-row items-center justify-between border-b pb-4 p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-7 w-7">
                          <AvatarImage src={customer.image_url} alt={`${customer.name}'s profile picture`} />
                          <AvatarFallback>{customer.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-sm text-gray-500">{customer.email}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex w-full items-center justify-between pt-4 p-4">
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Pending</p>
                        <p className="font-medium">{customer.total_pending}</p>
                      </div>
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Paid</p>
                        <p className="font-medium">{customer.total_paid}</p>
                      </div>
                    </CardContent>
                    <div className="px-4 pb-4 text-sm">
                      <p>{customer.total_invoices} invoices</p>
                    </div>
                  </Card>
                ))}
              </div>
              <Table className="hidden min-w-full text-gray-900 md:table">
                <TableHeader className="rounded-lg text-left text-sm font-normal">
                  <TableRow>
                    <TableHead scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Name
                    </TableHead>
                    <TableHead scope="col" className="px-3 py-5 font-medium">
                      Email
                    </TableHead>
                    <TableHead scope="col" className="px-3 py-5 font-medium">
                      Total Invoices
                    </TableHead>
                    <TableHead scope="col" className="px-3 py-5 font-medium">
                      Total Pending
                    </TableHead>
                    <TableHead scope="col" className="px-4 py-5 font-medium">
                      Total Paid
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody className="bg-white">
                  {customers.map((customer: CustomersTableType) => (
                    <TableRow key={customer.id} className="group">
                      <TableCell className="whitespace-nowrap py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-7 w-7">
                            <AvatarImage src={customer.image_url} alt={`${customer.name}'s profile picture`} />
                            <AvatarFallback>{customer.name[0]}</AvatarFallback>
                          </Avatar>
                          <p>{customer.name}</p>
                        </div>
                      </TableCell>
                      <TableCell className="whitespace-nowrap px-4 py-5 text-sm">
                        {customer.email}
                      </TableCell>
                      <TableCell className="whitespace-nowrap px-4 py-5 text-sm">
                        {customer.total_invoices}
                      </TableCell>
                      <TableCell className="whitespace-nowrap px-4 py-5 text-sm">
                        {customer.total_pending}
                      </TableCell>
                      <TableCell className="whitespace-nowrap px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                        {customer.total_paid}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}