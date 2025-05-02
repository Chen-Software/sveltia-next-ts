"use client";

import React from "react";
import { Box } from "styled-system/jsx";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<Box width="full" maxWidth="full" paddingTop={"24px"}>
			{children}
		</Box>
	);
};
export default Layout;
