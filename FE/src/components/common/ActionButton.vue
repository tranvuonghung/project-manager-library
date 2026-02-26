<template>
  <BaseButton
    class="action-button"
    :class="`action-button--${variant}`"
    :type="type"
    :variant="variant"
    :size="size"
    :block="block"
    :loading="loading"
    :disabled="disabled"
  >
    <span v-if="$slots.icon" class="action-button__icon">
      <slot name="icon" />
    </span>
    <slot />
  </BaseButton>
</template>

<script setup>
import BaseButton from "../base/BaseButton.vue";

defineProps({
  type: {
    type: String,
    default: "button",
  },
  variant: {
    type: String,
    default: "primary",
  },
  size: {
    type: String,
    default: "md",
  },
  block: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.action-button {
  gap: 7px;
}

.action-button__icon {
  display: inline-flex;
  align-items: center;
  line-height: 1;
}
</style>
