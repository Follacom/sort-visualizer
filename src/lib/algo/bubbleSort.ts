export function* bubbleSort(
	array: Array<{ id: string; value: number }>
): Iterator<
	{ current: string; next: string; swap: boolean },
	void,
	{ current: string; next: string; swap: boolean }
> {
	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < array.length - i - 1; j++) {
			yield {
				current: array[j].id,
				next: array[j + 1].id,
				swap: array[j].value > array[j + 1].value
			};
			if (array[j].value > array[j + 1].value) {
				[array[j], array[j + 1]] = [array[j + 1], array[j]];
			}
		}
	}
}
