import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ClaimWorkflowProvider, useClaimWorkflow } from "@/components/claim-workflow";
import { emptyClaimFiles, hasRequiredDocuments } from "@/lib/claim-session";

afterEach(cleanup);

function Probe() {
  const workflow = useClaimWorkflow();
  return <>
    <button onClick={() => {
      for (const key of ["rejection", "policy", "discharge"] as const) {
        workflow.setFile(key, new File([key], `${key}.pdf`, { type: "application/pdf" }));
      }
    }}>Select documents</button>
    <button onClick={workflow.openSample}>Open sample</button>
    <button onClick={() => workflow.setDraft("My edited appeal")}>Edit draft</button>
    <button onClick={workflow.reset}>Start New Analysis</button>
    <output data-testid="state">{JSON.stringify({ files: Object.values(workflow.files).map((file) => file?.name ?? null), ready: workflow.ready, draft: workflow.draft })}</output>
  </>;
}

describe("Current analysis journey", () => {
  it("requires all three documents before proceeding", () => {
    const file = new File(["sample"], "sample.pdf");
    const files = emptyClaimFiles();
    expect(hasRequiredDocuments(files)).toBe(false);
    files.rejection = file;
    files.policy = file;
    expect(hasRequiredDocuments(files)).toBe(false);
    files.discharge = file;
    expect(hasRequiredDocuments(files)).toBe(true);
  });

  it("keeps selections across child navigation and clears files, sample and draft for a new analysis", () => {
    const view = render(<ClaimWorkflowProvider><Probe /></ClaimWorkflowProvider>);
    fireEvent.click(screen.getByText("Open sample"));
    expect(JSON.parse(screen.getByTestId("state").textContent ?? "{}").ready).toBe(false);
    fireEvent.click(screen.getByText("Select documents"));
    fireEvent.click(screen.getByText("Open sample"));
    fireEvent.click(screen.getByText("Edit draft"));
    view.rerender(<ClaimWorkflowProvider><div><Probe /></div></ClaimWorkflowProvider>);
    expect(JSON.parse(screen.getByTestId("state").textContent ?? "{}")).toEqual({ files: ["rejection.pdf", "policy.pdf", "discharge.pdf"], ready: true, draft: "My edited appeal" });
    fireEvent.click(screen.getByText("Start New Analysis"));
    expect(JSON.parse(screen.getByTestId("state").textContent ?? "{}")).toEqual({ files: [null, null, null], ready: false, draft: null });
  });
});