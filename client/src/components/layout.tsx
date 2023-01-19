import React, { ComponentPropsWithoutRef, FC } from "react";
import { Container } from "@chakra-ui/react";

const Layout: FC<ComponentPropsWithoutRef<"div">> = ({
	children,
	...props
}) => {
	return (
		<Container height="100%" maxW="6xl" {...props}>
			{children}
		</Container>
	);
};

export default Layout;
