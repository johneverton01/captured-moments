import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { FileStorage, type UploadFile, type UploadFileParams } from "./file-storage-interface.js";

export class CloudflareR2Storage  implements FileStorage {
  private readonly client: S3Client;
  constructor() {
    this.client = new S3Client({
      region: 'auto',
      endpoint: process.env.R2_ENDPOINT,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY!,
        secretAccessKey: process.env.R2_SECRET_KEY!,
      },
    });
  }
  async uploadFile(input: UploadFileParams): Promise<UploadFile> {
    const { fileName, contentType, data } = input;

    await this.client.send(new PutObjectCommand({
      Bucket: process.env.R2_BUCKET!,
      Key: fileName,
      Body: data,
      ContentType: contentType,
    }));

    return {
      key: fileName,
      url: `${process.env.R2_PUBLIC_URL}/${fileName}`,
    };
  }

  async delete(key: string): Promise<void> {
    await this.client.send(new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET!,
      Key: key,
    }));
  }
}