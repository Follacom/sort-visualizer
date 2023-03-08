import getRandomBars from '$lib/randomBars';
import shuffle from '$lib/shuffle';
import { describe, it, expect } from 'vitest';
import { bubbleSort } from './bubbleSort';
import { mergeSort } from './mergeSort';
import { writeFile } from 'fs/promises';
import { cwd } from 'process';

async function log(msg: string, truncate?: boolean) {
	await writeFile(`${cwd()}/tests/sorting_algorithms_tests.txt`, `${msg}\r\n`, {
		flag: truncate ? 'w+' : 'a+'
	});
}

describe('Sorting algorithms tests', async () => {
	await log('', true);
	let bars = getRandomBars(50);
	let currentIndex: number, nextIndex: number;

	it('Bubble sorting test', async () => {
		bars = shuffle(bars);
		const algo = bubbleSort(bars);
		let sorted = false;

		do {
			const { done, value } = algo.next();

			if (!done) {
				expect(value).to.not.be.undefined;
			}

			if (done) {
				sorted = true;
			}
			if (value && !done) {
				currentIndex = bars.findIndex((bar) => bar.id === value.current);
				nextIndex = bars.findIndex((bar) => bar.id === value.next);
				if (value.swap && currentIndex !== -1 && nextIndex !== -1) {
					[bars[currentIndex], bars[nextIndex]] = [bars[nextIndex], bars[currentIndex]];
				}
			}
		} while (!sorted);

		expect(bars.length).to.be.equals(50);

		let flag = true;
		bars.forEach((value, index, array) => {
			if (index + 1 < array.length) {
				if (value.value > array[index + 1].value) {
					flag = false;
				}
			}
		});

		expect(flag).to.be.equals(true);
	});

	it('Merge sorting test', async () => {
		bars = shuffle(bars);
		// await log(JSON.stringify({ bars }, null, 2));
		const algo = mergeSort(bars);
		let sorted = false;

		do {
			const { done, value } = algo.next();

			if (!done) {
				expect(value).to.not.be.undefined;
			}

			if (done) {
				sorted = true;
			}
			if (value && !done) {
				currentIndex = bars.findIndex(async (bar) => {
					await log(`${bar.id} ${value.current}`);
					return bar.id == value.current;
				});
				expect(currentIndex).not.toBe(-1);
				nextIndex = bars.findIndex(async (bar) => {
                    await log(`${bar.id} ${value.current}`);
					return bar.id == value.current;
				});
                await log('');
				expect(nextIndex).not.toBe(-1);
				if (value.swap && currentIndex !== -1 && nextIndex !== -1) {
					[bars[currentIndex], bars[nextIndex]] = [bars[nextIndex], bars[currentIndex]];
				}
			}
		} while (!sorted);

		expect(bars.length).to.be.equals(50);

		let flag = true;
		bars.forEach((value, index, array) => {
			if (index + 1 < array.length) {
				if (value.value > array[index + 1].value) {
					flag = false;
				}
			}
		});

		expect(flag).to.be.equals(true);
	});
});
