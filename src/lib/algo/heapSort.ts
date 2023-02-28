export function* heapSort(array: Array<{ id: string; value: number }>) {
	// max heapify the array
	for (let i = Math.floor(array.length / 2); i >= 0; i--) {
		yield* heapify(array, i);
	}

	// work backwards, moving max elements to the end of the array
	for (let i = array.length - 1; i > 0; i--) {
		yield {
			current: array[0].id,
			next: array[i].id,
			swap: true
		};
		// max element of unsorted section of array is at index 0, swap with element at last index in unsorted array
		swap(array, 0, i);

		// re-heapify array, from beginning to the end of the unsorted section
		yield* heapify(array, 0, i);
	}

	return array;
}

function* heapify(
	array: Array<{ id: string; value: number }>,
	index: number,
	length = array.length
) {
	let largest = index;
	const left = index * 2 + 1,
		right = index * 2 + 2;

	if (left < length) {
		yield {
			current: array[left].id,
			next: array[largest].id,
			swap: false
		};
		// compare element to it's left and right child
		if (array[left].value > array[largest].value) {
			largest = left;
		}
	}

	if (right < length) {
		yield {
			current: array[right].id,
			next: array[largest].id,
			swap: false
		};
		if (array[right] > array[largest]) {
			largest = right;
		}
	}

	// if the parent node isn't the largest element, swap it with the largest child
	if (largest !== index) {
		yield {
			current: array[index].id,
			next: array[largest].id,
			swap: true
		};
		swap(array, index, largest);

		// continue to heapify down
		yield* heapify(array, largest, length);
	}
}

function swap(array: Array<{ id: string; value: number }>, i: number, j: number) {
	[array[i], array[j]] = [array[j], array[i]];
}
