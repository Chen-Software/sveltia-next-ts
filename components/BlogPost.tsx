"use client"; // Marks this as a client component

import Prism from "prismjs";
import { useEffect } from "react";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-php";
import "prismjs/components/prism-pug";
import "prismjs/components/prism-markup-templating";
import type { Blog } from "../.contentlayer/generated";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";

export default function BlogPost({ blog }: { blog: Blog }) {
	useEffect(() => {
		Prism.highlightAll();
	}, []);

	return (
		<article className="max-w-5xl p-4 sm:p-12 sm:pt-0 m-auto">
			<PostHeader data={blog} />
			<div
				className="blog-post"
				dangerouslySetInnerHTML={{ __html: blog.body.html }}
			/>
			<PostFooter data={blog} />
		</article>
	);
}
