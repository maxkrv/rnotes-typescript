import { Head, Html, Main, NextScript } from "next/document";
import Favicon from "../components/favicon";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<Favicon />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
