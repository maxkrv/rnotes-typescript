// eslint-disable-next-line import/no-anonymous-default-export
export default {
	title: "Rnotes",
	description: "Free, safe to-dos and notes.",
	canonical: `${process.env.NEXT_PUBLIC_CLIENT_URL}`,
	openGraph: {
		type: "website",
		locale: "en_IE",
		url: `${process.env.NEXT_PUBLIC_CLIENT_URL}`,
		site_name: "Rnotes",
		title: "Rnotes",
		description: "Free, safe to-dos and notes.",
		images: [
			{
				url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/favicon/favicon-32x32.png`,
				width: 32,
				height: 32,
				alt: "Rnotes",
			},
		],
	},
	twitter: {
		handle: "@leenp1ck",
		site: "@rnotes",
		cardType: "summary_large_image",
	},
};
