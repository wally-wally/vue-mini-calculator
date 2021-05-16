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
			isClickedEqualButton: false,
		};
	},

	methods: {
		setNumber(number) {
			if (this.isClickedEqualButton) {
				this.tempValue = '';
			}

			if (this.tempValue === '0') {
				return;
			}

			this.changeIsClickedEqualButton(false);

			this.changeTypeNumberMode();

			this.tempValue += number;
		},

		setSign(sign) {
			this.addNumbers();

			this.changeIsClickedEqualButton(false);

			this.sign = sign;
			this.tempValue = '';
		},

		showResult() {
			this.changeIsClickedEqualButton(true);
			this.addNumbers();
		},

		reset() {
			this.changeShowResultMode();

			this.changeIsClickedEqualButton(false);

			this.numbers = [];
			this.sign = '+';
			this.tempValue = '';
		},

		addNumbers() {
			if (this.tempValue === '') {
				return;
			}

			this.changeShowResultMode();

			this.numbers.push(`${this.sign}${this.tempValue}`);
		},

		changeTypeNumberMode() {
			this.mode = calculatorMode.TYPE_NUMBER_MODE;
		},

		changeShowResultMode() {
			this.mode = calculatorMode.SHOW_RESULT_MODE;
		},

		changeIsClickedEqualButton(value) {
			this.isClickedEqualButton = value;
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
