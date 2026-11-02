export type DocKey = "rejection" | "policy" | "discharge";
export type ClaimFiles = Record<DocKey, File | null>;

export function emptyClaimFiles(): ClaimFiles {
  return { rejection: null, policy: null, discharge: null };
}

export function hasRequiredDocuments(files: ClaimFiles): boolean {
  return Boolean(files.rejection && files.policy && files.discharge);
}
