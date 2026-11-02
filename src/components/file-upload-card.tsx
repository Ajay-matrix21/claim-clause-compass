import { useRef, useState, type DragEvent } from "react";
import { UploadCloud, FileText, CheckCircle2, AlertCircle, RefreshCw, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const ACCEPTED_TYPES = ["application/pdf", "image/jpeg", "image/png"];
const ACCEPTED_EXT = /\.(pdf|jpe?g|png)$/i;

export function isAcceptedFile(file: File) {
  return ACCEPTED_TYPES.includes(file.type) || (!file.type && ACCEPTED_EXT.test(file.name));
}

export function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function typeLabel(file: File) {
  const ext = file.name.split(".").pop()?.toUpperCase();
  return ext === "JPEG" ? "JPG" : ext ?? "FILE";
}

export function FileUploadCard({
  title, description, file, onChange, missing, disabled = false,
}: {
  title: string;
  description: string;
  file: File | null;
  onChange: (file: File | null) => void;
  missing?: boolean;
  disabled?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const accept = (f: File | undefined) => {
    if (!f || disabled) return;
    if (!isAcceptedFile(f)) {
      setError(`"${f.name}" is not supported. Please upload a PDF, JPG or PNG file.`);
      return;
    }
    setError(null);
    onChange(f);
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    accept(e.dataTransfer.files[0]);
  };

  const browse = () => inputRef.current?.click();

  return (
    <div className={cn("rounded-2xl border bg-card p-5 shadow-card", file && "border-success/40", missing && !file && "border-destructive/50")}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
        {file && <CheckCircle2 className="size-5 shrink-0 text-success" aria-label="Selected locally" />}
      </div>

      <input
        ref={inputRef}
        type="file"
        disabled={disabled}
        accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
        className="hidden"
        aria-label={`Upload ${title}`}
        onChange={(e) => { accept(e.target.files?.[0]); e.target.value = ""; }}
      />

      {file ? (
        <div className="mt-4 rounded-xl bg-success/10 p-4">
          <div className="flex items-center gap-3">
            <FileText className="size-5 shrink-0 text-success" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{file.name}</p>
              <p className="text-xs text-muted-foreground">{typeLabel(file)} · {formatFileSize(file.size)}</p>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <Button disabled={disabled} variant="outline" size="sm" type="button" onClick={browse} className="bg-card">
              <RefreshCw className="size-3.5" /> Replace
            </Button>
            <Button disabled={disabled} variant="outline" size="sm" type="button" onClick={() => { onChange(null); setError(null); }} className="bg-card text-destructive hover:bg-destructive/10">
              <Trash2 className="size-3.5" /> Remove
            </Button>
          </div>
        </div>
      ) : (
        <Button
          type="button"
          disabled={disabled}
          variant="outline"
          onClick={browse}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={cn(
            "mt-4 h-auto w-full flex-col gap-0 whitespace-normal rounded-xl border-2 border-dashed px-4 py-8 text-center transition-colors hover:bg-accent/50",
            dragging && "border-secondary bg-accent",
          )}
        >
          <UploadCloud className="size-7 text-secondary" />
          <p className="mt-2 text-sm font-medium">Drag and drop, or <span className="text-secondary">browse files</span></p>
          <p className="mt-1 text-xs text-muted-foreground">PDF, JPG or PNG</p>
        </Button>
      )}

      {error && (
        <p role="alert" className="mt-3 flex items-start gap-1.5 text-sm text-destructive">
          <AlertCircle className="mt-0.5 size-4 shrink-0" /> {error}
        </p>
      )}
      {missing && !file && !error && (
        <p className="mt-3 flex items-center gap-1.5 text-sm text-destructive">
          <AlertCircle className="size-4" /> This document is required.
        </p>
      )}
    </div>
  );
}
