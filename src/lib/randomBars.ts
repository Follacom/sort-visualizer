import guidGenerator from './guid';

function getRandomBars(n: number) {
	const bars = [...new Array(n).keys()].map((b) => ({
		id: guidGenerator(),
		value: (100 / n) * b + 10
	}));
	let l = bars.length,
		i;
	while (l) {
		i = Math.floor(Math.random() * l--);
		[bars[i], bars[l]] = [bars[l], bars[i]];
	}
	return bars;
}

export default getRandomBars;
