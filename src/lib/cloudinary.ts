/**
 * Upload a file to Cloudinary using unsigned upload.
 *
 * Requires env vars:
 *   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
 *   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
 *
 * Returns the Cloudinary secure_url on success.
 */
export interface UploadProgress {
  loaded: number;
  total: number;
  percent: number;
}

export async function uploadToCloudinary(
  file: File,
  onProgress?: (progress: UploadProgress) => void,
): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error(
      "Cloudinary is not configured. Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET.",
    );
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  return new Promise<string>((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    if (onProgress) {
      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          onProgress({
            loaded: e.loaded,
            total: e.total,
            percent: Math.round((e.loaded / e.total) * 100),
          });
        }
      });
    }

    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const res = JSON.parse(xhr.responseText);
          resolve(res.secure_url as string);
        } catch {
          reject(new Error("Invalid response from Cloudinary"));
        }
      } else {
        reject(new Error(`Upload failed with status ${xhr.status}`));
      }
    });

    xhr.addEventListener("error", () =>
      reject(new Error("Network error during upload")),
    );
    xhr.addEventListener("abort", () => reject(new Error("Upload cancelled")));

    xhr.open("POST", `https://api.cloudinary.com/v1_1/${cloudName}/upload`);
    xhr.send(formData);
  });
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function validateFile(
  file: File,
  opts: { accept: string; maxSizeMB: number },
): string | null {
  const maxBytes = opts.maxSizeMB * 1024 * 1024;
  if (file.size > maxBytes) {
    return `File exceeds ${opts.maxSizeMB}MB limit (${formatFileSize(file.size)})`;
  }

  if (opts.accept !== "*") {
    const accepted = opts.accept.split(",").map((s) => s.trim());
    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    const mime = file.type;

    const ok = accepted.some((pattern) => {
      if (pattern.startsWith(".")) return ext === pattern;
      if (pattern.endsWith("/*")) return mime.startsWith(pattern.slice(0, -1));
      return mime === pattern;
    });

    if (!ok) {
      return `Unsupported file type. Accepted: ${opts.accept}`;
    }
  }

  return null;
}
