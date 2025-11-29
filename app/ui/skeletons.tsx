import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function CardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 space-y-0 p-4">
        <Skeleton className="h-5 w-5 rounded-md" />
        <Skeleton className="h-6 w-16 rounded-md" />
      </CardHeader>
      <CardContent className="flex items-center justify-center px-4 py-8">
        <Skeleton className="h-7 w-20 rounded-md" />
      </CardContent>
    </Card>
  );
}

export function CardsSkeleton() {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  );
}

export function RevenueChartSkeleton() {
  return (
    <Card className="w-full md:col-span-4">
      <CardHeader>
        <Skeleton className="h-8 w-36 rounded-md" />
      </CardHeader>
      <CardContent>
        <div className="sm:grid-cols-13 mt-0 grid h-[410px] grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
          {/* Chart bars placeholders - keeping it simple with just the container or maybe some bars? 
               The original had a single div with grid class. Let's replicate that but maybe with Skeletons inside if needed.
               Actually original was: <div className="... grid ... bg-white ..." /> which is empty.
               Let's just use a Skeleton for the chart area or keep the div structure but use Skeleton for the axis/labels.
           */}
          <Skeleton className="h-full w-full rounded-md bg-gray-100" />
        </div>
        <div className="flex items-center pb-2 pt-6">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="ml-2 h-4 w-20 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
}

export function InvoiceSkeleton() {
  return (
    <div className="flex flex-row items-center justify-between border-b border-gray-100 py-4">
      <div className="flex items-center">
        <Skeleton className="mr-2 h-8 w-8 rounded-full" />
        <div className="min-w-0">
          <Skeleton className="h-5 w-40 rounded-md" />
          <Skeleton className="mt-2 h-4 w-12 rounded-md" />
        </div>
      </div>
      <Skeleton className="mt-2 h-4 w-12 rounded-md" />
    </div>
  );
}

export function LatestInvoicesSkeleton() {
  return (
    <Card className="flex w-full flex-col md:col-span-4">
      <CardHeader>
        <Skeleton className="h-8 w-36 rounded-md" />
      </CardHeader>
      <CardContent className="flex grow flex-col justify-between">
        <div className="bg-white px-6">
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
        </div>
        <div className="flex items-center pb-2 pt-6">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="ml-2 h-4 w-20 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardSkeleton() {
  return (
    <>
      <Skeleton className="mb-4 h-8 w-36 rounded-md" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChartSkeleton />
        <LatestInvoicesSkeleton />
      </div>
    </>
  );
}

export function TableRowSkeleton() {
  return (
    <TableRow className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      {/* Customer Name and Image */}
      <TableCell className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-md" />
        </div>
      </TableCell>
      {/* Email */}
      <TableCell className="whitespace-nowrap px-3 py-3">
        <Skeleton className="h-6 w-32 rounded-md" />
      </TableCell>
      {/* Amount */}
      <TableCell className="whitespace-nowrap px-3 py-3">
        <Skeleton className="h-6 w-16 rounded-md" />
      </TableCell>
      {/* Date */}
      <TableCell className="whitespace-nowrap px-3 py-3">
        <Skeleton className="h-6 w-16 rounded-md" />
      </TableCell>
      {/* Status */}
      <TableCell className="whitespace-nowrap px-3 py-3">
        <Skeleton className="h-6 w-16 rounded-md" />
      </TableCell>
      {/* Actions */}
      <TableCell className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          <Skeleton className="h-[38px] w-[38px] rounded-md" />
          <Skeleton className="h-[38px] w-[38px] rounded-md" />
        </div>
      </TableCell>
    </TableRow>
  );
}

export function InvoicesMobileSkeleton() {
  return (
    <Card className="mb-2 w-full p-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-8">
        <div className="flex items-center">
          <Skeleton className="mr-2 h-8 w-8 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-md" />
        </div>
        <Skeleton className="h-6 w-16 rounded-md" />
      </div>
      <div className="flex w-full items-center justify-between pt-4">
        <div>
          <Skeleton className="h-6 w-16 rounded-md" />
          <Skeleton className="mt-2 h-6 w-24 rounded-md" />
        </div>
        <div className="flex justify-end gap-2">
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-10 w-10 rounded-md" />
        </div>
      </div>
    </Card>
  );
}

export function InvoicesTableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
          </div>
          <Table className="hidden min-w-full text-gray-900 md:table">
            <TableHeader className="rounded-lg text-left text-sm font-normal">
              <TableRow>
                <TableHead className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </TableHead>
                <TableHead className="px-3 py-5 font-medium">
                  Email
                </TableHead>
                <TableHead className="px-3 py-5 font-medium">
                  Amount
                </TableHead>
                <TableHead className="px-3 py-5 font-medium">
                  Date
                </TableHead>
                <TableHead className="px-3 py-5 font-medium">
                  Status
                </TableHead>
                <TableHead className="relative pb-4 pl-3 pr-6 pt-2 sm:pr-6">
                  <span className="sr-only">Edit</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white">
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
