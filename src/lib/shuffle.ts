export default function shuffle(array: Array<{id: string, value: number}>) {
    let l = array.length,
		i;
	while (l) {
		i = Math.floor(Math.random() * l--);
		[array[i], array[l]] = [array[l], array[i]];
	}
	return array;
}