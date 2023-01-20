import React, { ComponentPropsWithoutRef, FC } from "react";
import { IconButton, useColorMode } from "@chakra-ui/react";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";

const ColorModeSwitcher: FC<ComponentPropsWithoutRef<"button">> = ({
	...props
}) => {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<IconButton
			aria-label="change theme"
			icon={colorMode === "light" ? <BsFillMoonStarsFill /> : <BsFillSunFill />}
			onClick={toggleColorMode}
			{...props}
		/>
	);
};

export default ColorModeSwitcher;
