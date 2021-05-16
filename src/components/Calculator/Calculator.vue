<template>
	<section class="calculator__wrapper">
		<ShowResult />
		<Buttons />
	</section>
</template>

<script>
import ShowResult from '@/components/Calculator/ShowResult.vue';
import Buttons from '@/components/Calculator/Buttons.vue';

export default {
	name: 'Calculator',
	components: {
		ShowResult,
		Buttons,
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
