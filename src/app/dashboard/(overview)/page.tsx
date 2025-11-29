import { StatsCards } from '@/components/dashboard/stats-cards';
import RevenueChart from '@/components/dashboard/revenue-chart';
import LatestInvoices from '@/components/dashboard/latest-invoices';
import { displayFont } from '@/config/fonts';
import { fetchCardData, fetchRevenue, fetchLatestInvoices } from '@/lib/data';
import { RevenueChartSkeleton, LatestInvoicesSkeleton } from './loading';
import { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function Page() {
  const { totalPaidInvoices, totalPendingInvoices, numberOfInvoices, numberOfCustomers } = await fetchCardData();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>
      <StatsCards
        totalPaidInvoices={totalPaidInvoices}
        totalPendingInvoices={totalPendingInvoices}
        numberOfInvoices={numberOfInvoices}
        numberOfCustomers={numberOfCustomers}
      />
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}