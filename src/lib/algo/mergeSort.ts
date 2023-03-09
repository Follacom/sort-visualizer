export function* mergeSort(array: Array<{ id: string; value: number }>) {
	const length = array.length;
	if (length < 2) {
		return array;
	}

	const mid = length / 2;
	const left = array.slice(0, mid);
	const right = array.slice(mid, length);

	const merged1 = yield* mergeSort(left);
	const merged2 = yield* mergeSort(right);

	return yield* merge(merged1, merged2);
}

function* merge(
	left: Array<{ id: string; value: number }>,
	right: Array<{ id: string; value: number }>
) {
	const array = [];
	while (left.length && right.length) {
		yield {
			current: left[0].id,
			next: right[0].id,
			extract: left[0].value > right[0].value
		};
		if (left[0].value < right[0].value) {
			array.push(left.shift());
		} else {
			array.push(right.shift());
		}
	}

	return [...array, ...left, ...right];
}
