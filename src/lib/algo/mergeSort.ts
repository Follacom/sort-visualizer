export function* mergeSort(
	array: Array<{ id: string; value: number }>
) {
	if (array.length < 2) {
		return array;
	}

	const mid = array.length / 2;
	const left = array.splice(0, mid);

	const merged1 = yield* mergeSort(left);
	const merged2 = yield* mergeSort(array);

	return yield* merge(merged1, merged2);
}

function* merge(
	left: Array<{ id: string; value: number }>,
	right: Array<{ id: string; value: number }>
) {
	// : Iterator<
	// 	{ current: string; next: string; swap: boolean },
	// 	void,
	// 	{ current: string; next: string; swap: boolean }
	// >
	const array = [];
	while (left.length && right.length) {
		yield {
			current: left[0].id,
			next: right[0].id,
			swap: left[0].value > right[0].value
		};
		if (left[0].value < right[0].value) {
			array.push(left.shift());
		} else {
			array.push(right.shift());
		}
	}

	return [...array, ...left, ...right];
}
