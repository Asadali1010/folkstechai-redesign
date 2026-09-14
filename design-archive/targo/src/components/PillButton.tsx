import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";

type PillButtonVariant = "primary" | "ghost" | "white";

type BaseProps = {
  variant?: PillButtonVariant;
  className?: string;
  children: ReactNode;
};

type AsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: never; to?: never };

type AsAnchor = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
    to?: never;
  };

type AsRouterLink = BaseProps &
  Omit<LinkProps, "to" | "className" | "children"> & {
    to: LinkProps["to"];
    href?: never;
  };

export type PillButtonProps = AsButton | AsAnchor | AsRouterLink;

const variantClasses: Record<PillButtonVariant, string> = {
  primary:
    "bg-electric-iris text-snow hover:brightness-110 active:brightness-95",
  ghost:
    "bg-transparent text-snow border border-slate-edge hover:border-smoke hover:bg-snow/5 active:bg-snow/10",
  white: "bg-snow text-void hover:bg-linen active:bg-frost",
};

const baseClasses =
  "inline-flex items-center justify-center gap-8 rounded-full px-24 py-12 text-body font-medium leading-body tracking-body transition-[filter,background-color,border-color] duration-150 whitespace-nowrap select-none " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-iris " +
  "disabled:opacity-40 disabled:pointer-events-none";

export function PillButton(props: PillButtonProps) {
  const { variant = "primary", className = "", children } = props;
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if ("to" in props && props.to !== undefined) {
    const { to, variant: _v, className: _c, children: _ch, ...rest } = props;
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  if ("href" in props && props.href !== undefined) {
    const { href, variant: _v, className: _c, children: _ch, ...rest } = props;
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  const { variant: _v, className: _c, children: _ch, ...rest } =
    props as AsButton;
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
