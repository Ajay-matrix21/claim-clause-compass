import { Link } from "@tanstack/react-router";
import { ShieldCheck, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 font-semibold text-primary">
      <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
        <ShieldCheck className="size-4" />
      </span>
      ClaimGuard <span className="text-secondary">AI</span>
    </Link>
  );
}

export function ButtonLink({
  to, href, children, variant = "primary", className,
}: { to?: "/upload" | "/"; href?: string; children: ReactNode; variant?: "primary" | "outline"; className?: string }) {
  const cls = cn(
    "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    variant === "primary"
      ? "bg-primary text-primary-foreground hover:bg-primary/90"
      : "border bg-card text-foreground hover:bg-accent",
    className,
  );
  return to ? <Link to={to} className={cls}>{children}</Link> : <a href={href} className={cls}>{children}</a>;
}

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("rounded-2xl border bg-card p-6 shadow-card", className)}>{children}</div>;
}

export function IconBadge({ children }: { children: ReactNode }) {
  return <div className="grid size-11 place-items-center rounded-xl bg-accent text-accent-foreground">{children}</div>;
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "/#how-it-works", label: "How It Works" },
    { href: "/#features", label: "Features" },
  ];
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-foreground">{l.label}</a>
          ))}
          <ButtonLink to="/upload">Start Analysis</ButtonLink>
        </nav>
        <button className="md:hidden" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="flex flex-col gap-4 border-t px-4 py-4 md:hidden">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm">{l.label}</a>
          ))}
          <ButtonLink to="/upload">Start Analysis</ButtonLink>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-3 text-sm text-muted-foreground">
            Clear explanations of insurance claim decisions.
          </p>
        </div>
        <div className="grid gap-6 text-sm sm:grid-cols-3">
          <div id="about"><p className="font-medium">About</p><p className="mt-2 text-muted-foreground">Helping patients understand claim rejections.</p></div>
          <div id="disclaimer"><p className="font-medium">Disclaimer</p><p className="mt-2 text-muted-foreground">Not legal or medical advice. Always verify with your insurer.</p></div>
          <div id="contact"><p className="font-medium">Contact</p><p className="mt-2 text-muted-foreground">hello@claimguard.ai</p></div>
        </div>
      </div>
      <p className="border-t py-4 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} ClaimGuard AI</p>
    </footer>
  );
}
