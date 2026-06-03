import { CloudflareR2Storage } from "@/repositories/storage/cloudflare-r2-storage.js";
import { UploadImageUseCase } from "../upload-images/upload-image-use-case.js";

export function makeUploadImageUseCase() {
  const storage = new CloudflareR2Storage();
  const useCase = new UploadImageUseCase(storage);
  return useCase;
}