import Link from "next/link";
import { Box } from "styled-system/jsx";

export default function Tag({ tag }: { tag: string }) {
	return (
		<Box
			as={Link}
			key={tag}
			href={`/tags/${tag}/`}
			title={`See all posts for "${tag}" tag`}
			padding="2 3"
			backgroundColor="neutral.200"
			color="neutral.900"
			borderRadius="sm"
			fontFamily="mono"
			fontSize="sm"
			transition="colors"
			_hover={{
				backgroundColor: "neutral.700",
				color: "neutral.100",
			}}
			_dark={{
				backgroundColor: "neutral.700",
				color: "neutral.100",
				_hover: {
					backgroundColor: "neutral.200",
					color: "neutral.900",
				},
			}}
		>
			#{tag}
		</Box>
	);
}
