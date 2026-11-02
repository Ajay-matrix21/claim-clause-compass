export const SAMPLE_APPEAL = `DEMO — FICTIONAL SAMPLE DATA
Sample analysis reference: CG-DEMO-001 (not an actual claim number)

To: Insurance Company's Grievance Redressal Officer
Subject: Request for reconsideration of health insurance claim rejection

Claim reference: [Enter the verified claim reference]
Policy reference: [Enter the verified policy reference]
Policyholder name: [Enter policyholder name]
Date: [Enter date]

Dear Grievance Redressal Officer,

I request reconsideration of the rejection of the health insurance claim referenced above and clarification of the policy terms relied upon in making the decision.

In this fictional sample, the rejection letter states that hospitalisation occurred before the initial waiting period had been completed. However, the fictional policy document on page 12, Section 4.2, includes an exception to that waiting period where hospitalisation directly follows an accidental injury. The fictional discharge summary on page 3 describes a fall on a staircase on 14 March resulting in a wrist fracture requiring surgical fixation.

These sample findings suggest a possible mismatch between the stated rejection reason and the accidental-injury exception. Please review whether the applicable policy contains this exception and whether the documented cause of admission falls within it. Please also confirm the exact clause relied upon and how the cause of admission was classified.

The policy inception date, the complete policy wording issued to the policyholder, and the insurer's classification of the admission remain unverified in this sample. Please identify any further information or records needed to reconsider the claim and provide a written explanation of the review outcome.

Supporting evidence list (fictional sample references — replace with verified attachments):
1. Rejection letter, page 1 — stated waiting-period ground for rejection.
2. Policy document, page 12, Section 4.2 — fictional accidental-injury exception.
3. Discharge summary, page 3 — fictional account of the accident and treatment.
4. [Complete policy, inception date and additional hospital records, if available]

Thank you for reviewing this request.

Yours faithfully,
[Signature]
[Policyholder name]
[Contact details]

Draft disclaimer: This letter uses fictional sample data only. Check every statement, reference, date and attachment for accuracy and replace all placeholders before sending. It is not legal or medical advice. Sending an appeal does not guarantee claim approval.`;

export function createAppealFile(text: string): File {
  return new File([text], "ClaimGuard-DEMO-appeal.txt", { type: "text/plain;charset=utf-8" });
}

export async function deliverAppeal(file: File): Promise<void> {
  if (matchMedia("(pointer: coarse)").matches && navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: file.name });
      return;
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
    }
  }
  const url = URL.createObjectURL(file);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = file.name;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30_000);
}