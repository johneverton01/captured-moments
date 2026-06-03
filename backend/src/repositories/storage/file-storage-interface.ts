export interface UploadFileParams {
  fileName: string;
  contentType: string;
  data: Buffer;
}

export interface UploadFile {
  key: string;
  url: string;
}

export interface FileStorage {
  uploadFile(params: UploadFileParams): Promise<UploadFile>;

  delete(key: string): Promise<void>;
}
