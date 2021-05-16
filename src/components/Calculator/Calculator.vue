<template>
	<section class="calculator__wrapper">
		<Result :numbers="numbers" :sign="sign" :tempValue="tempValue" :mode="mode" />
		<Buttons @clickNumber="setNumber" @clickSign="setSign" @clickResult="showResult" @clickReset="reset" />
	</section>
</template>

<script>
import Result from '@/components/Calculator/Result.vue';
import Buttons from '@/components/Calculator/Buttons.vue';
import common from '@/common.js';

const calculatorMode = common.mode;

export default {
	name: 'Calculator',
	components: {
		Result,
		Buttons,
	},

	data() {
		return {
			numbers: [],
			sign: '+',
			tempValue: '',
			mode: calculatorMode.SHOW_RESULT_MODE,
		};
	},

	methods: {
		setNumber(number) {
			if (this.isZeroCase(number)) {
				return;
			}

			this.changeTypeNumberMode();

			this.tempValue += number;
		},

		setSign(sign) {
			this.changeShowResultMode();

			this.showResult();

			this.sign = sign;
			this.tempValue = '';
		},

		showResult() {
			if (this.isEmptyTempValue()) {
				return;
			}

			this.changeShowResultMode();

			this.numbers.push(`${this.sign}${this.tempValue}`);
		},

		reset() {
			this.changeShowResultMode();

			this.numbers = [];
			this.tempValue = '';
		},

		isZeroCase(value) {
			return value === '0' && this.isEmptyTempValue();
		},

		isEmptyTempValue() {
			return this.tempValue === '';
		},

		changeTypeNumberMode() {
			this.mode = calculatorMode.TYPE_NUMBER_MODE;
		},

		changeShowResultMode() {
			this.mode = calculatorMode.SHOW_RESULT_MODE;
		},
	},
};
</script>

<style lang="scss" scoped>
.calculator__wrapper {
	padding: 10px;
	border: 1px solid #666;
	box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.15);
}
</style>
