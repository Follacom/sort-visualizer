export function* cocktailSort(array: Array<{ id: string; value: number }>) {
	let isSorted = true;
	while (isSorted) {
		for (let i = 0; i < array.length - 1; i++) {
			yield {
				current: array[i].id,
				next: array[i + 1].id,
				swap: array[i].value > array[i + 1].value
			};

			if (array[i].value > array[i + 1].value) {
				[array[i], array[i + 1]] = [array[i + 1], array[i]];
				isSorted = true;
			}
		}

		if (!isSorted) break;

		isSorted = false;

		for (let j = array.length - 1; j > 0; j--) {
			yield {
				current: array[j].id,
				next: array[j - 1].id,
				swap: array[j].value < array[j - 1].value
			};

			if (array[j].value < array[j - 1].value) {
				[array[j], array[j - 1]] = [array[j - 1], array[j]];
				isSorted = true;
			}
		}
	}

	return array;
}
