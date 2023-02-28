<script lang="ts">
	import {
		bogoSort,
		bubbleSort,
		cocktailSort,
		insertionSort,
		gnomeSort,
		mergeSort,
		heapSort
	} from '$lib/algo';
	import getRandomBars from '$lib/randomBars';
	import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';
	import { confetti } from '@neoconfetti/svelte';

	const algorithm = {
		bubbleSort,
		mergeSort,
		bogoSort,
		cocktailSort,
		gnomeSort
		// heapSort,
		// insertionSort
	};
	let currentAlgorithm: 'bubbleSort' | 'mergeSort' | 'bogoSort' | 'cocktailSort' | 'gnomeSort' =
		// | 'insertionSort'
		// | 'heapSort'
		'bubbleSort';
	let n = 10;
	let delay = 500;

	let bars: Array<{
			id: string;
			value: number;
		}> = [],
		currentIndex: number,
		nextIndex: number,
		algo: Iterator<{ current: string; next: string; swap: boolean }>,
		interval: NodeJS.Timer,
		sorted: boolean = false;

	function updateDelay() {
		clearInterval(interval);
		interval = setInterval(display, delay);
	}

	function display() {
		try {
			const { done, value } = algo.next();

			if (done) {
				clearInterval(interval);
				sorted = true;
				return;
			}
			if (value) {
				currentIndex = bars.findIndex((bar) => bar.id === value.current);
				nextIndex = bars.findIndex((bar) => bar.id === value.next);
				if (value.swap && currentIndex !== -1 && nextIndex !== -1) {
					[bars[currentIndex], bars[nextIndex]] = [bars[nextIndex], bars[currentIndex]];
				}
			}
		} catch (error) {
			console.error(error);
			clearInterval(interval);
		}
	}

	function stop() {
		clearInterval(interval);
	}

	function resume() {
		clearInterval(interval);
		setTimeout(() => {
			interval = setInterval(display, delay);
		}, delay);
	}

	function init() {
		sorted = false;
		clearInterval(interval);
		currentIndex = 0;
		nextIndex = 0;
		bars = getRandomBars(n);
		algo = algorithm[currentAlgorithm]([...bars]);
	}

	onMount(() => {
		init();

		return () => clearInterval(interval);
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<main class="flex flex-auto flex-col">
	<nav class="flex px-2 py-3 bg-slate-700 text-white shadow-md shadow-slate-400">
		<div class="inline-block space-x-2">
			<label for="alg-select"
				>Algorithm:
				<select
					name="alg-select"
					bind:value={currentAlgorithm}
					on:change={init}
					class="bg-inherit rounded border border-slate-400"
				>
					{#each Object.keys(algorithm) as algo}
						<option value={algo} class="bg-slate-700 px-1 py-2">
							{algo}
						</option>
					{/each}
				</select>
			</label>
			<label for="n-select"
				>Element Count:
				<input
					name="n-select"
					type="number"
					class="bg-inherit rounded border border-slate-400"
					bind:value={n}
					on:input={init}
					min="4"
					max="512"
				/>
			</label>
			<label for="delay-select"
				>Delay:
				<input
					name="delay-select"
					type="number"
					class="bg-inherit rounded border border-slate-400"
					bind:value={delay}
					on:input={updateDelay}
					min="100"
					max="5000"
				/>
			</label>
		</div>
		<div class="ml-auto space-x-1">
			<button class="bg-slate-500 rounded border border-slate-400 px-2 py-1" on:click={resume}
				>Start</button
			>
			<button class="bg-slate-500 rounded border border-slate-400 px-2 py-1" on:click={init}
				>Reset</button
			>
		</div>
	</nav>
	<div class="flex h-full flex-row space-x-1 mx-2 mb-2">
		{#each bars.filter((bar) => bar.value !== 0) as bar, i (bar)}
			<div class="flex flex-auto relative" animate:flip={{ duration: delay }}>
				<div
					style="height: {bar.value}px"
					class:bg-red-500={i == currentIndex || i == nextIndex}
					class="bg-indigo-500 w-full rounded-sm absolute bottom-0"
					title=" {bar.value}"
				/>
			</div>
		{/each}
	</div>
	{#if sorted}
		<div class="absolute flex inset-0 m-auto w-1 h-1">
			<div use:confetti />
		</div>
	{/if}
</main>
