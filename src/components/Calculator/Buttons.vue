<template>
	<article class="buttons">
		<div class="buttons__number">
			<button
				class="buttons__number--item"
				v-for="(number, index) in numbers"
				:key="`number-button-${index}`"
				@click="clickNumber(number)"
			>
				{{ number }}
			</button>
		</div>
		<div class="buttons__symbol">
			<button
				class="buttons__symbol--item"
				v-for="(symbol, index) in symbols"
				:key="`symbol-button-${index}`"
				@click="clickSymbol(symbol)"
			>
				{{ symbol }}
			</button>
		</div>
	</article>
</template>

<script>
const numbers = Array(10)
	.fill()
	.map((_, index) => String(index));

export default {
	name: 'Buttons',
	data() {
		return {
			numbers,
			symbols: ['+', '-', '=', 'Reset'],
		};
	},

	methods: {
		clickNumber(number) {
			this.$emit('clickNumber', number);
		},

		clickSymbol(symbol) {
			this.$emit(this.setEmitEventName(symbol), symbol);
		},

		setEmitEventName(symbol) {
			if (symbol === '+' || symbol === '-') {
				return 'clickSign';
			}

			if (symbol === '=') {
				return 'clickResult';
			}

			if (symbol === 'Reset') {
				return 'clickReset';
			}
		},
	},
};
</script>

<style lang="scss" scoped>
$numberButtonCount: 10;
$symbolButtonCount: 4;

.buttons {
	&__number {
		margin-bottom: 10px;

		&--item {
			width: calc(100% / #{$numberButtonCount});
		}
	}

	&__symbol {
		&--item {
			width: calc(100% / #{$symbolButtonCount});
		}
	}
}
</style>
