'use client';

import { CustomerField } from '@/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { createInvoice, State } from '@/lib/actions';
import { useActionState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from '@/components/ui/card';

export default function Form({ customers }: { customers: CustomerField[] }) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createInvoice, initialState);
  return (
    <form action={formAction}>
      <Card className="p-4 md:p-6">
        <CardContent className="p-0">
          {/* Customer Name */}
          <div className="mb-4">
            <Label htmlFor="customer" className="mb-2 block">
              Choose customer
            </Label>
            <div className="relative">
              <Select name="customerId" defaultValue="">
                <SelectTrigger id="customer" className="w-full pl-10">
                  <SelectValue placeholder="Select a customer" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground" />
            </div>
            <div id="customer-error" aria-live="polite" aria-atomic="true">
              {state.errors?.customerId &&
                state.errors.customerId.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
                ))}
            </div>
          </div>

          {/* Invoice Amount */}
          <div className="mb-4">
            <Label htmlFor="amount" className="mb-2 block">
              Choose an amount
            </Label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  step="0.01"
                  placeholder="Enter USD amount"
                  className="pl-10"
                  aria-describedby="amount-error"
                />
                <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground peer-focus:text-foreground" />
              </div>
            </div>
            <div id="amount-error" aria-live="polite" aria-atomic="true">
              {state.errors?.amount &&
                state.errors.amount.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>

          {/* Invoice Status */}
          <fieldset>
            <legend className="mb-2 block text-sm font-medium">
              Set the invoice status
            </legend>
            <div className="rounded-md border border-border bg-card px-[14px] py-3">
              <RadioGroup name="status" defaultValue="pending" className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pending" id="pending" />
                  <Label
                    htmlFor="pending"
                    className="flex cursor-pointer items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground"
                  >
                    Pending <ClockIcon className="h-4 w-4" />
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paid" id="paid" />
                  <Label
                    htmlFor="paid"
                    className="flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                  >
                    Paid <CheckIcon className="h-4 w-4" />
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div id="status-error" aria-live="polite" aria-atomic="true">
              {state.errors?.status &&
                state.errors.status.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </fieldset>
        </CardContent>
      </Card>
      <div className="mt-6 flex justify-end gap-4">
        <Button variant="ghost" asChild>
          <Link href="/dashboard/invoices">
            Cancel
          </Link>
        </Button>
        <Button type="submit" className="bg-primary text-primary-foreground">Create Invoice</Button>
      </div>
    </form>
  );
}
