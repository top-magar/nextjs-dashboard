import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return <DashboardSkeleton />
}

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

export function RevenueChartSkeleton() {
  return (
    <Card className="w-full md:col-span-4">
      <CardHeader>
        <Skeleton className="h-8 w-36 rounded-md" />
      </CardHeader>
      <CardContent>
        <div className="sm:grid-cols-13 mt-0 grid h-[410px] grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
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

function DashboardSkeleton() {
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