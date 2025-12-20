import type {CollectionConfig, Payload} from "payload";

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {displayPreview: true, focalPoint: true},
}

export async function seedMedia(payload: Payload) {
  payload.logger.info("📸 Uploading media...");
  try {
    await Promise.all(
      [
        {
          alt: "Fumadocs Symbol",
          url: "https://fumadocs.dev/icon.png?afdaf7168e705810",
          filename: "fumadocs-symbol.png",
        },
      ].map(async (media) => {
        const res = await fetch(media.url, {method: "GET"});

        const contentType =
          res.headers.get("content-type") || "application/octet-stream";

        const data = await res.arrayBuffer();

        await payload.create({
          collection: "media",
          file: {
            name: media.filename,
            data: Buffer.from(data),
            mimetype: contentType,
            size: data.byteLength,
          },
          data: {alt: media.alt || media.filename},
        });
      })
    );
    payload.logger.info("📸 Media uploaded!");
  } catch (error) {
    console.error("Error seeding media data:", error);
  }
}
