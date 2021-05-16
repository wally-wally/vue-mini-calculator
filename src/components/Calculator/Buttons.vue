<template>
	<article class="buttons">
		<div class="buttons__number">
			<button class="buttons__number--item" v-for="(number, index) in numbers" :key="`number-button-${index}`">
				{{ number }}
			</button>
		</div>
		<div class="buttons__symbol">
			<button class="buttons__symbol--item" v-for="(symbol, index) in symbols" :key="`symbol-button-${index}`">
				{{ symbol }}
			</button>
		</div>
	</article>
</template>

<script>
export default {
	name: 'Buttons',
	data() {
		return {
			numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
			symbols: ['+', '-', '=', 'Reset'],
		};
	},
};
</script>

<style lang="scss" scoped>
.buttons {
	&__number {
		margin-bottom: 10px;

		&--item {
			width: calc(100% / 10);
		}
	}

	&__symbol {
		&--item {
			width: calc(100% / 4);
		}
	}
}
</style>
