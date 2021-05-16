<template>
	<div class="calculator">
		<h1 class="calculator__title">Mini Calculator</h1>
		<Calculator />
	</div>
</template>

<script>
import Calculator from '@/components/Calculator/Calculator.vue';

export default {
	name: 'App',
	components: {
		Calculator,
	},
};
</script>

<style lang="scss" scoped>
.calculator {
	@include alignCenter();
	width: 400px;
	height: 400px;
	text-align: center;

	&__title {
		@include headerUnderline(5px, 15px, 1px solid #bbb);
		font-weight: $fontBold;
		color: $colorError;
	}
}
</style>
