import { Box } from "styled-system/jsx";

export default function Video({ src }: { src: string }) {
	return (
		<Box as="p">
			<Box
				as="video"
				src={src}
				preload="auto"
				controls
				disablePictureInPicture
				controlsList="nodownload noremoteplayback noplaybackrate"
				width="full"
				backgroundColor="neutral.500"
			/>
		</Box>
	);
}
