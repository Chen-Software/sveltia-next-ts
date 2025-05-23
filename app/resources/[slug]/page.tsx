import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { type Resources, allResources } from "../../../.contentlayer/generated";
import Layout from "../../../components/Layout";
import PostFooter from "../../../components/PostFooter";
import PostHeader from "../../../components/PostHeader";
import { AUTHOR_NAME, SITE_NAME, SITE_URL } from "../../../config";

// Metadata function for SEO
export async function generateMetadata({
	params,
}: {
	params: { slug: string };
}): Promise<Metadata> {
	const resource = allResources.find(
		(resource) => resource.slug === params.slug,
	) as Resources;

	if (!resource) {
		return notFound();
	}

	return {
		title: resource.title,
		description: resource.description,
		openGraph: {
			type: "article",
			url: `${SITE_URL}/resources/${resource.slug}/`,
			title: resource.title,
			description: resource.description,
			publishedTime: resource.date,
			authors: `${AUTHOR_NAME}`,
			tags: resource.tags,
			images: [
				{
					url: `${SITE_URL}${resource.image}`,
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

export default function ResourcePage({ params }: { params: { slug: string } }) {
	const resource = allResources.find(
		(resource) => resource.slug === params.slug,
	);

	if (!resource) {
		return notFound();
	}

	return (
		<Layout>
			<article className="max-w-4xl p-4 sm:p-12 sm:pt-0 m-auto">
				<PostHeader
					data={{
						title: resource.title,
						date: resource.date || "",
						templateKey: resource.templateKey,
						tags: resource.tags,
					}}
				/>
				<figure className="flex flex-col gap-2 mt-12 bg-slate-200 dark:bg-slate-700 rounded-lg overflow-hidden">
					<a
						href={resource.link}
						target="_blank"
						title={"Open resource on a new tab"}
						rel="noreferrer"
					>
						<img
							src={resource.image}
							alt={resource.title}
							className="w-full h-auto"
						/>
					</a>
				</figure>
				<div
					className="blog-post"
					dangerouslySetInnerHTML={{ __html: resource.body.html }}
				/>
				<PostFooter data={resource} />
			</article>
		</Layout>
	);
}

export function generateStaticParams() {
	return allResources.map((resource) => ({ slug: resource.slug }));
}
