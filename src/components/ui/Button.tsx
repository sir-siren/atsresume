import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger" | "ghost";
    size?: "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", ...props }, ref) => {
        let variantStyles = "";
        switch (variant) {
            case "primary":
                variantStyles =
                    "bg-foreground text-background hover:bg-muted-grey";
                break;
            case "secondary":
                variantStyles =
                    "bg-input-bg text-foreground border border-border-grey hover:bg-border-grey";
                break;
            case "danger":
                variantStyles =
                    "bg-red-900/50 text-red-200 border border-red-900 hover:bg-red-900";
                break;
            case "ghost":
                variantStyles =
                    "bg-transparent text-foreground hover:bg-border-grey";
                break;
        }

        let sizeStyles = "";
        switch (size) {
            case "sm":
                sizeStyles = "h-8 px-3 text-xs";
                break;
            case "md":
                sizeStyles = "h-10 px-4 py-2";
                break;
            case "lg":
                sizeStyles = "h-12 px-8 text-lg";
                break;
            case "icon":
                sizeStyles = "h-10 w-10 p-2 flex items-center justify-center";
                break;
        }

        return (
            <button
                ref={ref}
                className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground disabled:pointer-events-none disabled:opacity-50 ${variantStyles} ${sizeStyles} ${className || ""}`}
                {...props}
            />
        );
    },
);
Button.displayName = "Button";
