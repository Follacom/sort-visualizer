export function* insertionSort(array: Array<{ id: string; value: number }>) {
	for (let i = 1; i < array.length; i++) {
		const current = array[i];

		let j = i - 1;

		while (j > -1 && current.value < array[j].value) {
			yield {
				current: array[j].id,
				next: array[j + 1].id,
				swap: true
			};
			array[j + 1] = array[j];
			j--;
		}
		yield {
			current: current.id,
			next: array[j + 1].id,
			swap: true
		};
		array[j + 1] = current;
	}
}
