import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";

const FourOhFour: NextPage = () => {
	const router = useRouter();

	useEffect(() => {
		router.push("/");
	}, [router]);

	return <div></div>;
};

export default FourOhFour;
