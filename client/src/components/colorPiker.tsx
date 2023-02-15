import React, { ComponentPropsWithoutRef, FC } from "react";
import { Box, Flex } from "@chakra-ui/react";

interface ColorPikerProps extends ComponentPropsWithoutRef<"div"> {
	selectedColor: string | undefined;
	// eslint-disable-next-line no-unused-vars
	setSelectedColor: (color: string | undefined) => void;
}

const colors = [
	"#E60000",
	"#C74E00",
	"#8E6C00",
	"#008517",
	"#007A80",
	"#0073AD",
	"#A300E0",
	"#5B00EB",
];

const ColorPiker: FC<ColorPikerProps> = ({
	selectedColor,
	setSelectedColor,
}) => {
	return (
		<Flex gap="5px" flexWrap="wrap">
			{colors.map((color) => (
				<Box
					tabIndex={1}
					h="6"
					w="6"
					bg={color}
					borderWidth={selectedColor === color ? "2px" : "0px"}
					borderColor="black"
					onClick={() => setSelectedColor(color)}
					onKeyPress={(e) => {
						if (e.key === "Enter" || e.key === "space") setSelectedColor(color);
					}}
					key={color}
				/>
			))}
		</Flex>
	);
};

export default ColorPiker;
