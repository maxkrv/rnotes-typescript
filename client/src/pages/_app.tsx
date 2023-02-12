import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "../store/store";
import { DehydratedState, QueryClient } from "@tanstack/query-core";
import { useState } from "react";
import { Hydrate, QueryClientProvider } from "@tanstack/react-query";
import Layout from "../components/layout";
import AuthProvider from "../providers/authProvider";
import SEO from "../../seo.config";
import { DefaultSeo } from "next-seo";

export default function App({
	Component,
	pageProps,
}: AppProps<{ dehydratedState: DehydratedState }>) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false,
					},
				},
			})
	);

	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<Provider store={store}>
					<ChakraProvider>
						<AuthProvider>
							<Layout>
								<DefaultSeo {...SEO} />
								<Component {...pageProps} />
							</Layout>
						</AuthProvider>
					</ChakraProvider>
				</Provider>
			</Hydrate>
		</QueryClientProvider>
	);
}
