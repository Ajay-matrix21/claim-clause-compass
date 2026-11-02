import { createContext, useContext, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader, SiteFooter } from "@/components/brand";
import { emptyClaimFiles, hasRequiredDocuments, type ClaimFiles, type DocKey } from "@/lib/claim-session";

type Workflow = {
  files: ClaimFiles;
  ready: boolean;
  draft: string | null;
  setDraft: (draft: string) => void;
  setFile: (key: DocKey, file: File | null) => void;
  openSample: () => void;
  reset: () => void;
};

const WorkflowContext = createContext<Workflow | null>(null);

// React-owned memory: isolated per app instance, never persisted or uploaded.
export function ClaimWorkflowProvider({ children }: { children: ReactNode }) {
  const [files, setFiles] = useState(emptyClaimFiles);
  const [sampleOpened, setSampleOpened] = useState(false);
  const [draft, setDraft] = useState<string | null>(null);

  function reset() {
    setFiles(emptyClaimFiles());
    setSampleOpened(false);
    setDraft(null);
  }

  return <WorkflowContext.Provider value={{
    files,
    ready: sampleOpened && hasRequiredDocuments(files),
    draft,
    setDraft,
    setFile: (key, file) => {
      setFiles((previous) => ({ ...previous, [key]: file }));
      setSampleOpened(false);
      setDraft(null);
    },
    openSample: () => { if (hasRequiredDocuments(files)) setSampleOpened(true); },
    reset,
  }}>{children}</WorkflowContext.Provider>;
}

export function useClaimWorkflow() {
  const workflow = useContext(WorkflowContext);
  if (!workflow) throw new Error("Claim workflow provider is missing");
  return workflow;
}

export function WorkflowEmptyState({ appeal = false }: { appeal?: boolean }) {
  return <div className="flex min-h-screen flex-col">
    <SiteHeader />
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center px-4 py-20 text-center">
      <FileText className="size-10 text-secondary" aria-hidden />
      <h1 className="mt-5 text-3xl font-semibold text-primary">{appeal ? "No appeal draft yet" : "No sample analysis yet"}</h1>
      <p className="mt-3 max-w-lg text-muted-foreground">Add all three documents to open the fictional sample report. Nothing is processed or uploaded. Current selections are cleared when this page is refreshed or closed.</p>
      <Button asChild className="mt-6 h-10 rounded-lg"><Link to="/upload"><ArrowLeft aria-hidden />Back to Upload</Link></Button>
    </main>
    <SiteFooter />
  </div>;
}