export type PhotoStatus = "pending" | "uploaded" | "failed";

export interface Photo {
  id?: number;
  filename: string;
  filePath: string;
  mimeType: string;
  timestamp: string;
  status: PhotoStatus;
  retries: number;
  location?: string | null;
  serverId?: string | null;
}
