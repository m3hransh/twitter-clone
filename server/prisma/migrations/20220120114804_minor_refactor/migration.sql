-- CreateTable
CREATE TABLE "LikedTweet" (
    "id" SERIAL NOT NULL,
    "likedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,
    "tweetId" INTEGER NOT NULL,

    CONSTRAINT "LikedTweet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LikedTweet" ADD CONSTRAINT "LikedTweet_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "Tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikedTweet" ADD CONSTRAINT "LikedTweet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "Profile.userId_unique" RENAME TO "Profile_userId_key";

-- RenameIndex
ALTER INDEX "User.email_unique" RENAME TO "User_email_key";
