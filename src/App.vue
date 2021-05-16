<template>
	<div class="calculator__app">
		<h1 class="calculator__app--title">Mini Calculator</h1>
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
.calculator__app {
	@include alignCenter();
	width: 400px;
	height: 400px;
	text-align: center;

	&--title {
		@include headerUnderline(5px, 15px, 1px solid #bbb);
		font-weight: $fontBold;
		color: $colorError;
	}
}
</style>
