import matter from 'gray-matter';

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
  /** URL string (https://…) or a path relative to /public */
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
  /** Other user IDs who co-authored this post. The post lives in userId's folder. */
  coAuthors?: string[];
  body: string;
}

// ── Static glob imports — resolved by Vite at bundle time ────────────────────
// No runtime filesystem access; works in any execution context.

const resumeRaw = import.meta.glob<string>('../content/users/*/resume.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const blogRaw = import.meta.glob<string>('../content/users/*/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

// ── Helpers ───────────────────────────────────────────────────────────────────

function userIdFromResumePath(path: string): string {
  // '../content/users/swati/resume.md' → 'swati'
  const m = path.match(/\/users\/([^/]+)\/resume\.md$/);
  if (!m) throw new Error(`Unexpected resume path: ${path}`);
  return m[1];
}

function parseBlogPath(path: string): { userId: string; slug: string } {
  // '../content/users/swati/blog/my-post.md' → { userId: 'swati', slug: 'my-post' }
  const m = path.match(/\/users\/([^/]+)\/blog\/([^/]+)\.mdx?$/);
  if (!m) throw new Error(`Unexpected blog path: ${path}`);
  return { userId: m[1], slug: m[2] };
}

function buildUser(id: string, raw: string): User {
  const { data, content } = matter(raw);
  return {
    id,
    name: data.name ?? id,
    avatar: data.avatar ?? '',
    title: data.title,
    bio: data.bio,
    email: data.email,
    phone: data.phone,
    location: data.location,
    skills: data.skills ?? [],
    experience: data.experience ?? [],
    education: data.education ?? [],
    social: data.social,
    body: content,
  };
}

function buildBlogPost(userId: string, slug: string, raw: string): BlogPost {
  const { data, content } = matter(raw);
  return {
    id: `${userId}/${slug}`,
    userId,
    slug,
    title: data.title ?? slug,
    date: data.date ? new Date(data.date) : new Date(),
    description: data.description,
    tags: data.tags,
    coAuthors: Array.isArray(data.coAuthors) ? data.coAuthors : undefined,
    body: content,
  };
}

// ── Pre-built collections (populated at module init = build time) ─────────────

const _users: User[] = Object.entries(resumeRaw)
  .map(([path, raw]) => buildUser(userIdFromResumePath(path), raw))
  .sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));

const _posts: BlogPost[] = Object.entries(blogRaw)
  .map(([path, raw]) => {
    const { userId, slug } = parseBlogPath(path);
    return buildBlogPost(userId, slug, raw);
  })
  .sort((a, b) => b.date.getTime() - a.date.getTime());

// ── Public API (async for backward compatibility) ─────────────────────────────

export async function getUsers(): Promise<User[]> {
  return _users;
}

export async function getUser(id: string): Promise<User | null> {
  return _users.find(u => u.id === id) ?? null;
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  return _posts;
}

export async function getUserBlogPosts(userId: string): Promise<BlogPost[]> {
  return _posts.filter(
    p => p.userId === userId || p.coAuthors?.includes(userId)
  );
}

export async function getBlogPost(
  userId: string,
  postSlug: string
): Promise<BlogPost | null> {
  return _posts.find(p => p.userId === userId && p.slug === postSlug) ?? null;
}
