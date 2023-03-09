export function extractFromArrayAt(array: Array<any>, extractIndexes: Array<number>) {
	const removed: Array<any> = [];
	const extracted = array
		.map((value, index) => (extractIndexes.includes(index) ? removed.push(value) : value))
		.filter((value, index) => !extractIndexes.includes(index));
	array.length = 0;
	extracted.forEach((value) => array.push(value));
	return removed;
}
