import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// ── Shared sub-schemas ────────────────────────────────────────────────────────

const LocationSchema = z.object({
  city: z.string(),
  country: z.string(),
});

const ExperienceSchema = z.object({
  company: z.string(),
  role: z.string(),
  duration: z.string(),
  description: z.string(),
});

const EducationSchema = z.object({
  institution: z.string(),
  degree: z.string(),
  year: z.string(),
});

const SocialSchema = z.object({
  github: z.string().url().optional(),
  linkedin: z.string().url().optional(),
});

// ── Collections ───────────────────────────────────────────────────────────────

const users = defineCollection({
  loader: glob({ pattern: '[a-z]*.md', base: './src/content/users' }),
  schema: z.object({
    name: z.string(),
    avatar: z.string(),
    title: z.string().optional(),
    bio: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    location: LocationSchema.optional(),
    skills: z.array(z.string()).default([]),
    experience: z.array(ExperienceSchema).default([]),
    education: z.array(EducationSchema).default([]),
    social: SocialSchema.optional(),
  }),
});

const blogs = defineCollection({
  loader: glob({ pattern: '*/*.md', base: './src/content/blogs' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    coAuthors: z.array(z.string()).optional(),
  }),
});

export const collections = { users, blogs };
