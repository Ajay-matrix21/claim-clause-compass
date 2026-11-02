import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  Building2,
  ClipboardList,
  FileText,
  Quote,
  ScrollText,
  Stethoscope,
} from "lucide-react";
import { SiteHeader, SiteFooter, Card, ButtonLink } from "@/components/brand";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/results")({
  head: () => ({
    meta: [
      { title: "Sample Claim Analysis Report — ClaimGuard AI" },
      { name: "description", content: "A fictional sample insurance claim analysis demonstrating how ClaimGuard AI presents findings." },
      { property: "og:title", content: "Sample Claim Analysis Report — ClaimGuard AI" },
      { property: "og:description", content: "A fictional sample insurance claim analysis demonstrating how ClaimGuard AI presents findings." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Results,
});

/* ---------------------------------------------------------------------------
 * FICTIONAL DEMO DATA
 * Every value below is invented for demonstration only. Nothing here comes
 * from uploaded documents, real policies, real insurers or real regulation.
 * ------------------------------------------------------------------------- */

const DEMO_REPORT = {
  reference: "CG-DEMO-001",
  summary: {
    claimType: "Individual Health Insurance",
    claimStatus: "Rejected",
    insurerReason:
      "The hospitalisation took place within the policy's initial waiting period, which had not been completed on the date of admission.",
    assessment: "Potentially contestable",
    assessmentNote: "(sample scenario only)",
  },
  columns: [
    {
      key: "insurer",
      label: "A",
      title: "Insurer Says",
      icon: Building2,
      source: "Rejection letter (sample)",
      body: "“Your claim has been rejected as the hospitalisation falls within the initial waiting period of your policy, which had not been completed on the date of admission.”",
      note: "This is the stated reason taken from the sample rejection letter. It reflects only what the insurer wrote — not whether it is correct.",
      tone: "destructive" as const,
    },
    {
      key: "policy",
      label: "B",
      title: "Policy Says",
      icon: ScrollText,
      source: "Policy document, p. 12 (sample evidence)",
      body: "“Section 4.2 — Waiting Period: Benefits are payable only after the Insured Person has maintained continuous cover for twenty-four (24) months, except where hospitalisation directly follows an Accidental Injury, in which case this waiting period shall not apply.”",
      note: "Fictional clause with a sample page reference, shown to illustrate how a policy clause is compared against the rejection reason.",
      tone: "secondary" as const,
    },
    {
      key: "records",
      label: "C",
      title: "Medical Record Shows",
      icon: Stethoscope,
      source: "Discharge summary, p. 3 (sample evidence)",
      body: "“History of present illness: the patient slipped on a staircase on 14 March and sustained a wrist fracture requiring surgical fixation under anaesthesia.”",
      note: "Fictional medical evidence with a sample page reference, indicating the admission followed an accidental injury.",
      tone: "success" as const,
    },
  ],
  assessment: {
    conflicts:
      "The sample rejection relies on the waiting period, but the sample medical record describes an admission following an accidental injury — and the sample policy clause carves accidental injuries out of that waiting period.",
    whyItMatters:
      "If the exception in the clause applied, the waiting period would not be a valid ground for rejection in this scenario. That is the kind of mismatch worth raising with the insurer.",
    missing:
      "The policy inception date, the insurer's classification of the cause of admission, and confirmation that the exact policy wording matches the version issued to the policyholder.",
    confidence:
      "Moderate at best — and this is a fictional scenario. Confidence depends on documents that are not present in this sample, and a real review could reach a different conclusion.",
  },
  trail: [
    {
      finding: "Ground for rejection (as stated)",
      document: "Rejection letter (sample)",
      page: "Page 1",
      quote: "“…falls within the initial waiting period of your policy, which had not been completed on the date of admission…”",
      supports: "Establishes the exact reason the insurer gave, which is the statement the rest of the analysis is checked against.",
    },
    {
      finding: "Waiting-period exception (fictional clause)",
      document: "Policy document (sample)",
      page: "Page 12, Section 4.2",
      quote: "“…except where hospitalisation directly follows an Accidental Injury, in which case this waiting period shall not apply.”",
      supports: "Shows the condition under which the cited waiting period would not apply — the hinge of the sample assessment.",
    },
    {
      finding: "Cause of admission (fictional)",
      document: "Discharge summary (sample)",
      page: "Page 3",
      quote: "“…slipped on a staircase on 14 March and sustained a wrist fracture requiring surgical fixation…”",
      supports: "Indicates the admission followed an accident, which is what would trigger the exception in the sample clause.",
    },
  ],
  nextSteps: [
    "Ask the insurer in writing to confirm which clause it relied on and how it classified the cause of the admission.",
    "Obtain the complete policy document, including any annexes, and check the inception date against the admission date.",
    "Request the full hospital file — admission notes and the final discharge summary — so the documented cause of admission is on the record.",
    "Keep copies of every letter and reply, and note any response deadlines the insurer states.",
  ],
};

const toneChip: Record<"destructive" | "secondary" | "success", string> = {
  destructive: "border-destructive/30 bg-destructive/10 text-destructive",
  secondary: "border-secondary/30 bg-secondary/10 text-secondary",
  success: "border-success/30 bg-success/10 text-success",
};

function ReportField({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className={cn("mt-1 text-sm font-medium", className)}>{value}</dd>
    </div>
  );
}

function Results() {
  const { summary, columns, assessment, trail, nextSteps } = DEMO_REPORT;
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 md:py-14">
        {/* Demo notice */}
        <div
          role="note"
          aria-label="Demo notice"
          className="flex items-start gap-3 rounded-xl border border-warning/40 bg-warning/10 p-4 text-sm"
        >
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-warning" />
          <p className="text-foreground">
            <strong>DEMO — FICTIONAL SAMPLE DATA.</strong> Everything on this page is invented for demonstration. It is
            not a real analysis of any uploaded document, does not represent any real policy, insurer or regulation, and
            is not a real insurance decision.
          </p>
        </div>

        {/* Report header */}
        <header className="mt-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-primary">Claim Analysis Report</h1>
            <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
              <span className="font-mono">Sample claim reference: {summary.reference}</span>
              <span className="inline-flex items-center rounded-full border border-warning/40 bg-warning/10 px-2.5 py-0.5 text-xs font-medium text-warning">
                Sample Analysis
              </span>
            </p>
          </div>
          <ButtonLink to="/upload" variant="outline">
            <ClipboardList className="size-4" /> Start New Analysis
          </ButtonLink>
        </header>

        {/* Claim summary */}
        <Card className="mt-8">
          <h2 className="text-lg font-semibold">Claim Summary</h2>
          <dl className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <ReportField label="Claim type" value={summary.claimType} />
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Claim status</dt>
              <dd className="mt-1">
                <span className="inline-flex items-center rounded-md border border-destructive/30 bg-destructive/10 px-2 py-0.5 text-sm font-medium text-destructive">
                  {summary.claimStatus}
                </span>
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Insurer's stated reason</dt>
              <dd className="mt-1 text-sm font-medium">{summary.insurerReason}</dd>
            </div>
          </dl>
          <div className="mt-5 rounded-lg border border-secondary/25 bg-secondary/5 p-4">
            <dt className="text-xs font-medium uppercase tracking-wide text-secondary">Assessment</dt>
            <dd className="mt-1 text-sm font-medium text-secondary">
              {summary.assessment} <span className="font-normal text-muted-foreground">{summary.assessmentNote}</span>
            </dd>
          </div>
        </Card>

        {/* Evidence comparison */}
        <section aria-labelledby="comparison-heading" className="mt-10">
          <h2 id="comparison-heading" className="text-xl font-semibold tracking-tight">
            Evidence Comparison
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            What each sample document says about the same question. All content is fictional.
          </p>
          <div className="mt-5 grid gap-5 lg:grid-cols-3">
            {columns.map((col) => (
              <Card key={col.key} className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className={cn(
                      "grid size-9 shrink-0 place-items-center rounded-lg border text-sm font-semibold",
                      toneChip[col.tone],
                    )}
                  >
                    {col.label}
                  </span>
                  <h3 className="flex items-center gap-2 text-base font-semibold">
                    <col.icon className="size-4 text-muted-foreground" aria-hidden />
                    {col.title}
                  </h3>
                </div>
                <p className="border-l-2 border-border pl-3 text-sm leading-relaxed text-foreground">{col.body}</p>
                <p className="text-xs text-muted-foreground">{col.source}</p>
                <p className="mt-auto text-xs leading-relaxed text-muted-foreground">{col.note}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* AI assessment */}
        <Card className="mt-10">
          <h2 className="text-lg font-semibold">AI Assessment</h2>
          <p className="mt-1 text-xs text-muted-foreground">Generated for the fictional sample scenario only.</p>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {[
              { title: "What appears to conflict", text: assessment.conflicts },
              { title: "Why it may matter", text: assessment.whyItMatters },
              { title: "What information is still missing", text: assessment.missing },
              { title: "How confident the assessment is", text: assessment.confidence },
            ].map((block) => (
              <div key={block.title} className="rounded-xl border bg-background/60 p-4">
                <h3 className="text-sm font-semibold">{block.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{block.text}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Evidence trail */}
        <section aria-labelledby="trail-heading" className="mt-10">
          <h2 id="trail-heading" className="text-xl font-semibold tracking-tight">Evidence Trail</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Each finding with its source, page and supporting quotation from the fictional sample.
          </p>
          <ol className="mt-5 grid gap-5">
            {trail.map((item, i) => (
              <li key={item.finding}>
                <Card className="grid gap-4 md:grid-cols-[1fr_auto] md:items-start">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                        <FileText className="size-3.5" aria-hidden /> {item.document}
                      </span>
                      <span>{item.page}</span>
                    </div>
                    <h3 className="mt-2 text-sm font-semibold">
                      {i + 1}. {item.finding}
                    </h3>
                    <p className="mt-2 flex gap-2 text-sm leading-relaxed text-foreground">
                      <Quote className="mt-1 size-3.5 shrink-0 text-secondary" aria-hidden />
                      <span className="border-l-2 border-secondary/40 pl-3 italic">{item.quote}</span>
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.supports}</p>
                  </div>
                </Card>
              </li>
            ))}
          </ol>
        </section>

        {/* Next steps */}
        <Card className="mt-10">
          <h2 className="text-lg font-semibold">Next Steps</h2>
          <p className="mt-1 text-xs text-muted-foreground">Practical suggestions for the fictional sample scenario.</p>
          <ul className="mt-4 grid gap-3">
            {nextSteps.map((step) => (
              <li key={step} className="flex gap-3 text-sm leading-relaxed">
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-secondary" />
                {step}
              </li>
            ))}
          </ul>
        </Card>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl border bg-card p-6 shadow-card sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold">Prepare Your Appeal</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Turn the sample findings into a structured starting point for an appeal letter.
            </p>
          </div>
          <ButtonLink to="/appeal">
            <ArrowLeft className="size-4 rotate-180" aria-hidden /> Prepare Appeal Letter
          </ButtonLink>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
