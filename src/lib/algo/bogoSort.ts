export function* bogoSort(array: Array<{ id: string; value: number }>) {
	while (!sorted(array)) {
		array = yield* shuffle(array);
	}
}

function* shuffle(array: Array<{ id: string; value: number }>) {
	let m = array.length,
		t,
		i;

	while (m) {
		i = Math.floor(Math.random() * m--);

		yield {
			current: array[m].id,
			next: array[i].id,
			swap: true
		};

		t = array[m];
		array[m] = array[i];
		array[i] = t;
	}

	return array;
}

function sorted(array: Array<{ id: string; value: number }>) {
	let sorted = true;

	for (let i = 0; i < array.length - 1; i++) {
		if (array[i + 1].value < array[i].value) {
			sorted = false;
		}
	}

	return sorted;
}
