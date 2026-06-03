import { z } from "zod";

const MimeTypeEnum = z.enum([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

export const ImageMimeType = MimeTypeEnum;

export const ImageSchemas = z.object({
  fileName: z.string(),
  mimeType: ImageMimeType,
})
