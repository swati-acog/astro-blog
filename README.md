# Astro Aganitha: Multi-User Portfolio & Blog

A professional, decentralized multi-user portfolio and blog platform built with [Astro](https://astro.build/) and [Bun](https://bun.sh/). This platform allows organizations or groups to host individual member portfolios and a collective blog feed in a single static site.

## 🚀 Key Features

- **Standardized Content Architecture**: Uses Astro's latest Content Layer with native loaders.
- **Type-Safe Schema**: Powered by Zod for rigorous validation of all markdown frontmatter.
- **Dynamic Portfolios**: Automatically generated resumes and project pages for every user.
- **Unified Blog Feed**: Centralized view aggregating posts from all members with co-author support.
- **Integrated Search**: Fast, full-text search across all profiles and blogs via [Pagefind](https://pagefind.app/).
- **Performance Optimized**: Static Site Generation (SSG) with optimized build-time data processing.

## 🛠️ Getting Started

### Prerequisites
- [Bun](https://bun.sh/) (Runtime & Package Manager)

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


## 🧑‍💻 How to Add Content

### 1. Add a User Profile
Create a file at `src/content/users/[your-name].md`.

```markdown
---
# required fields
name: "Your Name"
avatar: "https://url-to-your-image.jpg" # or path relative to /public

# optional fields
title: "Your Professional Title"
bio: "A short bio about yourself."
email: "your@email.com"
location:
  city: "San Francisco"
  country: "USA"
skills: ["React", "Astro", "Node.js"]
experience:
  - company: "Company Name"
    role: "Your Role"
    duration: "2020 - Present"
    description: "Key responsibilities and achievements."
education:
  - institution: "University of Tech"
    degree: "Computer Science"
    year: "2022"
social:
  github: "yourusername"
  linkedin: "yourusername"
---
Your long-form bio goes here.
```

### 2. Add a Blog Post
Create a file at `src/content/blogs/[your-name]/[post-slug].md`.

```markdown
---
# required fields
title: "Building Scalable Systems"
date: "2024-05-20" # format: (YYYY-MM-DD)

# optional fields
description: "A deep dive into architecture."
tags: ["engineering", "systems"]
# coAuthors: ["another-user"]
---
Your blog content goes here...
```

## 🧞 Maintenance Commands

| Command             | Action                                           |
| :------------------ | :----------------------------------------------- |
| `bun install`       | Synchronize dependencies                         |
| `bun dev`           | Local development with HMR                       |
| `bun run build`     | Generate production-ready static assets          |
| `bun run preview`   | Local server for testing the production build    |
| `bun astro ...`     | Direct access to Astro CLI                       |
