import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, icon, ...props }, ref) => {
        const id = React.useId();
        return (
            <div className="flex flex-col gap-1 w-full">
                {label && (
                    <label
                        htmlFor={id}
                        className="text-sm text-muted-grey font-medium"
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    <input
                        id={id}
                        ref={ref}
                        className={`flex h-10 w-full rounded-md border border-border-grey bg-input-bg px-3 py-2 text-sm text-foreground file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-grey focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground disabled:cursor-not-allowed disabled:opacity-50 transition-colors ${className || ""}`}
                        {...props}
                    />
                    {icon && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-grey">
                            {icon}
                        </div>
                    )}
                </div>
            </div>
        );
    },
);
Input.displayName = "Input";
