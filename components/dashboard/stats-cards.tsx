import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, CreditCard, Users, Activity } from "lucide-react";

interface StatsCardsProps {
  totalPaidInvoices: string;
  totalPendingInvoices: string;
  numberOfInvoices: number;
  numberOfCustomers: number;
}

export function StatsCards({
  totalPaidInvoices,
  totalPendingInvoices,
  numberOfInvoices,
  numberOfCustomers,
}: StatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Collected</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalPaidInvoices}</div>
          <p className="text-xs text-muted-foreground">Total revenue collected</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalPendingInvoices}</div>
          <p className="text-xs text-muted-foreground">Awaiting payment</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{numberOfInvoices}</div>
          <p className="text-xs text-muted-foreground">All time invoices</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{numberOfCustomers}</div>
          <p className="text-xs text-muted-foreground">Active customers</p>
        </CardContent>
      </Card>
    </div>
  );
}