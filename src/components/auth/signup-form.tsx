'use client';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useActionState } from 'react';
import { AlertCircle } from 'lucide-react';
import Link from "next/link";

// TODO: Implement actual signup action
async function signup(prevState: string | undefined, formData: FormData) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return 'Signup is not implemented yet.';
}

export function SignupForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"form">) {
    const [errorMessage, formAction, isPending] = useActionState(
        signup,
        undefined,
    );

    return (
        <form className={cn("flex flex-col gap-6", className)} {...props} action={formAction}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create an account</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Enter your details below to create your account
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        required
                        minLength={6}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        required
                        minLength={6}
                    />
                </div>
                {errorMessage && (
                    <div className="flex items-center gap-2 text-sm text-destructive">
                        <AlertCircle className="h-4 w-4" />
                        <p>{errorMessage}</p>
                    </div>
                )}
                <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? 'Creating account...' : 'Sign Up'}
                </Button>
            </div>
            <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4 hover:text-primary">
                    Log in
                </Link>
            </div>
        </form>
    )
}
