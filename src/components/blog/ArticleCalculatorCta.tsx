import { Link } from "@tanstack/react-router";

interface ArticleCalculatorCtaProps {
  title: string;
  body: string;
  label: string;
}

export default function ArticleCalculatorCta({ title, body, label }: ArticleCalculatorCtaProps) {
  return (
    <aside
      className="my-8 rounded-2xl border border-primary/25 bg-primary/10 px-5 py-5 sm:px-6"
      aria-label="ATM cost calculator"
    >
      <p className="font-display text-base font-semibold text-foreground">{title}</p>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
      <Link
        to="/"
        className="mt-4 inline-flex items-center rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground no-underline transition-opacity hover:opacity-90"
      >
        {label}
      </Link>
    </aside>
  );
}
