-- CreateTable
CREATE TABLE "registered_moments" (
    "_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "story" TEXT,
    "visitedLocation" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,
    "imageUrl" TEXT NOT NULL,
    "visitedDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "registered_moments_pkey" PRIMARY KEY ("_id")
);

-- AddForeignKey
ALTER TABLE "registered_moments" ADD CONSTRAINT "registered_moments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
