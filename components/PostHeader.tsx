import { Box, Stack } from "styled-system/jsx";
import Link from "next/link";
import { Icon } from 'components/ui/icon';
import { BookIcon, WrenchIcon, PodcastIcon, LightbulbIcon } from 'lucide-react';
import { AUTHOR_NAME } from "../config";
import { formatDate } from "../utils";

const iconMap = {
  blog: BookIcon,
  tools: WrenchIcon,
  podcasts: PodcastIcon,
  inspiration: LightbulbIcon
} as const;

interface PostHeaderProps {
	data: {
		title: string;
		date: string;
		templateKey: string;
		tags: string[];
	};
}

export default function PostHeader({ data }: PostHeaderProps) {
	return (
		<Box
			// @ts-expect-error
			as="header"
			marginBottom="8"
		>
			<Stack direction="vertical" gap="4">
				<Box
					// @ts-expect-error
					as="h1"
					fontSize="4xl"
					fontWeight="bold"
					lineHeight="tight"
					color="neutral.900"
					_dark={{
						color: "neutral.100",
					}}
				>
					{data.title}
				</Box>
				<Box
					display="flex"
					gap="4"
					alignItems="center"
					fontSize="xs"
					sm={{
						fontSize: "base",
					}}
				>
					<Link href={`/${data.templateKey}`}>
						<Box
							// @ts-expect-error
							as="span"
							display="flex"
							gap="2"
							alignItems="center"
							padding="2 3"
							borderRadius="lg"
							color="neutral.100"
							backgroundColor="neutral.700"
							_dark={{
								color: "neutral.800",
								backgroundColor: "neutral.200",
							}}
							_hover={{
								textDecoration: "underline",
							}}
						>
							<Icon className="size-4">
								{iconMap[data.templateKey]?.()}
							</Icon>
							<Box
								// @ts-expect-error
								as="span"
								fontWeight="semibold"
								sm={{
									fontSize: "sm",
								}}
							>
								{data.templateKey &&
									data.templateKey.charAt(0).toUpperCase() +
										data.templateKey.slice(1)}
							</Box>
						</Box>
					</Link>
					<Box
						// @ts-expect-error
						as="p"
						letterSpacing="wide"
						lineHeight="4"
					>
						<Box
							// @ts-expect-error
							as="small"
						>
							Posted by{" "}
							<Link href="/about/">
								<Box
									// @ts-expect-error
									as="span"
									fontWeight="semibold"
									_hover={{
										textDecoration: "underline",
									}}
								>
									{AUTHOR_NAME}
								</Box>
							</Link>{" "}
							<Box
								// @ts-expect-error
								as="span"
								display="inline-flex"
							>
								{" "}
								on {formatDate(new Date(data.date))}
							</Box>
						</Box>
					</Box>
				</Box>
			</Stack>
		</Box>
	);
}
