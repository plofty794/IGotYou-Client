export interface CloudinaryUploadWidget {
  open(): void;
  close(): void;
  destroy(): void;
  setFolder(folder: string): void;
  setUploadPreset(uploadPreset: string): void;
  setMultiple(multiple: boolean): void;
  setCropping(cropping: boolean): void;
  setResultCallback(
    callback: (
      error: Error | null,
      result: CloudinaryImageUploadResponse,
    ) => void,
  ): void;
}

export interface CloudinaryImageUploadResponse {
  access_mode: string;
  asset_id: string;
  batchId: string;
  bytes: number;
  created_at: string;
  etag: string;
  folder: string;
  format: string;
  height: number;
  id: string;
  original_filename: string;
  path: string;
  placeholder: boolean;
  public_id: string;
  resource_type: string;
  secure_url: string;
  signature: string;
  tags: string[];
  thumbnail_url: string;
  type: string;
  url: string;
  version: number;
  version_id: string;
  width: number;
}

// Example usage:
export type CloudinaryUploadResult = {
  event: string;
  info: {
    height: number;
    public_id: string;
    secure_url: string;
    signature: string;
    tags: string[];
    timestamp: string;
    url: string;
    version: number;
    width: string;
    original_filename: string;
    bytes: number;
    thumbnail_url: string;
    format: string;
    resource_type: string;
  };
  start: 1643038799;
  state: "completed";
};
