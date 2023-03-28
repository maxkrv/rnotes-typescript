import React, {
	ComponentPropsWithoutRef,
	FC,
	useEffect,
	useState,
} from "react";
import { Container, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Header from "./header/header";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import Link from "next/link";

const Layout: FC<ComponentPropsWithoutRef<"div">> = ({
	children,
	...props
}) => {
	const { pathname } = useRouter();
	const bg = useColorModeValue("gray.300", "gray.700");
	const [tabIndex, setTabIndex] = useState(0);

	useEffect(() => {
		if (pathname === "/notes" || pathname === "/notes/[noteId]") {
			setTabIndex(0);
		} else if (pathname === "/todos" || pathname === "/todos/[todoId]") {
			setTabIndex(1);
		}
	}, [pathname]);

	return (
		<Container
			display="flex"
			flexDirection="column"
			flex="1"
			height="100%"
			maxW="6xl"
			{...props}
		>
			{pathname !== "/" && <Header />}
			{pathname === "/" || pathname === "/activate/[link]" ? (
				children
			) : (
				<Tabs
					display="flex"
					flexDirection="column"
					flex="1"
					my="6"
					overflow="hidden"
					isFitted
					variant="solid-rounded"
					index={tabIndex}
					onChange={(index) => setTabIndex(index)}
				>
					<TabList>
						<Tab borderRadius="0px" as={Link} href="/notes">
							Notes
						</Tab>
						<Tab borderRadius="0px" as={Link} href="/todos">
							To-dos
						</Tab>
					</TabList>
					<TabPanels bg={bg} flex="1" height="100%">
						<TabPanel height="100%" width="100%">
							{children}
						</TabPanel>
						<TabPanel height="100%" width="100%">
							{children}
						</TabPanel>
					</TabPanels>
				</Tabs>
			)}
		</Container>
	);
};

export default Layout;
