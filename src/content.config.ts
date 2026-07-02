import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pages = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    navLabel: z.string().optional(),
    order: z.number().optional(),
    oldPath: z.string().optional(),
    featureImage: z.string().optional(),
    featureImageAlt: z.string().optional(),
    showFeatureImage: z.boolean().optional(),
    homeTiles: z
      .array(
        z.object({
          title: z.string(),
          href: z.string(),
          text: z.string(),
        }),
      )
      .optional(),
    draft: z.boolean().default(false),
  }),
});

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string().optional(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    featureImage: z.string().optional(),
    featureImageAlt: z.string().optional(),
    showFeatureImage: z.boolean().optional(),
    draft: z.boolean().default(false),
  }),
});

const podcasts = defineCollection({
  loader: glob({ base: './src/content/podcasts', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string().optional(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    episodeNumber: z.number().int().optional(),
    duration: z.string().optional(),
    audioUrl: z.string().optional(),
    featureImage: z.string().optional(),
    featureImageAlt: z.string().optional(),
    oldPath: z.string().optional(),
    showFeatureImage: z.boolean().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  pages,
  blog,
  podcasts,
};
