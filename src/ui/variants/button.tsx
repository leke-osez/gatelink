import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex scale-100 items-center justify-center rounded-sm text-sm font-medium ring-offset-background transition-[transform,background-color] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white hover:bg-inherit/80",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        error: "bg-error text-error-foreground hover:bg-error/80",
        warning:
          "bg-warning text-warning-foreground hover:bg-warning/80",
        info: "bg-info text-info-foreground hover:bg-info/80",
        success:
          "bg-success text-success-foreground hover:bg-success/80",
        outline:
          "border border-secondary bg-transparent hover:bg-secondary hover:text-secondary-foreground",
        ghost: "hover:bg-secondary hover:text-secondary-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        rounded: "rounded-full ",
        plain: "bg-transparent",
        comic: "rounded-es-[20%]",
      },
      size: {
        sm: "h-8  text-xs",
        md: "h-9 ",
        lg: "h-10 ",
        icon: "size-9",
      },
    },
    compoundVariants: [
      { variant: "link", size: "sm", className: "h-auto px-0" },
      { variant: "link", size: "md", className: "h-auto px-0" },
      { variant: "link", size: "lg", className: "h-auto px-0" },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);