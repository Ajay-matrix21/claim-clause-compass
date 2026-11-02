import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, BookOpenCheck, GitCompare, PenLine } from "lucide-react";
import { SiteHeader, SiteFooter, Card, IconBadge, ButtonLink } from "@/components/brand";

export const Route = createFileRoute("/results")({
  head: () => ({
    meta: [
      { title: "Sample Analysis — ClaimGuard AI" },
      { name: "description", content: "A fictional sample claim analysis demonstrating ClaimGuard AI." },
      { property: "og:title", content: "Sample Analysis — ClaimGuard AI" },
      { property: "og:description", content: "A fictional sample claim analysis demonstrating ClaimGuard AI." },
    ],
  }),
  component: Results,
});

// FICTIONAL DEMO DATA — not derived from any uploaded document.
const DEMO = [
  { icon: BookOpenCheck, title: "Policy Clause Matching (demo)", text: "Fictional example: the rejection cites a 'pre-existing condition' exclusion. A sample policy clause defines this as a condition diagnosed within 48 months before cover began." },
  { icon: GitCompare, title: "Evidence Comparison (demo)", text: "Fictional example: the sample discharge summary records a first diagnosis date after cover began, which would need to be checked against the insurer's reasoning." },
  { icon: PenLine, title: "Appeal Points (demo)", text: "Fictional example: an appeal might reference the diagnosis date and request the insurer's evidence for the pre-existing condition finding." },
];

function Results() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-14">
        <div role="note" className="flex items-start gap-3 rounded-xl border border-warning/40 bg-warning/10 p-4 text-sm">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-warning" />
          <p><strong>Sample analysis only.</strong> This page shows fictional demo data. It is not a real analysis of your documents and not a real insurance decision.</p>
        </div>
        <h1 className="mt-8 text-3xl font-semibold tracking-tight text-primary">Sample claim analysis</h1>
        <p className="mt-2 text-muted-foreground">Demo patient · Demo Insurer Ltd · Claim #DEMO-0001</p>
        <div className="mt-8 grid gap-5">
          {DEMO.map((d) => (
            <Card key={d.title} className="flex gap-4">
              <IconBadge><d.icon className="size-5" /></IconBadge>
              <div>
                <h2 className="font-semibold">{d.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{d.text}</p>
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-8"><ButtonLink to="/upload" variant="outline">Back to upload</ButtonLink></div>
      </main>
      <SiteFooter />
    </div>
  );
}
