import { pick } from "@contentlayer2/client";
import type { Metadata } from "next";
import { type Blog, allBlogs } from "../../.contentlayer/generated";
import CategoryHeader from "../../components/CategoryHeader";
import Layout from "../../components/Layout";
import BlogPostCard from "../../components/cards/BlogPostCard";
import { SITE_NAME, SITE_URL } from "../../config";
import { sortByDate } from "../../utils";
import { extractUniqueTags } from "../../utils/tags";

export function generateMetadata(): Metadata {
	const SEO = {
		title: "Code Blog by Nuno Marques | Design & Development Tips",
		description:
			"Discover the latest blogs on code, web design and development. Stay up to date with the latest trends and technologies, with code examples.",
		image: `${SITE_URL}/og-card.png`,
	};

	return {
		title: SEO.title,
		description: SEO.description,
		openGraph: {
			url: `${SITE_URL}/blog/`,
			title: SEO.title,
			description: SEO.description,
			images: [
				{
					url: SEO.image,
					width: 1600,
					height: 800,
					alt: `${SITE_NAME}`,
					type: "image/jpeg",
				},
			],
			siteName: `${SITE_NAME}`,
		},
	};
}

export default function BlogPage({ params }: { params: { page: string } }) {
	const currentPage = Number.parseInt(params.page || "1", 10);

	// Pick relevant fields from blogs and sort by date
	let blogs = allBlogs.map((blog) =>
		pick(blog, ["title", "date", "slug", "description", "templateKey"]),
	);
	blogs = blogs.sort(sortByDate);

	// Group blogs by year
	const groupedBlogs = blogs.reduce((acc: Record<string, Blog[]>, blog) => {
		const year =
			(blog.date && new Date(blog.date).getFullYear().toString()) || "unknown";
		if (!acc[year]) acc[year] = [];
		acc[year].push(blog as Blog);
		return acc;
	}, {});

	const uniqueTags = extractUniqueTags(allBlogs);

	return (
		<Layout>
			<section className="md:max-w-[87%] m-auto flex flex-col gap-6 px-4 sm:px-12 mb-32">
				<CategoryHeader title="Code Blog" templateKey={blogs[0].templateKey} />

				<div className="flex gap-8 items-start">
					<div className="flex flex-wrap gap-4 w-full">
						{Object.keys(groupedBlogs)
							.sort((a, b) => Number.parseInt(b) - Number.parseInt(a))
							.map((year) => (
								<div key={year}>
									<h2 className="text-2xl mb-8 text-slate-700 dark:text-slate-300">
										{year}
									</h2>
									<div
										className={`grid ${
											groupedBlogs[year].length < 2
												? "xl:grid-cols-2"
												: "xl:grid-cols-3"
										} gap-4 mb-24`}
									>
										{groupedBlogs[year].map((post) => (
											<BlogPostCard key={post.slug} post={post as Blog} />
										))}
									</div>
								</div>
							))}
					</div>
				</div>
			</section>
		</Layout>
	);
}
