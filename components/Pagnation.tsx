import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Box, Stack } from "styled-system/jsx";

function Pagnation({ totalPostCount }: { totalPostCount: number }) {
	let router = useRouter();

	/*
   pages give number,base on number we create a array. base on array we map a list elements
   totalPostCount = 3
   conver into array [0,1,2]
   base on array create list in array
   
  */

	let pageIntoArray = Array.from(Array(totalPostCount).keys());

	return (
		// @ts-expect-error
		<Box as="nav" aria-label="Pagination" margin="6">
			<Stack
				// @ts-expect-error
				as="ul"
				direction="horizontal"
				justify="center"
				listStyle="none"
				padding="0"
				margin="0"
			>
				{pageIntoArray.map((page) => (
					// @ts-expect-error
					<Box as="li" key={page} padding="2">
						<Box
							// @ts-expect-error
							as={Link}
							href={page === 0 ? "/" : `/page/${page + 1}`}
							display="block"
							padding="2 4"
							color="neutral.700"
							textDecoration="none"
							borderRadius="md"
							transition="all 0.2s"
							_hover={{
								backgroundColor: "neutral.100",
								color: "neutral.900",
							}}
							_dark={{
								color: "neutral.300",
								_hover: {
									backgroundColor: "neutral.800",
									color: "neutral.100",
								},
							}}
						>
							{page + 1}
						</Box>
					</Box>
				))}
			</Stack>
		</Box>
	);
}

export default Pagnation;
