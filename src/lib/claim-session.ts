// In-memory only: selected file names for the current browser session. Never persisted or uploaded.
export type DocKey = "rejection" | "policy" | "discharge";
export const claimSession: { fileNames: Partial<Record<DocKey, string>> } = { fileNames: {} };
