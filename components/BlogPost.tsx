"use client"; // Marks this as a client component

import { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-php";
import "prismjs/components/prism-pug";
import "prismjs/components/prism-markup-templating";
import { Blog } from "../.contentlayer/generated";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import { Box } from "styled-system/jsx";

export default function BlogPost({ blog }: { blog: Blog }) {
	useEffect(() => {
		Prism.highlightAll();
	}, []);

	return (
		<Box
			as="article"
			maxWidth="5xl"
			padding={{ base: "4", sm: "12" }}
			paddingTop={{ sm: "0" }}
			margin="auto"
		>
			<PostHeader data={blog} />
			<Box
				className="blog-post"
				dangerouslySetInnerHTML={{ __html: blog.body.html }}
				css={{
					"& pre": {
						backgroundColor: "neutral.900",
						borderRadius: "md",
						padding: "1rem",
						overflow: "auto",
						margin: "1rem 0",
					},
					"& code": {
						fontFamily: "mono",
						fontSize: "sm",
					},
					"& p": {
						margin: "1rem 0",
						lineHeight: "1.8",
					},
					"& h2": {
						fontSize: "xl",
						fontWeight: "bold",
						margin: "2rem 0 1rem",
					},
					"& h3": {
						fontSize: "lg",
						fontWeight: "bold",
						margin: "1.5rem 0 1rem",
					},
					"& ul, & ol": {
						margin: "1rem 0",
						paddingLeft: "1.5rem",
					},
					"& li": {
						margin: "0.5rem 0",
					},
					"& a": {
						color: "blue.500",
						textDecoration: "underline",
						_hover: {
							color: "blue.600",
						},
					},
				}}
			/>
			<PostFooter data={blog} />
		</Box>
	);
}
