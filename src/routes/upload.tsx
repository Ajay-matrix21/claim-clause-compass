import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Lock, AlertCircle, LoaderCircle } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/brand";
import { FileUploadCard } from "@/components/file-upload-card";
import { type DocKey } from "@/lib/claim-session";
import { useClaimWorkflow } from "@/components/claim-workflow";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/upload")({
  head: () => ({
    meta: [
      { title: "Upload Claim Documents — ClaimGuard AI" },
      { name: "description", content: "Upload your rejection letter, policy and discharge summary to compare your insurer's decision." },
      { property: "og:title", content: "Upload Claim Documents — ClaimGuard AI" },
      { property: "og:description", content: "Provide the three documents needed to compare your insurer's decision." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Upload,
});

const DOCS: { key: DocKey; title: string; description: string }[] = [
  { key: "rejection", title: "Rejection Letter", description: "The letter or communication explaining why your insurer rejected or partially paid the claim." },
  { key: "policy", title: "Health Insurance Policy", description: "The policy wording containing coverage, exclusions, waiting periods and sub-limits." },
  { key: "discharge", title: "Hospital Discharge Summary", description: "The hospital document describing diagnosis, treatment, admission and discharge details." },
];

function Upload() {
  const navigate = useNavigate();
  const { files, setFile, openSample } = useClaimWorkflow();
  const [attempted, setAttempted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const missing = DOCS.filter((d) => !files[d.key]);

  const submit = async () => {
    if (loading) return;
    setAttempted(true);
    setError("");
    if (missing.length) return;
    setLoading(true);
    try {
      // A presentation transition only: no document reads or processing.
      await new Promise((resolve) => setTimeout(resolve, 450));
      openSample();
      await navigate({ to: "/results" });
    } catch {
      setError("The sample report could not open. Your selections are still here. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-14">
        <Button asChild variant="ghost" className="mb-5"><Link to="/"><ArrowLeft aria-hidden />Back to Home</Link></Button>
        <h1 className="text-3xl font-semibold tracking-tight text-primary md:text-4xl">Upload your claim documents</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Provide the three documents needed to compare your insurer's decision with your policy and medical records.
        </p>
        <p role="note" className="mt-4 text-sm text-secondary"><strong>Demo only.</strong> Continuing opens fictional sample data. Your documents are not processed, uploaded or saved; selections remain only until refresh or close.</p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {DOCS.map((d) => (
            <FileUploadCard
              key={d.key}
              title={d.title}
              description={d.description}
              file={files[d.key]}
              missing={attempted}
              disabled={loading}
              onChange={(f) => { setFile(d.key, f); setError(""); }}
            />
          ))}
        </div>

        <div className="mt-8 flex items-start gap-3 rounded-xl border bg-accent p-4 text-sm">
          <Lock className="mt-0.5 size-4 shrink-0 text-secondary" />
          <p>Your documents may contain sensitive medical and financial information. Only upload documents you are authorized to share.</p>
        </div>

        <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">{3 - missing.length} of 3 documents added</p>
          <Button
            type="button"
            onClick={submit}
            disabled={loading}
            className="h-10 rounded-lg px-5"
          >
            {loading ? <><LoaderCircle className="motion-safe:animate-spin" aria-hidden />Opening fictional sample…</> : <>Analyze My Claim <ArrowRight className="size-4" aria-hidden /></>}
          </Button>
        </div>
        {loading && <p role="status" className="mt-3 text-sm text-muted-foreground">Opening fictional demo data — no documents are being processed.</p>}
        {error && <p role="alert" className="mt-3 text-sm text-destructive">{error}</p>}
        {attempted && missing.length > 0 && (
          <p role="alert" className="mt-3 flex items-center gap-1.5 text-sm text-destructive sm:justify-end">
            <AlertCircle className="size-4" /> Please add: {missing.map((m) => m.title).join(", ")}.
          </p>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
