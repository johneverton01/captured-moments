import { FileStorage } from "@/repositories/storage/file-storage-interface.js";

interface UploadImageInput {
  userId: string;
  fileName: string;
  mimeType: string;
  data: Buffer;
}

export class UploadImageUseCase {
  constructor(private readonly fileStorage: FileStorage) {}

  async execute(input: UploadImageInput) {
    const { fileName, mimeType, data } = input;

    const uploadResult = await this.fileStorage.uploadFile({
      fileName,
      contentType: mimeType,
      data,
    });

    return uploadResult.url;
  }
}