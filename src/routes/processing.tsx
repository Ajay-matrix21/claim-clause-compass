import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  FileSearch,
  ScrollText,
  Stethoscope,
  GitCompare,
  ClipboardCheck,
  Check,
  LoaderCircle,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useClaimWorkflow, WorkflowEmptyState } from "@/components/claim-workflow";

export const Route = createFileRoute("/processing")({
  head: () => ({
    meta: [
      { title: "Sample Analysis in Progress — ClaimGuard AI" },
      { name: "description", content: "A fictional demonstration of the ClaimGuard AI analysis stages. No documents are processed." },
      { property: "og:title", content: "Sample Analysis in Progress — ClaimGuard AI" },
      { property: "og:description", content: "A fictional demonstration of the ClaimGuard AI analysis stages. No documents are processed." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Processing,
});

const STAGES = [
  { icon: FileSearch, label: "Reading rejection letter" },
  { icon: ScrollText, label: "Extracting policy clauses" },
  { icon: Stethoscope, label: "Reviewing medical evidence" },
  { icon: GitCompare, label: "Comparing documents" },
  { icon: ClipboardCheck, label: "Preparing findings" },
];

const STAGE_MS = 1200;

function Processing() {
  const navigate = useNavigate();
  const { ready } = useClaimWorkflow();
  const [stage, setStage] = useState(0);

  // Timed demo transition only — no document reads or processing happen here.
  useEffect(() => {
    if (!ready) return;
    if (stage >= STAGES.length) {
      const timer = setTimeout(() => void navigate({ to: "/results" }), 500);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => setStage((s) => s + 1), STAGE_MS);
    return () => clearTimeout(timer);
  }, [ready, stage, navigate]);

  if (!ready) return <WorkflowEmptyState />;

  const complete = stage >= STAGES.length;
  const progress = Math.min(100, Math.round((stage / STAGES.length) * 100));

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="bg-hero relative flex flex-1 items-center overflow-hidden">
        <div className="orb orb-blue left-[-12%] top-[-25%] size-[30rem]" />
        <div className="orb orb-lavender right-[-10%] bottom-[-20%] size-[26rem]" />
        <div className="relative mx-auto w-full max-w-2xl px-4 py-20">
          <div className="glass-strong relative overflow-hidden rounded-3xl p-8 shadow-lift md:p-10">
            <div className="scan-line" />
            <p className="text-center text-xs font-medium uppercase tracking-widest text-white/60">
              Sample analysis
            </p>
            <h1 className="mt-2 text-center text-2xl font-semibold tracking-tight text-white md:text-3xl">
              {complete ? "Sample report ready" : "Walking through the analysis stages"}
            </h1>

            {/* Progress bar */}
            <div
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Sample analysis progress"
              className="mt-8 h-2 overflow-hidden rounded-full bg-white/12"
            >
              <div
                className={cn("h-full rounded-full bg-gradient-to-r from-secondary via-lavender to-teal transition-[width] duration-500 ease-out", !complete && "progress-shimmer")}
                style={{ width: `${complete ? 100 : progress}%` }}
              />
            </div>

            {/* Stages */}
            <ol className="mt-8 space-y-3">
              {STAGES.map((s, i) => {
                const done = i < stage;
                const active = i === stage && !complete;
                return (
                  <li
                    key={s.label}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors duration-300",
                      done && "bg-teal/10 text-white",
                      active && "bg-white/10 text-white ring-1 ring-white/15",
                      !done && !active && "text-white/40",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-8 shrink-0 place-items-center rounded-lg transition-colors duration-300",
                        done && "bg-teal/20 text-teal",
                        active && "bg-secondary/30 text-white",
                        !done && !active && "bg-white/5 text-white/40",
                      )}
                    >
                      {done ? (
                        <Check className="size-4" aria-hidden />
                      ) : active ? (
                        <LoaderCircle className="size-4 motion-safe:animate-spin" aria-hidden />
                      ) : (
                        <s.icon className="size-4" aria-hidden />
                      )}
                    </span>
                    <span className="font-medium">{s.label}</span>
                    {done && <span className="ml-auto text-xs text-teal">Done</span>}
                    {active && <span className="ml-auto text-xs text-white/60">In progress</span>}
                  </li>
                );
              })}
            </ol>

            <div className="mt-8 flex items-start gap-3 rounded-xl border border-warning/40 bg-warning/10 p-4 text-sm leading-relaxed text-white/85">
              <AlertTriangle className="mt-0.5 size-4 shrink-0 text-warning" aria-hidden />
              <p>
                <strong className="text-warning">Demo only.</strong> This animation illustrates the analysis stages.
                Your documents are not being read, processed or uploaded — the report that follows is fictional sample data.
              </p>
            </div>

            <div className="mt-6 flex justify-center">
              <Button
                variant="outline"
                className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                onClick={() => void navigate({ to: "/results" })}
              >
                Skip to sample report <ArrowRight className="size-4" aria-hidden />
              </Button>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
