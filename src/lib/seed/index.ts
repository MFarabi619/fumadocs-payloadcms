import type {File, Payload, PayloadRequest} from "payload";
import {seedMedia} from "../../collections/Media";
import {seedUsers} from "../../collections/Users";
import {promises as fs} from "fs";
import path from "path";

export async function seed({
  payload,
  req,
}: {
  payload: Payload;
  req: PayloadRequest;
}): Promise<{message: string}> {
  payload.logger.info("🌱 Seeding database...");

  await Promise.all(
    ["users"].map(async (collection) => {
      if (collection === "users") {
        await payload.db.deleteMany({
          collection,
          req,
          where: {
            // email: { not_equals: 'test@gmail.com' },
          },
        });
      } else {
        await payload.db.deleteMany({collection, req, where: {}});
      }

      if (payload.collections[collection].config.versions) {
        await payload.db.deleteVersions({collection, req, where: {}});
      }
    })
  );

  const mediaDir = path.resolve("./media");

  try {
    await fs.rm(mediaDir, {recursive: true, force: true});
    payload.logger.info(`🗑 Deleted media directory: ${mediaDir}`);
  } catch (error) {
    payload.logger.warn(
      `⚠ Failed to delete media directory: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }

  try {
    await seedUsers(payload, req);
    await seedMedia(payload);
  } catch (error) {
    payload.logger.error(
      `❌ Error seeding initial data: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }

  payload.logger.info("🎉 Database seeded successfully! 🌱");

  return {message: "Database seeded successfully!"};
}

export async function getOrUploadMedia(
  payload: Payload,
  req: PayloadRequest,
  url: string | undefined,
  filename: string,
  alt: string
): Promise<File | null> {
  if (!url) return null;

  try {
    const existingMedia = await payload.find({
      collection: "media",
      where: {alt: {equals: alt}},
      limit: 1,
    });

    if (existingMedia.docs.length > 0) {
      payload.logger.info(
        `🔄 Reusing existing media: ${filename} (alt: ${alt})`
      );
      return existingMedia.docs[0];
    }

    payload.logger.info(`📥 Fetching image: ${url}`);
    const res = await fetch(url);
    if (!res.ok)
      throw new Error(`Failed to fetch ${url}, status: ${res.status}`);

    const data = Buffer.from(await res.arrayBuffer());

    const contentType =
      res.headers.get("content-type") || "application/octet-stream";

    const uploadedFile = await payload.create({
      collection: "media",
      file: {
        name: filename,
        data,
        mimetype: contentType,
        size: data.length,
      },
      data: {alt},
    });

    payload.logger.info(`✅ Uploaded image: ${filename}`);
    return uploadedFile;
  } catch (error) {
    payload.logger.warn(
      `⚠ Error handling media (${filename}): ${error instanceof Error ? error.message : "Unknown error"}`
    );
    return null;
  }
}
