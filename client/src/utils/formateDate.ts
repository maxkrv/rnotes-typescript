export const formatDate = (date: Date): string => {
	const dateObj = new Date(date);

	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const monthName = months[dateObj.getMonth()];

	const year = dateObj.getFullYear();
	const day = dateObj.getDate();

	return `${monthName} ${day}, ${year}`;
};
