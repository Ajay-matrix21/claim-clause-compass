import { createFileRoute } from "@tanstack/react-router";
import { PenLine } from "lucide-react";
import { SiteHeader, SiteFooter, ButtonLink } from "@/components/brand";

export const Route = createFileRoute("/appeal")({
  head: () => ({
    meta: [
      { title: "Prepare Appeal Letter — ClaimGuard AI" },
      { name: "description", content: "Prepare a structured appeal letter starting point for your insurance claim." },
      { property: "og:title", content: "Prepare Appeal Letter — ClaimGuard AI" },
      { property: "og:description", content: "Prepare a structured appeal letter starting point for your insurance claim." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Appeal,
});

function Appeal() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center px-4 py-24 text-center">
        <div className="grid size-14 place-items-center rounded-2xl bg-accent text-accent-foreground">
          <PenLine className="size-7" aria-hidden />
        </div>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-primary">Appeal Letter Drafting</h1>
        <p className="mt-3 max-w-md text-muted-foreground">
          This page is coming soon. It will help you organise the findings from your analysis into a clear, structured
          appeal letter.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink to="/results" variant="outline">Back to sample report</ButtonLink>
          <ButtonLink to="/upload">Start New Analysis</ButtonLink>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
