import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * Automatically handle id generation for label/input relationship.
 */
export function FormItem({
  children,
  label,
  error,
}: {
  children: (props: { id: string }) => React.ReactNode;
  label: string;
  error?: string;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className={cn(error && "text-destructive")}>{label}</label>
      {children({ id })}
      {error && <div className="text-destructive text-sm">{error}</div>}
    </div>
  );
}
