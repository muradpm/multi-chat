"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/components/ui/button";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { signIn } = useAuthActions();

  return (
    <div className={className} {...props}>
      <Button
        variant="outline"
        onClick={() => void signIn("google", { redirectTo: "/" })}
        className="w-full"
      >
        Sign up with Google
      </Button>
    </div>
  );
}
