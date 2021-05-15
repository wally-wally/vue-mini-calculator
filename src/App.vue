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
  }
}

</script>

<style lang="scss" scoped>
.calculator {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;
  text-align: center;

  &__title {
    font-weight: $fontBold;
    color: $color-error;
  }
}
</style>