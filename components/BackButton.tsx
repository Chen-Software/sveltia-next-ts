"use client";

import { useRouter } from "next/navigation";
import { Icon } from "./Icon";
import { Box } from "styled-system/jsx";

export default function BackButton() {
	const router = useRouter();

	return (
		<Box
			as="button"
			type="button"
			onClick={() => router.back()}
			aria-label="Go back to previous page"
			display="flex"
			alignItems="center"
			gap="2"
			fontSize="xs"
			opacity="0.6"
			transition="opacity"
			letterSpacing="wider"
			_hover={{
				opacity: "1",
			}}
		>
			<Icon name="prev" className="size-3" /> Back
		</Box>
	);
}
