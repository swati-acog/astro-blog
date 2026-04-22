# User Data Management

This directory contains the decentralized data for all employees and contributors. The site is designed to be **Plug-and-Play**: as soon as you add your folder and files to GitHub, the site will automatically detect and display your profile and blogs.

## Folder Structure

```
src/content/users/
├── [your-name]/        # Folder name becomes your unique ID (e.g. 'john-doe')
│   ├── resume.md       # (MANDATORY) Your profile metadata
│   ├── [optional-img]  # Optional local profile picture
│   └── blog/           # (OPTIONAL) Your blog posts directory
│       └── my-post.md
```

## 1. Quick Start (Minimal Setup)

To join the site (e.g., just for blogging), you only need to create a folder and a `resume.md` file with the following minimal frontmatter:

```yaml
---
name: Jane Doe
avatar: https://picsum.photos/200/200  # Can be a URL or a local path like ./avatar.jpg
---

# About Me
Write a short intro here. This will appear on your profile page.
```

## 2. Professional Resume Data (Optional)

If you want a full professional profile, you can add any of the following fields. If a field is omitted, that section will simply hide itself in the UI.

```yaml
---
name: Jane Doe
avatar: ./avatar.jpg
title: Senior Engineer          # Appears below your name
bio: Designing better systems.   # A one-line tagline
email: jane@example.com
phone: "+1 234 567 890"
location:
  city: San Francisco
  country: USA
skills:
  - Rust
  - TypeScript
experience:
  - company: Innovate Ltd
    role: Backend Lead
    duration: 2021 - Present
    description: Scaling high-performance APIs.
education:
  - institution: Stanford University
    degree: M.S. in Computer Science
    year: "2021"
social:
  github: https://github.com/janedoe
  linkedin: https://linkedin.com/in/janedoe
---
```

## 3. Adding Blog Posts

To add a blog post, create a `blog/` folder inside your user directory and add `.md` files.

**Required Frontmatter for Blogs:**

```yaml
---
title: "My Journey into Coding"
date: 2024-04-21               # Format: YYYY-MM-DD
description: "A short summary" # Optional: Appears in previews
tags: ["tech", "career"]       # Optional: For future filtering
---

Your blog content goes here using standard Markdown.
```

## 4. How it Reflects in UI

- **Landing Page**: Your name, title, and avatar will appear in the directory grid.
- **Profile Page**: All your resume sections and a "Recent Blogs" list will appear at `/users/[your-folder-name]`.
- **Search**: Your profile and every individual blog post will automatically be indexed and searchable via the site search bar.
