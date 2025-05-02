"use client"; // Marks this as a client component

import type { MDXComponents } from "mdx/types";
import { useMDXComponent } from "next-contentlayer2/hooks";
import Link from "next/link";
import type { Inspiration } from "../.contentlayer/generated";
import Video from ".//Video";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";

export default function InspirationPost({
	inspiration,
}: {
	inspiration: Inspiration;
}) {
	const MDXContent = useMDXComponent(inspiration.body.code);

	// Define custom MDX components.
	const mdxComponents: MDXComponents = {
		// Override the default <a> element to use the next/link component.
		a: ({ href, children }) => <Link href={href as string}>{children}</Link>,
		Video: ({ src }) => <Video src={src as string} />,

		// Add more custom components...
	};

	return (
		<article className="max-w-5xl p-4 sm:p-12 sm:pt-0 m-auto">
			<PostHeader
				data={{
					title: inspiration.title,
					date: inspiration.date || "",
					templateKey: inspiration.templateKey,
					tags: inspiration.tags,
				}}
			/>

			<div className="blog-post mt-12">
				<MDXContent components={mdxComponents} />
			</div>

			<PostFooter data={inspiration as Inspiration} />
		</article>
	);
}
