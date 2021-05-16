<template>
	<article class="result">
		<div class="result__box">{{ result }}</div>
	</article>
</template>

<script>
import common from '@/common.js';

const calculatorMode = common.mode;

export default {
	name: 'Result',
	props: {
		numbers: {
			type: Array,
			default: () => {
				return [];
			},
			required: true,
		},

		sign: {
			type: String,
			default: '+',
			required: true,
		},

		tempValue: {
			type: String,
			default: '',
			required: true,
		},

		mode: {
			type: String,
			default: calculatorMode.SHOW_RESULT_MODE,
			required: true,
		},
	},

	computed: {
		result() {
			return this.mode === calculatorMode.SHOW_RESULT_MODE ? this.calcValue : this.showTempValue();
		},

		calcValue() {
			return this.numbers.reduce((acc, curr) => (acc += Number(curr)), 0);
		},
	},

	methods: {
		showTempValue() {
			const value = `${this.sign}${this.tempValue}`;
			return value.replace(/\+/, '');
		},
	},
};
</script>

<style lang="scss" scoped>
.result {
	margin-bottom: 20px;

	&__box {
		width: 100%;
		height: 50px;
		line-height: 50px;
		font-size: 20px;
		font-weight: $fontBold;
		text-align: right;
		padding: 0 10px;
		box-sizing: border-box;
		background-color: bisque;
	}
}
</style>
