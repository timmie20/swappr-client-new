"use client";

import { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  UploadCloud,
  X,
  FileText,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  uploadToCloudinary,
  validateFile,
  formatFileSize,
  type UploadProgress,
} from "@/lib/cloudinary";

type UploadStatus = "idle" | "uploading" | "done" | "error";

interface FileEntry {
  id: string;
  file: File;
  url?: string;
  status: UploadStatus;
  progress: number;
  error?: string;
  previewUrl?: string;
}

export interface FileUploadProps {
  /** Comma-separated MIME types / extensions e.g. "image/*" or ".pdf,image/*" */
  accept: string;
  /** Maximum file size in MB per file */
  maxSizeMB?: number;
  /** Minimum number of files required */
  minFiles?: number;
  /** Maximum number of files allowed */
  maxFiles?: number;
  /** Current uploaded URLs (controlled) */
  value: string[];
  /** Called whenever the list of successfully uploaded URLs changes */
  onChange: (urls: string[]) => void;
  /** Validation error from react-hook-form */
  error?: string;
  /** Show image grid preview vs document list */
  previewMode?: "grid" | "list";
  /** Aria label for the input */
  label?: string;
  disabled?: boolean;
}

export function FileUpload({
  accept,
  maxSizeMB = 5,
  minFiles = 1,
  maxFiles = 1,
  value,
  onChange,
  error,
  previewMode = "list",
  label = "Upload file",
  disabled = false,
}: FileUploadProps) {
  const [entries, setEntries] = useState<FileEntry[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  /* ── helpers ─────────────────────────────────────────────────── */

  const updateEntry = (id: string, patch: Partial<FileEntry>) => {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    );
  };

  const processFile = useCallback(
    async (file: File) => {
      const validationError = validateFile(file, { accept, maxSizeMB });
      const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;

      const previewUrl = file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : undefined;

      const entry: FileEntry = {
        id,
        file,
        status: validationError ? "error" : "uploading",
        progress: 0,
        error: validationError ?? undefined,
        previewUrl,
      };

      setEntries((prev) => [...prev, entry]);

      if (validationError) return;

      try {
        const url = await uploadToCloudinary(file, (p: UploadProgress) => {
          updateEntry(id, { progress: p.percent });
        });

        updateEntry(id, { status: "done", url, progress: 100 });
        onChange([...value, url]);
      } catch (err) {
        updateEntry(id, {
          status: "error",
          error: err instanceof Error ? err.message : "Upload failed",
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [accept, maxSizeMB, value],
  );

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return;
      const remaining = maxFiles - value.length;
      const toProcess = Array.from(files).slice(0, remaining);
      toProcess.forEach((f) => processFile(f));
    },
    [maxFiles, processFile, value.length],
  );

  const removeEntry = (entry: FileEntry) => {
    if (entry.previewUrl) URL.revokeObjectURL(entry.previewUrl);
    setEntries((prev) => prev.filter((e) => e.id !== entry.id));
    if (entry.url) {
      onChange(value.filter((u) => u !== entry.url));
    }
  };

  const retryEntry = async (entry: FileEntry) => {
    updateEntry(entry.id, {
      status: "uploading",
      error: undefined,
      progress: 0,
    });
    try {
      const url = await uploadToCloudinary(entry.file, (p: UploadProgress) => {
        updateEntry(entry.id, { progress: p.percent });
      });
      updateEntry(entry.id, { status: "done", url, progress: 100 });
      onChange([...value, url]);
    } catch (err) {
      updateEntry(entry.id, {
        status: "error",
        error: err instanceof Error ? err.message : "Upload failed",
      });
    }
  };

  const isFull = value.length >= maxFiles;
  const canAdd = !isFull && !disabled;

  /* ── drag handlers ───────────────────────────────────────────── */

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (canAdd) setIsDragging(true);
  };
  const onDragLeave = () => setIsDragging(false);
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (canAdd) handleFiles(e.dataTransfer.files);
  };

  /* ── render ──────────────────────────────────────────────────── */

  return (
    <div className="flex flex-col gap-3">
      {/* Drop zone */}
      {canAdd && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          aria-label={label}
          className={cn(
            "flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-8 text-center transition-colors",
            isDragging
              ? "border-blue-400 bg-blue-50"
              : "border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-blue-50/50",
            error && "border-red-300 bg-red-50",
          )}
        >
          <UploadCloud
            size={28}
            className={cn("text-gray-400", isDragging && "text-blue-500")}
          />
          <div>
            <p className="text-sm font-medium text-gray-700">
              Click to upload
              <span className="text-gray-400"> or drag & drop</span>
            </p>
            <p className="mt-0.5 text-xs text-gray-400">
              {accept.replace(/,/g, ", ")} · Max {maxSizeMB}MB per file
              {maxFiles > 1 && ` · ${value.length}/${maxFiles} uploaded`}
            </p>
          </div>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={maxFiles > 1}
        className="hidden"
        aria-label={label}
        onChange={(e) => handleFiles(e.target.files)}
        disabled={disabled || isFull}
      />

      {/* Previews */}
      {entries.length > 0 && (
        <AnimatePresence initial={false}>
          {previewMode === "grid" ? (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {entries.map((entry) => (
                <ImagePreviewCard
                  key={entry.id}
                  entry={entry}
                  onRemove={() => removeEntry(entry)}
                  onRetry={() => retryEntry(entry)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {entries.map((entry) => (
                <DocPreviewRow
                  key={entry.id}
                  entry={entry}
                  onRemove={() => removeEntry(entry)}
                  onRetry={() => retryEntry(entry)}
                />
              ))}
            </div>
          )}
        </AnimatePresence>
      )}

      {/* Validation error */}
      {error && (
        <p
          className="flex items-center gap-1.5 text-xs text-red-600"
          role="alert"
        >
          <AlertCircle size={12} />
          {error}
        </p>
      )}

      {/* Min files hint */}
      {minFiles > 1 && (
        <p className="text-xs text-gray-400">
          {value.length < minFiles
            ? `${minFiles - value.length} more file${minFiles - value.length > 1 ? "s" : ""} required`
            : `✓ Minimum met`}
        </p>
      )}
    </div>
  );
}

/* ── Sub-components ─────────────────────────────────────────────────────── */

function ImagePreviewCard({
  entry,
  onRemove,
  onRetry,
}: {
  entry: FileEntry;
  onRemove: () => void;
  onRetry: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.88 }}
      transition={{ duration: 0.2 }}
      className="group relative aspect-square overflow-hidden rounded-xl border border-gray-200 bg-gray-100"
    >
      {entry.previewUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={entry.previewUrl}
          alt={entry.file.name}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full items-center justify-center">
          <ImageIcon size={32} className="text-gray-300" />
        </div>
      )}

      {/* Uploading overlay */}
      {entry.status === "uploading" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
          <div className="h-1 w-3/4 overflow-hidden rounded-full bg-white/30">
            <div
              className="h-full rounded-full bg-white transition-[width]"
              style={{ width: `${entry.progress}%` }}
            />
          </div>
          <p className="mt-1.5 text-xs font-medium text-white">
            {entry.progress}%
          </p>
        </div>
      )}

      {/* Done badge */}
      {entry.status === "done" && (
        <div className="absolute top-1.5 right-1.5">
          <CheckCircle2 size={18} className="text-white drop-shadow" />
        </div>
      )}

      {/* Error overlay */}
      {entry.status === "error" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-red-900/70 p-2 text-center">
          <AlertCircle size={20} className="text-red-200" />
          <p className="text-[10px] leading-tight text-red-100">
            {entry.error}
          </p>
          <button
            type="button"
            onClick={onRetry}
            className="mt-1 text-[10px] font-medium text-white underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* Remove button */}
      {entry.status !== "uploading" && (
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove file"
          className="absolute top-1.5 left-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
        >
          <X size={10} strokeWidth={2.5} />
        </button>
      )}
    </motion.div>
  );
}

function DocPreviewRow({
  entry,
  onRemove,
  onRetry,
}: {
  entry: FileEntry;
  onRemove: () => void;
  onRetry: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
        <FileText size={18} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-gray-800">
          {entry.file.name}
        </p>
        <p className="text-xs text-gray-400">
          {formatFileSize(entry.file.size)}
        </p>

        {entry.status === "uploading" && (
          <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-blue-500 transition-[width]"
              style={{ width: `${entry.progress}%` }}
            />
          </div>
        )}

        {entry.status === "error" && (
          <p className="mt-0.5 text-[11px] text-red-600">{entry.error}</p>
        )}
      </div>

      <div className="ml-auto flex items-center gap-1">
        {entry.status === "done" && (
          <CheckCircle2 size={16} className="text-green-500" />
        )}
        {entry.status === "error" && (
          <Button
            type="button"
            size="icon-sm"
            variant="ghost"
            onClick={onRetry}
            aria-label="Retry upload"
          >
            <RefreshCw size={14} />
          </Button>
        )}
        {entry.status !== "uploading" && (
          <Button
            type="button"
            size="icon-sm"
            variant="ghost"
            onClick={onRemove}
            aria-label="Remove file"
            className="text-gray-400 hover:text-red-500"
          >
            <X size={14} />
          </Button>
        )}
      </div>
    </motion.div>
  );
}
