<template>
	<article class="log">
		<h2 class="log__title">Calculator Log</h2>
		<ol v-if="!!numbers.length" class="log__list">
			<li v-for="(number, index) in numbers" :key="`number-log-${index}`" class="log__list--item">
				<span class="log__list--item--index">{{ fillZero(index + 1) }}</span>
				<span class="log__list--item-contents">{{ number }}</span>
			</li>
		</ol>
		<p v-else class="log__message">계산기 기록이 없습니다.</p>
	</article>
</template>

<script>
export default {
	name: 'Logs',
	props: {
		numbers: {
			type: Array,
			default: () => {
				return [];
			},
			required: true,
		},
	},

	methods: {
		fillZero(index) {
			const numberLogsCount = String(this.numbers.length);
			const diffDigitCount = Math.abs(numberLogsCount.length - String(index).length);
			const zeroString = '0'.repeat(diffDigitCount);

			return `${zeroString}${index}`;
		},
	},
};
</script>

<style lang="scss" scoped>
$listItemHeight: 24px; // 로그 하나당 높이
$listItemInterval: 10px; // 로그 간의 padding 간격
$maxShowLogCount: 5; // 한 번에 볼 수 있는 계산기 로그 최대 갯수

.log {
	&__title {
		@include headerUnderline(5px, 15px, 1px solid #bbb);
	}

	&__list {
		padding: 10px;
		border: 1px solid #999;
		box-shadow: $boxShadow;
		max-height: calc((#{$listItemHeight} + #{$listItemInterval}) * #{$maxShowLogCount} - #{$listItemInterval});
		overflow-y: auto;

		&--item {
			display: flex;
			height: $listItemHeight;

			& + & {
				padding-top: $listItemInterval;
			}

			&--index {
				padding-right: 10px;

				&::after {
					content: '.';
				}
			}
		}
	}
}
</style>
