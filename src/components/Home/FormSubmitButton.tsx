"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

interface FormSubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function FormSubmitButton({
  children,

  ...props
}: FormSubmitButtonProps) {
  const { pending } = useFormStatus();
  //useFormStatus is designed for React Server Components,

  return (
    <Button {...props} disabled={props.disabled || pending}>
      <span className="flex items-center justify-center gap-1">
        {pending && <Loader2 size={16} className="animate-spin" />}
        {children}
      </span>
    </Button>
  );
}
