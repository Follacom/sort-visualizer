function split(array: Array<number>) {
	const splitPoint = Math.floor((array.length - 1) / 2);
	const split1: Array<number> = [],
		split2: Array<number> = [];
	array.forEach((el, index) => {
		if (index <= splitPoint) {
			split1.push(el);
		} else {
			split2.push(el);
		}
	});
	return [split1, split2];
}

export default split;
