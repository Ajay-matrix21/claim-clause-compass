import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Lock, AlertCircle } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/brand";
import { FileUploadCard } from "@/components/file-upload-card";
import { claimSession, type DocKey } from "@/lib/claim-session";

export const Route = createFileRoute("/upload")({
  head: () => ({
    meta: [
      { title: "Upload Claim Documents — ClaimGuard AI" },
      { name: "description", content: "Upload your rejection letter, policy and discharge summary to compare your insurer's decision." },
      { property: "og:title", content: "Upload Claim Documents — ClaimGuard AI" },
      { property: "og:description", content: "Provide the three documents needed to compare your insurer's decision." },
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
  const [files, setFiles] = useState<Record<DocKey, File | null>>({ rejection: null, policy: null, discharge: null });
  const [attempted, setAttempted] = useState(false);
  const missing = DOCS.filter((d) => !files[d.key]);

  const submit = () => {
    setAttempted(true);
    if (missing.length) return;
    claimSession.fileNames = Object.fromEntries(DOCS.map((d) => [d.key, files[d.key]!.name]));
    navigate({ to: "/results" });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-14">
        <h1 className="text-3xl font-semibold tracking-tight text-primary md:text-4xl">Upload your claim documents</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Provide the three documents needed to compare your insurer's decision with your policy and medical records.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {DOCS.map((d) => (
            <FileUploadCard
              key={d.key}
              title={d.title}
              description={d.description}
              file={files[d.key]}
              missing={attempted}
              onChange={(f) => setFiles((s) => ({ ...s, [d.key]: f }))}
            />
          ))}
        </div>

        <div className="mt-8 flex items-start gap-3 rounded-xl border bg-accent p-4 text-sm">
          <Lock className="mt-0.5 size-4 shrink-0 text-secondary" />
          <p>Your documents may contain sensitive medical and financial information. Only upload documents you are authorized to share.</p>
        </div>

        <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">{3 - missing.length} of 3 documents added</p>
          <button
            type="button"
            onClick={submit}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Analyze My Claim <ArrowRight className="size-4" />
          </button>
        </div>
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
