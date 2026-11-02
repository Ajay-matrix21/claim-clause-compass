import { createFileRoute } from "@tanstack/react-router";
import { FileUp } from "lucide-react";
import { SiteHeader, SiteFooter, Card, IconBadge } from "@/components/brand";

export const Route = createFileRoute("/upload")({
  head: () => ({
    meta: [
      { title: "Upload Documents — ClaimGuard AI" },
      { name: "description", content: "Upload your claim documents to start an analysis." },
      { property: "og:title", content: "Upload Documents — ClaimGuard AI" },
      { property: "og:description", content: "Upload your claim documents to start an analysis." },
    ],
  }),
  component: Upload,
});

function Upload() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-20">
        <Card className="text-center">
          <div className="flex justify-center"><IconBadge><FileUp className="size-5" /></IconBadge></div>
          <h1 className="mt-5 text-2xl font-semibold text-primary">Upload coming soon</h1>
          <p className="mt-2 text-sm text-muted-foreground">Document upload will be available here shortly.</p>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}
