<template>
	<article class="result">
		<div class="result__box">{{ result }}</div>
	</article>
</template>

<script>
export default {
	name: 'ShowResult',
	data() {
		return {
			result: '0',
		};
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
