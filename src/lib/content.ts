import { getCollection } from 'astro:content';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface Location {
  city: string;
  country: string;
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  description: string;
}

export interface Education {
  institution: string;
  degree: string;
  year: string;
}

export interface Social {
  github?: string;
  linkedin?: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  title?: string;
  bio?: string;
  email?: string;
  phone?: string;
  location?: Location;
  skills: string[];
  experience: Experience[];
  education: Education[];
  social?: Social;
  body: string;
}

export interface BlogPost {
  id: string;
  userId: string;
  slug: string;
  title: string;
  date: Date;
  description?: string;
  tags?: string[];
  coAuthors?: string[];
  body: string;
}

// ── Mappers ───────────────────────────────────────────────────────────────────

function toUser(entry: Awaited<ReturnType<typeof getCollection<'users'>>>[number]): User {
  const d = entry.data;
  return {
    id: entry.id,           // 'swati'  (filename without extension)
    name: d.name,
    avatar: d.avatar ?? '',
    title: d.title,
    bio: d.bio,
    email: d.email,
    phone: d.phone,
    location: d.location,
    skills: d.skills,
    experience: d.experience,
    education: d.education,
    social: d.social,
    body: entry.body ?? '',
  };
}

function toBlogPost(entry: Awaited<ReturnType<typeof getCollection<'blogs'>>>[number]): BlogPost {
  // entry.id = 'swati/my-post'   (folder/filename without extension)
  const slashIdx = entry.id.indexOf('/');
  const userId = entry.id.slice(0, slashIdx);
  const slug = entry.id.slice(slashIdx + 1);
  const d = entry.data;
  return {
    id: entry.id,
    userId,
    slug,
    title: d.title,
    date: d.date,
    description: d.description,
    tags: d.tags,
    coAuthors: d.coAuthors,
    body: entry.body ?? '',
  };
}

// ── Public API ────────────────────────────────────────────────────────────────

export async function getUsers(): Promise<User[]> {
  const entries = await getCollection('users');
  return entries
    .map(toUser)
    .sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));
}

export async function getUser(id: string): Promise<User | null> {
  const users = await getUsers();
  return users.find(u => u.id === id) ?? null;
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const entries = await getCollection('blogs');
  return entries
    .map(toBlogPost)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

export async function getUserBlogPosts(userId: string): Promise<BlogPost[]> {
  const all = await getAllBlogPosts();
  return all.filter(p => p.userId === userId || p.coAuthors?.includes(userId));
}

export async function getBlogPost(
  userId: string,
  postSlug: string
): Promise<BlogPost | null> {
  const all = await getAllBlogPosts();
  return all.find(p => p.userId === userId && p.slug === postSlug) ?? null;
}

