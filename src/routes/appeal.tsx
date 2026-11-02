import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AlertTriangle, ArrowLeft, Check, Copy, Download, FileText } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createAppealFile, deliverAppeal, SAMPLE_APPEAL } from "@/lib/appeal-document";

export const Route = createFileRoute("/appeal")({
  head: () => ({
    meta: [
      { title: "Prepare Your Appeal — ClaimGuard AI" },
      { name: "description", content: "Edit, copy and download a fictional sample health insurance appeal draft for review." },
      { property: "og:title", content: "Prepare Your Appeal — ClaimGuard AI" },
      { property: "og:description", content: "Edit, copy and download a fictional sample health insurance appeal draft for review." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Appeal,
});

function Appeal() {
  const [letter, setLetter] = useState(SAMPLE_APPEAL);
  const [notice, setNotice] = useState("");
  const [copied, setCopied] = useState(false);

  async function copyAppeal() {
    try {
      await navigator.clipboard.writeText(letter);
      setCopied(true);
      setNotice("Appeal copied to clipboard.");
    } catch {
      setNotice("Clipboard access is unavailable. Select the letter text and copy it manually.");
    }
  }

  async function downloadAppeal() {
    try {
      await deliverAppeal(createAppealFile(letter));
    } catch {
      setNotice("The download could not start. Please try again or copy the appeal instead.");
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 md:py-14">
        <div role="note" className="flex items-start gap-3 rounded-lg border border-warning/40 bg-warning/10 p-4 text-sm leading-relaxed">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-warning" aria-hidden />
          <p><strong>DEMO — FICTIONAL SAMPLE DATA.</strong> This draft is based only on the fictional sample analysis, not your uploaded documents or a real policy or insurance decision.</p>
        </div>
        <header className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row">
          <div>
            <h1 className="text-3xl font-semibold text-primary">Prepare Your Appeal</h1>
            <p className="mt-2 text-sm text-muted-foreground">Sample analysis reference: <span className="font-mono">CG-DEMO-001</span></p>
          </div>
          <Button asChild variant="outline" className="h-10 rounded-lg bg-card">
            <Link to="/results"><ArrowLeft aria-hidden />Back to Analysis</Link>
          </Button>
        </header>

        <section aria-labelledby="summary-heading" className="mt-8 border-y py-6">
          <div className="flex flex-wrap items-center gap-3">
            <h2 id="summary-heading" className="text-lg font-semibold">Fictional Analysis Summary</h2>
            <span className="rounded-md border border-secondary/25 bg-secondary/5 px-2.5 py-1 text-xs font-medium text-secondary">Potentially contestable · sample only</span>
          </div>
          <dl className="mt-5 grid gap-5 md:grid-cols-[1fr_1.5fr_1.5fr]">
            <div><dt className="text-xs font-medium text-muted-foreground">CLAIM</dt><dd className="mt-1 text-sm leading-relaxed">Individual Health Insurance<br /><span className="text-destructive">Rejected</span></dd></div>
            <div><dt className="text-xs font-medium text-muted-foreground">STATED REJECTION REASON</dt><dd className="mt-1 text-sm leading-relaxed">Hospitalisation within the initial waiting period.</dd></div>
            <div><dt className="text-xs font-medium text-muted-foreground">POSSIBLE MISMATCH</dt><dd className="mt-1 text-sm leading-relaxed">The fictional policy has an accidental-injury exception; the fictional medical record describes a fall and wrist fracture.</dd></div>
          </dl>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">Policy inception date, issued policy wording and the insurer’s classification of admission are unverified. A real review may reach a different conclusion.</p>
        </section>

        <section aria-labelledby="letter-heading" className="mt-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <h2 id="letter-heading" className="flex items-center gap-2 text-lg font-semibold"><FileText className="size-5 text-secondary" aria-hidden />Appeal Letter <span className="ml-1 text-xs font-normal text-muted-foreground">Draft</span></h2>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="h-10 rounded-lg bg-card" disabled={!letter.trim()} onClick={copyAppeal}>{copied ? <Check aria-hidden /> : <Copy aria-hidden />}Copy Appeal</Button>
              <Button className="h-10 rounded-lg" disabled={!letter.trim()} onClick={downloadAppeal}><Download aria-hidden />Download Appeal</Button>
            </div>
          </div>
          <p role="status" aria-live="polite" className="mt-2 min-h-5 text-sm text-secondary">{notice}</p>
          <Textarea
            aria-label="Appeal letter"
            aria-describedby="draft-disclaimer"
            spellCheck
            value={letter}
            onChange={(event) => { setLetter(event.target.value); setCopied(false); setNotice(""); }}
            className="mt-3 min-h-[820px] resize-y rounded-lg bg-card p-5 text-sm leading-7 shadow-card sm:p-10 md:text-sm"
          />
        </section>
        <div id="draft-disclaimer" role="note" className="mt-5 flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-warning" aria-hidden />
          <p><strong className="text-foreground">Check this draft for accuracy before sending.</strong> Verify every statement, document reference and attachment, and replace all placeholders. This fictional draft is not legal or medical advice. Sending an appeal does not guarantee approval.</p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
