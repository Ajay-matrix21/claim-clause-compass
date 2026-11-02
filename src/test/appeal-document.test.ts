import { describe, expect, it } from "vitest";
import { createAppealFile } from "@/lib/appeal-document";

describe("Appeal text download", () => {
  it("exports the edited text rather than replacing it with the sample", async () => {
    const editedText = "My verified reference: TEST-42\nMy revised appeal.";
    const file = createAppealFile(editedText);
    const text = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
    expect(text).toBe(editedText);
    expect(file.type).toBe("text/plain;charset=utf-8");
    expect(file.name.endsWith(".txt")).toBe(true);
  });
});