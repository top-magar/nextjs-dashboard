import Search from '@/components/search';
import { displayFont } from '@/config/fonts';
import { fetchFilteredInvoices, fetchInvoicesPages } from '@/lib/data';
import type { InvoicesTable as InvoicesTableType } from '@/lib/definitions';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { CheckIcon, ClockIcon, PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import {
  formatDateToLocal,
  formatCurrency,
  generatePagination,
} from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import clsx from 'clsx';

export const metadata: Metadata = {
  title: 'Invoices',
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages(query);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams();
    if (query) params.set('query', query);
    params.set('page', pageNumber.toString());
    return `/dashboard/invoices?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${displayFont.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <Button asChild className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
          <Link href="/dashboard/invoices/create">
            <span className="hidden md:block">Create Invoice</span>{' '}
            <PlusIcon className="h-5 md:ml-4" />
          </Link>
        </Button>
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <InvoicesTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={createPageURL(currentPage - 1)}
                aria-disabled={currentPage <= 1}
                className={currentPage <= 1 ? "pointer-events-none opacity-50" : undefined}
              />
            </PaginationItem>
            {allPages.map((page: number | string, index: number) => {
              let position: 'first' | 'last' | 'single' | 'middle' | undefined;

              if (index === 0) position = 'first';
              if (index === allPages.length - 1) position = 'last';
              if (allPages.length === 1) position = 'single';
              if (page === '...') position = 'middle';

              return (
                <PaginationItem key={`${page}-${index}`}>
                  {position === 'middle' ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      href={createPageURL(page)}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  )}
                </PaginationItem>
              );
            })}
            <PaginationItem>
              <PaginationNext
                href={createPageURL(currentPage + 1)}
                aria-disabled={currentPage >= totalPages}
                className={currentPage >= totalPages ? "pointer-events-none opacity-50" : undefined}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

import { InvoiceActions } from '@/components/invoices/actions';

async function InvoicesTable({
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
            {invoices?.map((invoice: InvoicesTableType) => (
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
                  <InvoiceActions id={invoice.id} />
                </CardContent>
              </Card>
            ))}
          </div>
          <Table className="hidden min-w-full text-gray-900 md:table">
            <TableHeader className="rounded-lg text-left text-sm font-normal">
              <TableRow className="hover:bg-transparent border-b">
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
              {invoices?.map((invoice: InvoicesTableType) => (
                <TableRow
                  key={invoice.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none hover:bg-muted/50"
                >
                  <TableCell className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-7 w-7">
                        <AvatarImage src={invoice.image_url} alt={`${invoice.name}'s profile picture`} />
                        <AvatarFallback>{invoice.name[0]}</AvatarFallback>
                      </Avatar>
                      <p className="font-medium">{invoice.name}</p>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-3 py-3 text-muted-foreground">
                    {invoice.email}
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(invoice.amount)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-3 py-3 text-muted-foreground">
                    {formatDateToLocal(invoice.date)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-3 py-3">
                    <InvoiceStatus status={invoice.status} />
                  </TableCell>
                  <TableCell className="whitespace-nowrap py-3 pl-6 pr-3">
                    <InvoiceActions id={invoice.id} />
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

function InvoiceStatus({ status }: { status: string }) {
  return (
    <Badge
      className={clsx(
        'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
        {
          'bg-gray-50 text-gray-600 ring-gray-500/10': status === 'pending',
          'bg-green-50 text-green-700 ring-green-600/20': status === 'paid',
        },
      )}
      variant="outline"
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
          <CheckIcon className="ml-1 w-4 text-green-600" />
        </>
      ) : null}
    </Badge>
  );
}

function TableRowSkeleton() {
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

function InvoicesMobileSkeleton() {
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

function InvoicesTableSkeleton() {
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