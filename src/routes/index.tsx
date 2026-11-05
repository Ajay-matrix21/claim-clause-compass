import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  FileUp,
  ScanSearch,
  FileSignature,
  BookOpenCheck,
  GitCompare,
  PenLine,
  Lock,
  ShieldCheck,
  EyeOff,
  FileText,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { SiteHeader, SiteFooter, ButtonLink, Card, IconBadge } from "@/components/brand";
import { Reveal } from "@/lib/reveal";

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

/** Decorative, clearly-labelled demo illustration built from CSS and icons. */
function AnalysisIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-md" aria-hidden>
      {/* Main glass document card */}
      <div className="glass-strong relative overflow-hidden rounded-2xl p-5 shadow-lift">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-secondary/90 text-secondary-foreground">
            <FileText className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">Claim analysis</p>
            <p className="text-xs text-white/60">Sample preview</p>
          </div>
          <span className="rounded-full border border-warning/50 bg-warning/15 px-2.5 py-0.5 text-[11px] font-medium text-warning">
            Demo
          </span>
        </div>
        {/* Skeleton document lines */}
        <div className="mt-5 space-y-2.5">
          <div className="h-2.5 w-11/12 rounded-full bg-white/15" />
          <div className="h-2.5 w-9/12 rounded-full bg-white/15" />
          <div className="h-2.5 w-10/12 rounded-full bg-white/15" />
          <div className="h-2.5 w-7/12 rounded-full bg-white/15" />
        </div>
        <div className="mt-5 flex items-center gap-2 rounded-xl bg-white/8 p-3 ring-1 ring-white/10">
          <Sparkles className="size-4 shrink-0 text-lavender" />
          <p className="text-xs leading-relaxed text-white/75">
            Comparing the rejection reason against policy clauses and medical evidence…
          </p>
        </div>
        <div className="scan-line" />
      </div>

      {/* Floating finding chips */}
      <div className="float-soft absolute -left-3 -top-5 flex items-center gap-2 rounded-xl bg-card px-3 py-2 text-xs font-medium text-foreground shadow-lift sm:-left-8">
        <BookOpenCheck className="size-4 text-lavender" />
        Clause 4.2 matched
      </div>
      <div className="float-soft-delayed absolute -right-3 top-1/3 flex items-center gap-2 rounded-xl bg-card px-3 py-2 text-xs font-medium text-foreground shadow-lift sm:-right-8">
        <CheckCircle2 className="size-4 text-teal" />
        Evidence verified
      </div>
      <div className="float-soft absolute -bottom-5 left-8 flex items-center gap-2 rounded-xl bg-card px-3 py-2 text-xs font-medium text-foreground shadow-lift" style={{ animationDelay: "-1.5s" }}>
        <AlertTriangle className="size-4 text-warning" />
        1 conflict to review
      </div>
    </div>
  );
}

function Index() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        {/* Hero */}
        <section
          className="bg-hero relative overflow-hidden"
          onPointerMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
            e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
          }}
        >
          <div className="hero-grid pointer-events-none absolute inset-0" />
          <div className="hero-spotlight pointer-events-none absolute inset-0" />
          <div className="orb orb-blue left-[-10%] top-[-20%] size-[34rem]" />
          <div className="orb orb-lavender right-[-8%] top-[10%] size-[28rem]" />
          <div className="orb orb-teal bottom-[-30%] left-[30%] size-[30rem]" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 py-20 md:py-28 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/85 ring-1 ring-white/15">
                <ShieldCheck className="size-3.5 text-teal" /> Health insurance claim clarity
              </span>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white md:text-6xl md:leading-[1.05]">
                Your Insurance Claim Deserves a{" "}
                <span className="bg-gradient-to-r from-teal via-lavender to-teal bg-clip-text text-transparent">
                  Clear Explanation.
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70 lg:mx-0">
                Explore a fictional example of a rejection letter, policy wording and hospital documents compared side by side.
              </p>
              <p className="mx-auto mt-3 max-w-2xl text-sm font-medium text-warning lg:mx-0">
                DEMO — FICTIONAL SAMPLE DATA. Documents are not processed or uploaded.
              </p>
              <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <ButtonLink to="/upload" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  Analyze My Claim <ArrowRight className="size-4" />
                </ButtonLink>
                <ButtonLink href="#how-it-works" variant="outline" className="border-white/25 bg-white/5 text-white hover:bg-white/10">
                  How It Works
                </ButtonLink>
              </div>
            </div>
            <AnalysisIllustration />
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20">
          <Reveal className="text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-primary">How It Works</h2>
            <p className="mt-3 text-muted-foreground">Three steps from confusion to a clear next move.</p>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 120}>
                <Card className="h-full transition-shadow duration-300 hover:shadow-lift">
                  <div className="flex items-center justify-between">
                    <IconBadge><s.icon className="size-5" /></IconBadge>
                    <span className="text-sm font-medium text-muted-foreground">Step {i + 1}</span>
                  </div>
                  <h3 className="mt-5 font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20">
          <Reveal className="text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-primary">Features</h2>
            <p className="mt-3 text-muted-foreground">Built to make claim decisions readable.</p>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 120}>
                <Card className="h-full transition-shadow duration-300 hover:shadow-lift">
                  <IconBadge><f.icon className="size-5" /></IconBadge>
                  <h3 className="mt-5 font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Privacy */}
        <section id="privacy" className="mx-auto max-w-6xl px-4 py-20">
          <Reveal>
            <div className="bg-hero relative overflow-hidden rounded-3xl p-8 text-primary-foreground md:p-12">
              <div className="orb orb-lavender right-[-10%] top-[-30%] size-[22rem]" />
              <div className="relative">
                <h2 className="text-3xl font-semibold">Privacy and safety first</h2>
                <p className="mt-3 max-w-2xl text-white/70">Medical and insurance documents are sensitive. We treat them that way.</p>
                <div className="mt-8 grid gap-6 md:grid-cols-3">
                  {privacy.map((p) => (
                    <div key={p.title} className="glass rounded-2xl p-5">
                      <p.icon className="size-5 text-teal" />
                      <h3 className="mt-4 font-medium">{p.title}</h3>
                      <p className="mt-1 text-sm text-white/70">{p.text}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <ButtonLink to="/upload" className="bg-card text-primary hover:bg-card/90">Start Analysis</ButtonLink>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
