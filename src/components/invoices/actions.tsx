'use client';

import { Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { deleteInvoice } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

export function InvoiceActions({ id }: { id: string }) {
    const deleteInvoiceWithId = async () => {
        await deleteInvoice(id);
    };

    return (
        <div className="flex items-center justify-end gap-2">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-muted"
                            asChild
                        >
                            <Link href={`/dashboard/invoices/${id}/edit`}>
                                <Pencil className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                            </Link>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Edit Invoice</TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <form action={deleteInvoiceWithId}>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                            >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                            </Button>
                        </form>
                    </TooltipTrigger>
                    <TooltipContent>Delete Invoice</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
}
