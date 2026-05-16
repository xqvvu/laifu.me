import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: "page",
      source: "blog/**/*.md",
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        updated: z.string().optional(),
        tags: z.array(z.string()).default([]),
        cover: z.string().optional(),
        draft: z.boolean().default(false),
        featured: z.boolean().default(false),
        reading: z
          .object({
            minutes: z.number(),
            words: z.number(),
            text: z.string(),
            wordCountText: z.string(),
          })
          .optional(),
      }),
    }),
    pages: defineCollection({
      type: "page",
      source: "pages/**/*.md",
      schema: z.object({
        title: z.string(),
        description: z.string(),
      }),
    }),
  },
});
