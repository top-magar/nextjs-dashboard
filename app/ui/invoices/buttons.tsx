import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteInvoice } from '@/app/lib/actions';
import { Button } from '@/components/ui/button';

export function CreateInvoice() {
  return (
    <Button asChild className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
      <Link href="/dashboard/invoices/create">
        <span className="hidden md:block">Create Invoice</span>{' '}
        <PlusIcon className="h-5 md:ml-4" />
      </Link>
    </Button>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Button asChild variant="outline" size="icon" className="rounded-md border p-2 hover:bg-gray-100">
      <Link href={`/dashboard/invoices/${id}/edit`}>
        <PencilIcon className="w-5" />
      </Link>
    </Button>
  );
}

export function DeleteInvoice({ id }: { id: string }) {
  const deleteInvoiceWithId = async () => {
    'use server';
    await deleteInvoice(id);
  };
  return (
    <form action={deleteInvoiceWithId}>
      <Button variant="outline" size="icon" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </Button>
    </form>
  );
}
