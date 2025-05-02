import { Icon } from "components/ui/icon";
import { BookIcon, WrenchIcon, PodcastIcon, LightbulbIcon } from "lucide-react";
import { Box, Stack } from "styled-system/jsx";

const iconMap = {
	blog: BookIcon,
	tools: WrenchIcon,
	podcasts: PodcastIcon,
	inspiration: LightbulbIcon,
} as const;

interface Props {
	title: string;
	templateKey: keyof typeof iconMap;
}

export default function CategoryHeader({ title, templateKey }: Props) {
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
					<Icon className="size-6 sm:size-8 opacity-60">
						{iconMap[templateKey]()}
					</Icon>
					<Box>{title}</Box>
				</Stack>
			</Box>
		</Box>
	);
}
