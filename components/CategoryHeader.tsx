import { Icon } from "./Icon";
import { Box, Stack } from "styled-system/jsx";

export default function CategoryHeader({
	title,
	templateKey,
}: {
	title: string;
	templateKey: string;
}) {
	return (
		<Box
			// @ts-expect-error
			as="header"
			display="flex"
			justifyContent="center"
			alignItems="flex-end"
			marginBottom="12"
		>
			<Box>
				<Stack
					direction="horizontal"
					align="center"
					gap="3"
					fontSize={{ base: "3xl", md: "4xl" }}
					fontWeight="bold"
				>
					<Icon name={templateKey} className="size-6 sm:size-8 opacity-60" />
					<Box>{title}</Box>
				</Stack>
			</Box>
		</Box>
	);
}
