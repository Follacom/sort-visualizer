import guidGenerator from './guid';

function getRandomBars(n: number) {
	const bars = [];
	for (let i = 0; i < n; i++) {
		bars.push({
			id: guidGenerator(),
			value: Math.floor(Math.random() * (50 - 1 + 1) + 1)
		});
	}
	return bars;
}

export default getRandomBars;
