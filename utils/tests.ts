export const shuffle = (str) =>
	[...str].sort(() => Math.random() - 0.5).join("");

export const pickRandomFromArray = (arr: any[]): number => {
	return Math.floor(Math.random() * arr.length);
};
