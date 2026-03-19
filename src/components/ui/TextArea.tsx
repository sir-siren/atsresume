import * as React from "react";

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, label, ...props }, ref) => {
    const id = React.useId();
    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label htmlFor={id} className="text-sm text-muted-grey font-medium">
            {label}
          </label>
        )}
        <textarea
          id={id}
          ref={ref}
          className={`flex min-h-[80px] w-full rounded-md border border-border-grey bg-input-bg px-3 py-2 text-sm text-foreground placeholder:text-muted-grey focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground disabled:cursor-not-allowed disabled:opacity-50 resize-y transition-colors ${className || ""}`}
          {...props}
        />
      </div>
    );
  }
);
TextArea.displayName = "TextArea";
