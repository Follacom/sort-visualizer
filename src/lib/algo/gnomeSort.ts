export function* gnomeSort(array: Array<{ id: string; value: number }>) {
	let i = 1; // start at 1 because we're comparing i-1 to i
	let j = 2; // start at 2 because we're comparing i-1 to i
	while (i < array.length) {
		if (array[i - 1].value <= array[i].value) {
			yield {
				current: array[i].id,
				next: array[i - 1].id,
				swap: false
			};
			i = j;
			j++;
		} else {
			yield {
				current: array[i].id,
				next: array[i - 1].id,
				swap: true
			};
			[array[i - 1], array[i]] = [array[i], array[i - 1]]; // swap
			i--;
			if (i === 0) {
				i = j;
				j++;
			}
		}
	}
}
