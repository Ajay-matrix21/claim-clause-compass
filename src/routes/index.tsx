import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, FileUp, ScanSearch, FileSignature, BookOpenCheck, GitCompare, PenLine, Lock, ShieldCheck, EyeOff } from "lucide-react";
import { SiteHeader, SiteFooter, ButtonLink, Card, IconBadge } from "@/components/brand";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ClaimGuard AI — Understand Your Insurance Claim Rejection" },
      { name: "description", content: "Compare rejection letters, policy wording and hospital documents to understand your claim and prepare an appeal." },
      { property: "og:title", content: "ClaimGuard AI — Clear Claim Explanations" },
      { property: "og:description", content: "Compare rejection letters, policy wording and hospital documents to prepare your appeal." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const steps = [
  { icon: FileUp, title: "Upload Documents", text: "Add your rejection letter, policy wording and hospital records." },
  { icon: ScanSearch, title: "Review AI Analysis", text: "See how the stated reason compares against your policy and evidence." },
  { icon: FileSignature, title: "Prepare Your Appeal", text: "Get a structured starting point for a well-supported appeal." },
];
const features = [
  { icon: BookOpenCheck, title: "Policy Clause Matching", text: "Locates the policy clauses relevant to the insurer's stated rejection reason." },
  { icon: GitCompare, title: "Evidence Comparison", text: "Cross-checks hospital documents against the claims made in the rejection letter." },
  { icon: PenLine, title: "Appeal Drafting", text: "Helps you organise facts and references into a clear appeal letter draft." },
];
const privacy = [
  { icon: Lock, title: "Your documents stay yours", text: "Files are used only to explain your claim." },
  { icon: EyeOff, title: "No selling of data", text: "We never share your health information with third parties." },
  { icon: ShieldCheck, title: "Guidance, not a verdict", text: "Explanations support your decisions — always confirm with your insurer." },
];

function Index() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <section className="mx-auto max-w-6xl px-4 py-20 text-center md:py-28">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
            <ShieldCheck className="size-3.5" /> Health insurance claim clarity
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-primary md:text-6xl">
            Your Insurance Claim Deserves a Clear Explanation.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Explore a fictional example of a rejection letter, policy wording and hospital documents compared side by side.
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-secondary">DEMO — FICTIONAL SAMPLE DATA. Documents are not processed or uploaded.</p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink to="/upload">Analyze My Claim <ArrowRight className="size-4" /></ButtonLink>
            <ButtonLink href="#how-it-works" variant="outline">How It Works</ButtonLink>
          </div>
        </section>

        <section id="how-it-works" className="scroll-mt-20 mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-center text-3xl font-semibold text-primary">How It Works</h2>
          <p className="mt-3 text-center text-muted-foreground">Three steps from confusion to a clear next move.</p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <Card key={s.title}>
                <div className="flex items-center justify-between">
                  <IconBadge><s.icon className="size-5" /></IconBadge>
                  <span className="text-sm font-medium text-muted-foreground">Step {i + 1}</span>
                </div>
                <h3 className="mt-5 font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              </Card>
            ))}
          </div>
        </section>

        <section id="features" className="scroll-mt-20 mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-center text-3xl font-semibold text-primary">Features</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {features.map((f) => (
              <Card key={f.title}>
                <IconBadge><f.icon className="size-5" /></IconBadge>
                <h3 className="mt-5 font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
              </Card>
            ))}
          </div>
        </section>

        <section id="privacy" className="mx-auto max-w-6xl px-4 py-16">
          <div className="rounded-3xl bg-primary p-8 text-primary-foreground md:p-12">
            <h2 className="text-3xl font-semibold">Privacy and safety first</h2>
            <p className="mt-3 max-w-2xl text-primary-foreground/70">Medical and insurance documents are sensitive. We treat them that way.</p>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {privacy.map((p) => (
                <div key={p.title} className="rounded-2xl bg-primary-foreground/5 p-5 ring-1 ring-primary-foreground/10">
                  <p.icon className="size-5" />
                  <h3 className="mt-4 font-medium">{p.title}</h3>
                  <p className="mt-1 text-sm text-primary-foreground/70">{p.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-8"><ButtonLink to="/upload" className="bg-card text-primary hover:bg-card/90">Start Analysis</ButtonLink></div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
