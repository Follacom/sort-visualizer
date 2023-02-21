<script lang="ts">
	import getRandomBars from '$lib/randomBars';
	import split from '$lib/split';
	import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';

	const algorithm = {
		bubbleSort
	};
	let currentAlgorithm: 'bubbleSort' = 'bubbleSort';
	let n = 60;
	let delay = 50;

	let bars: Array<{
			id: string;
			value: number;
		}> = getRandomBars(n),
		currentIndex: number,
		nextCurrentIndex: number,
		currentN: number,
		newCurrentN: number,
		swapped: boolean,
		interval: NodeJS.Timer;

	function* bubbleSort(array: Array<{ id: string; value: number }>) {
		for (let i = 0; i < array.length; i++) {
			for (let j = 0; j < array.length - i - 1; j++) {
				currentIndex = j;
				if (array[j] > array[j + 1]) {
					[array[j], array[j + 1]] = [array[j + 1], array[j]];
				}
				yield array;
			}
		}
		return yield array;
	}

	// function* mergeSort(array: Array<number>) {
	// 	if (array.length <= 1) {
	// 		return array;
	// 	}
	// 	const [split1, split2] = split(array);
	// 	const merged1 = yield* mergeSort(split1);
	// 	const merged2 = yield* mergeSort(split2);

	// 	return yield* mergeSortedArrays(merged1, merged2);
	// }

	// function* mergeSortedArrays(arr1, arr2) {
	// 	let i = 0;
	// 	let j = 0;
	// 	const merged = [];

	// 	while (arr1[i] !== undefined || arr2[j] !== undefined) {
	// 		let index;
	// 		if (arr1[i]?.value <= arr2[j]?.value || arr2[j] === undefined) {
	// 			merged.push(arr1[i]);
	// 			index = bars.findIndex((bar) => arr1[i].id === bar.id);
	// 			i++;
	// 		} else if (arr2[j]?.value < arr1[i]?.value || arr1[i] === undefined) {
	// 			merged.push(arr2[j]);
	// 			index = bars.findIndex((bar) => arr2[j].id === bar.id);
	// 			j++;
	// 		}
	// 		let temp = bars[index];
	// 		bars[index] = { id: {}, value: 0 };
	// 		merger = [...merger, temp];
	// 		yield;
	// 	}
	// 	for (let k = 0; k < randomBars.length; k++) {
	// 		if (randomBars[k].value === 0) {
	// 			randomBars[k] = merger.shift();
	// 			merger = merger;
	// 			yield;
	// 		}
	// 	}
	// 	return merged;
	// }

	function updateDelay() {
		clearInterval(interval);
		interval = setInterval(
			() => (bars = algorithm[currentAlgorithm]([...bars]).next().value),
			delay
		);
	}

	function init() {
		currentIndex = 0;
		bars = getRandomBars(n);
		setTimeout(() => {
			interval = setInterval(
				() => (bars = algorithm[currentAlgorithm]([...bars]).next().value),
				delay
			);
		}, delay);
	}

	onMount(() => {
		return () => clearInterval(interval);
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<main class="flex flex-auto flex-col">
	<div>
		<label>
			n: <input type="number" bind:value={n} on:input={init} min="0" />
		</label>
		<label>
			delay: <input type="number" bind:value={delay} on:input={updateDelay} />
		</label>
		<select value={currentAlgorithm} on:change={init}>
			{#each Object.keys(algorithm) as algo}
				<option value={algo}>
					{algo}
				</option>
			{/each}
		</select>
		<button on:click={init}>Start</button>
	</div>
	<div class="flex h-full flex-row space-x-1 mx-2 mb-2">
		{#each bars.filter((bar) => bar.value !== 0) as bar, i (bar)}
			<div class="flex flex-auto relative" animate:flip={{ duration: delay }}>
				<div
					style="height: {bar.value}px"
					class:bg-red-500={i == currentIndex || i == nextCurrentIndex}
					class="bg-indigo-500 w-full rounded-sm absolute bottom-0"
				/>
			</div>
		{/each}
	</div>
</main>
