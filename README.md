# Astro Aganitha: Multi-User Portfolio & Blog

A professional, decentralized multi-user portfolio and blog platform built with [Astro](https://astro.build/) and [Bun](https://bun.sh/). This platform allows organizations or groups to host individual member portfolios and a collective blog feed in a single static site.

## 🚀 Key Features

- **Decentralized Content**: Each user manages their own data in dedicated directories.
- **Dynamic Portfolios**: Automatically generated resumes and project pages for every user.
- **Global Blog Feed**: A centralized view aggregating posts from all members.
- **Integrated Search**: Fast, full-text search across all profiles and blogs using [Pagefind](https://pagefind.app/).
- **Static First**: High performance and easy deployment with Static Site Generation (SSG).

## 🛠️ Getting Started

### Prerequisites
- [Bun](https://bun.sh/) installed on your machine.

### Installation
```sh
bun install
```

### Development
```sh
bun dev
```
Starts the local development server at `http://localhost:4321`.

### Build
```sh
bun run build
```
Builds the static site to the `dist/` directory.

## 🧑‍💻 How to Add Your Content

This platform uses a file-based content management system. To add yourself to the site:

### 1. Create your user directory
Create a new folder in `src/content/users/` named after your unique slug (e.g., `src/content/users/your-name/`).

### 2. Add your Resume/Profile
Create a `resume.md` file in your directory with the following frontmatter:

```markdown
---
name: "Your Name"
title: "Your Professional Title"
avatar: "https://url-to-your-image.jpg" # or path relative to /public
bio: "A short bio about yourself."
email: "your@email.com"
location:
  city: "City"
  country: "Country"
skills: ["Skill 1", "Skill 2"]
experience:
  - company: "Company Name"
    role: "Your Role"
    duration: "2020 - Present"
    description: "Key responsibilities and achievements."
education:
  - institution: "University Name"
    degree: "Degree Name"
    year: "2020"
social:
  github: "yourusername"
  linkedin: "yourusername"
---

Your long-form bio or additional details go here.
```

### 3. Add Blog Posts
Create a `blog/` folder inside your user directory. Add markdown files (e.g., `my-first-post.md`) with the following frontmatter:

```markdown
---
title: "My First Blog Post"
date: "2024-04-23"
description: "A brief summary of what this post is about."
tags: ["tech", "astro"]
# coAuthors: ["another-user-slug"] # Optional
---

Your blog content goes here...
```

## 📂 Project Structure

```text
/
├── public/          # Static assets
├── src/
│   ├── components/  # Shared components (ProfileHeader, BlogPostCard, etc.)
│   ├── content/
│   │   └── users/   # User-specific data (The core "database")
│   ├── layouts/     # Page templates
│   ├── lib/         # Content loading logic (src/lib/content.ts)
│   └── pages/       # Routing (Home, Blogs, Search, User Profiles)
├── astro.config.mjs
└── package.json
```

## 🧞 Commands

| Command             | Action                                           |
| :------------------ | :----------------------------------------------- |
| `bun install`       | Installs dependencies                            |
| `bun dev`           | Starts local dev server at `localhost:4321`      |
| `bun run build`     | Build your production site to `./dist/`          |
| `bun run preview`   | Preview your build locally                       |
| `bun astro ...`     | Run Astro-specific CLI commands                  |
