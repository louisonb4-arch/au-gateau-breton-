import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "outline" | "light" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-bordeaux text-paper hover:bg-bordeaux-deep",
  outline: "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-paper",
  light: "bg-paper text-bordeaux hover:bg-cream",
  ghost: "border border-paper/30 text-paper hover:border-paper hover:bg-paper/10",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-[15px]",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", className = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

type ButtonLinkProps = ComponentProps<"a"> & { variant?: Variant; size?: Size; children: ReactNode };

export function ButtonLink({ variant, size, className, children, ...props }: ButtonLinkProps) {
  return (
    <a className={buttonClass(variant, size, className)} {...props}>
      {children}
    </a>
  );
}
