# Sveltia Next.js TypeScript Starter

---

[![GitHub Pages](https://github.com/Chen-Software/sveltia-next-ts/actions/workflows/deploy-github-pages.yml/badge.svg)](https://github.com/Chen-Software/sveltia-next-ts/actions/workflows/deploy-github-pages.yml)

This open-source starter template is built with **Next.js 14**, **Park UI** (**Ark UI** + **Panda CSS**), **Contentlayer**, and **Sveltia CMS**. It's designed to be a simple and customizable way to launch a modern blog, with support for MDX and multiple categories like Code Blog, Inspiration, Podcasts, Tools, and Resources.

---

## ✨ Features

- 🛠️ **Next.js 14**: Fast, modern React framework for production-ready web applications.
- 🎨 **Park UI**: Headless UI framework for rapid UI development.
- 🐼 **Panda CSS**: Zero-runtime CSS design system styling engine.
- 📄 **MDX Support**: Write your blog posts in Markdown with JSX components.
- 🗂️ **Contentlayer**: Simple content management with files as data.
- 📋 **Sveltia CMS**: Easily manage your posts through a friendly CMS interface.
- 🏷️ **Categories**: Pre-configured sections for Code Blog, Inspiration, Podcasts, and Tools.
- 🖼️ **Optimized Images**: Use the `<ExportedImage />` component from the [`next-image-export-optimizer`](https://www.npmjs.com/package/next-image-export-optimizer) package for optimized image handling in static exports, replacing the default Next.js `<Image />` component for better control over image quality, formats (like WEBP), and cache settings.
- 🌗 **Dark/Light Mode**: Automatically adapts to the user's operating system settings.

## 📦 Tech Stack

- **Next.js 14**
- **Park UI**
- **Panda CSS**
- **MDX**
- **Contentlayer**
- **Sveltia CMS**

## 🚀 Quick Start

Follow these steps to get the project up and running:

1. **Install dependencies:**

   ```bash
   pnpm install
   ```

2. **Run the development server:**

   ```bash
   pnpm run dev
   ```

   Open http://localhost:3000 in your browser to see the app running.

---

## ✍️ Writing Content (without CMS)

You can create different types of content (like blog posts or podcasts) in separate folders under `content/`. Each folder corresponds to a category in your blog.

Content is written in **MDX** format and managed using [**Contentlayer**](https://contentlayer.dev/). To create a new post, add an `.mdx` file in the appropriate folder inside `content/` for each category:

```
content/
  ├── blog/
  ├── inspiration/
  ├── podcasts/
  ├── resources/
  └── tools/
```

Each post supports frontmatter fields like `title`, `description`, `date`, and `featured`.

Example frontmatter for a blog post:

```md
---
templateKey: blog
title: >
  Custom Scrollbar with CSS (WebKit)
date: 2021-06-19T19:28:37.629Z
featured: true
description: >
  Learn how to customize the scrollbar with CSS for WebKit browsers, providing a visually appealing design for scrollable elements on your website.
tags:
  - web-development
  - css
---

Your markdown content here...
```

Example inspiration post, with a video:

```md
---
templateKey: inspiration
title: >
  2Advanced Studios — Flash website in 2003
date: 2003-03-03T15:04:10.000Z
featured: true
description: >
  An old flash website (v4) of 2advanced.com, that has inspired me quite a lot in my teenage years.
tags:
  - animation
  - flash
  - website
image: /media/2advanced-flash-website-v4-2003.jpg
---

<Video src="/media/2advanced-flash-website-v4-2003.mp4" />

## © 2003 Advanced Studios

Currently, the 2Advanced Studios are closed for real, since some years already.
```

## 🖥️ Sveltia CMS

The local development server will automatically start a [Sveltia CMS](https://sveltia.dev/) development server alongside your Next.js development server when you run:

```bash
pnpm run dev
```

You can then access the CMS at http://localhost:3000/admin/index.html.

> [!NOTE]  
> If you'd like to test the CMS locally, set `local_backend: true` in `public/admin/config.yml`. Don't forget to restart the server after making changes.

---

## 📖 Configuration

Customize the project to suit your needs by editing the following files:

- [`config.js`](https://git.chen.software/sveltia-next-ts/tree/config.js): Your Bleg Starter configuration.
- [`panda.config.js`](https://git.chen.software/sveltia-next-ts/tree/panda.config.js): Panda CSS configuration.
- [`next.config.js`](https://git.chen.software/sveltia-next-ts/tree/next.config.js): Next.js custom settings.
- [`next-seo.config.js`](https://git.chen.software/sveltia-next-ts/tree/next-seo.config.js): SEO configuration for Next.js.
- [`contentlayer.config.js`](https://git.chen.software/sveltia-next-ts/tree/contentlayer.config.ts): Contentlayer configuration for MDX files.
- [`public/admin/config.yml`](https://git.chen.software/sveltia-next-ts/tree/public/admin/config.yml): Decap CMS configuration.

### `next.config.js`:

- The project uses the [**`next-image-export-optimizer`**](https://www.npmjs.com/package/next-image-export-optimizer) package to enhance image handling in static exports.
- Custom settings for image optimization:
  - **Image Folder**: Images are stored in the `public/media` folder.
  - **Export Settings**: Optimized images are exported to the `out/` folder.
  - **Quality**: Image quality is set to **75%**.
  - **WEBP Format**: By default, the images are converted to **WEBP** for improved performance.
  - **Blurred Placeholder**: Blurry placeholders are enabled for a smoother loading experience. To disable this, set `nextImageExportOptimizer_generateAndUseBlurImages` to `false` in your `.next.config.js` file, and pass `placeholder="empty"` to all `<ExportedImage>` components.

> [!NOTE]  
> Replace Next.js `<Image />` components with `<ExportedImage />` to leverage these optimizations.

Example usage:

```tsx
import ExportedImage from 'next-image-export-optimizer'

<ExportedImage
  src="/media/example.jpg"
  alt="Example Image"
  width={800}
  height={600}
  placeholder="blur"
/>
```

### TypeScript and Contentlayer Integration

This project uses [**Contentlayer**](https://contentlayer.dev/) to [automatically generate TypeScript types for your content](https://contentlayer.dev/docs/concepts/type-safety). The configuration is managed in the `contentlayer.config.ts` file located at the root of the project. Each document type (e.g., Blog, Inspiration, Podcasts, Tools, Pages) has its own structure and generated types, ensuring type safety when working with content in your components.

Below is an example of the TypeScript types generated for the **Blog** document:

```ts
import { defineDocumentType, makeSource } from 'contentlayer2/source-files'

const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: `blog/*.md`,
  contentType: 'markdown',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: false },
    description: { type: 'string', required: false },
    tags: { type: 'json', required: false },
    templateKey: { type: 'string', required: true },
    featured: { type: 'boolean', required: false },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.md/, ''),
    },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Page, Blog, Inspiration, Podcasts, Tools, Resources],
  disableImportAliasWarning: true,
})
```

> [!NOTE]  
> The `slug` field is automatically computed from the filename, removing the `.md` extension.

#### Where to Find the Generated Types

The types are generated into the `./.contentlayer` directory and can be used throughout the application. Simply import the types from there:

```tsx
import { allBlogs, Blog } from '../../.contentlayer/generated')
import { pick } from '@contentlayer2/client'
```

#### Working with Content in Components

When working with content in your components, you can use the generated types to ensure type safety. For example, when mapping over blog posts:

```tsx
let blogs = allBlogs.map((blog) => pick(blog, ['title', 'date', 'slug', 'description', 'templateKey'])
```

In this example, `allBlogs` is an array of `Blog` types, and we're using the `pick` function to select specific fields from each blog post.

#### Type Assertion

When working with content from `allBlogs`, you can assert the type to ensure it's a `Blog` type:

```tsx
const blog = allBlogs.find((b) => b.slug === params.slug) as Blog
```

This way, you can access the fields of the `Blog` type without any issues.

#### Passing Content to Components

When passing content to components, you can use the `Blog` type to ensure the correct structure:

```tsx
<BlogPostCard key={post.slug} post={post as Blog} />
```

With these types in place, you can benefit from strong typing and auto-completion when working with your content.

---

## 🚀 Deploy

### Deploy to GitHub Pages

Deploy your own instance of this blog starter project using one of the following providers:

[![Deploy to GitHub Pages](https://github.com/Chen-Software/sveltia-next-ts/actions/workflows/deploy-github-pages.yml/badge.svg)](https://github.com/Chen-Software/sveltia-next-ts/actions/workflows/deploy-github-pages.yml)

### Deploy to Netlify

Deploy your own instance of this blog starter project using one of the following providers:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Chen-Software/sveltia-next-ts)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/Chen-Software/sveltia-next-ts)

> [!NOTE]  
> If you encounter errors related to **`sharp`** during deployment, please try removing the `package-lock.json` file, as this can sometimes resolve issues with Sharp's dependencies.

### Setting up Sveltia CMS

If you're deploying your site using GitHub as backend and using Sveltia CMS for content management.

> [!TIP]  
> For more information on setting up GitHub backend with Sveltia CMS, see: https://github.com/sveltia/sveltia-cms.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](/LICENSE) file for details.

---

## 📣 Contributing

Contributions are welcome! Here are some ways you can help improve the project:

- **Bug Fixes**: If you encounter any issues, please submit an issue or pull request to address it.
- **Feature Additions**: Have an idea for a new feature? Open an issue to discuss it or submit a pull request with your implementation.
- **Documentation Improvements**: Help us enhance the README by suggesting edits or additional information.

### How to Contribute

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Make your changes
4. Push to your branch (`git push origin feature/your-feature-name`)
5. Create a pull request

Thank you for considering contributing to the project!

## 🔗 Links

- [Demo](https://sveltia.chen.software/)
- [Documentation](https://git.chen.software/sveltia-next-ts/tree/README.md)
- [Git Repo](https://git.chen.software/sveltia-next-ts)

---

## 🙌 Acknowledgments

Built with ❤️ in 🇮🇪, 🇵🇹 and 🇧🇪 using [Next.js](https://nextjs.org/) (an amazing open-source React framework), [Panda CSS](https://panda-css.com/) (for rapid UI development), [Contentlayer](https://contentlayer.dev/) (for managing content), and [Sveltia CMS](https://sveltia.dev/) (for a user-friendly content management experience).

A big thank you to the communities behind these projects for their hard work and dedication!
