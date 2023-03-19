import React, { FC, HTMLAttributes } from "react";
import { Flex, IconButton } from "@chakra-ui/react";
import { BsGithub, BsLinkedin } from "react-icons/bs";

interface SocialsProps extends HTMLAttributes<HTMLDivElement> {}

const Socials: FC<SocialsProps> = ({ ...props }) => {
	return (
		<Flex gap="5px" {...props}>
			<IconButton
				as="a"
				href="https://github.com/maxkrv/rnotes-typescript"
				target="_blank"
				aria-label="github link"
			>
				<BsGithub />
			</IconButton>
			<IconButton
				as="a"
				href="https://www.linkedin.com/in/maxkrv/"
				target="_blank"
				aria-label="linkedin link"
			>
				<BsLinkedin />
			</IconButton>
		</Flex>
	);
};

export default Socials;
