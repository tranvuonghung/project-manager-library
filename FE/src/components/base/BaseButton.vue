<template>
  <button
    class="base-btn"
    :class="[
      `base-btn--${variant}`,
      `base-btn--${size}`,
      {
        'base-btn--block': block,
        'is-loading': loading,
      },
    ]"
    :type="type"
    :disabled="disabled || loading"
  >
    <span v-if="loading" class="base-btn__spinner" aria-hidden="true"></span>
    <slot />
  </button>
</template>

<script setup>
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
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.base-btn {
  appearance: none;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  min-height: 42px;
  padding: 0 15px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  line-height: 1;
  white-space: nowrap;
  transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease,
    box-shadow 0.2s ease;
}

.base-btn:hover:enabled {
  transform: translateY(-1px);
}

.base-btn:active:enabled {
  transform: translateY(0);
}

.base-btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(36, 85, 230, 0.22);
}

.base-btn:disabled {
  opacity: 0.58;
  cursor: not-allowed;
}

.base-btn--primary {
  background: linear-gradient(180deg, #2f64f5, var(--primary));
  color: #fff;
  box-shadow: 0 7px 18px rgba(36, 85, 230, 0.25);
}

.base-btn--primary:hover:enabled {
  background: var(--primary-hover);
  box-shadow: 0 10px 20px rgba(36, 85, 230, 0.28);
}

.base-btn--danger {
  background: linear-gradient(180deg, #e63d3d, var(--danger));
  color: #fff;
  box-shadow: 0 7px 18px rgba(220, 38, 38, 0.22);
}

.base-btn--danger:hover:enabled {
  background: var(--danger-hover);
  box-shadow: 0 10px 22px rgba(220, 38, 38, 0.26);
}

.base-btn--ghost {
  border-color: var(--line-strong);
  background: var(--surface);
  color: #1f2937;
  box-shadow: none;
}

.base-btn--ghost:hover:enabled {
  border-color: #c3cedf;
  background: #f8fbff;
}

.base-btn--sm {
  min-height: 36px;
  padding: 0 12px;
  font-size: 13px;
}

.base-btn--lg {
  min-height: 46px;
  padding: 0 18px;
  font-size: 15px;
}

.base-btn--block {
  width: 100%;
}

.base-btn__spinner {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: #ffffff;
  animation: spin 0.8s linear infinite;
}

.base-btn--ghost .base-btn__spinner {
  border-color: rgba(31, 41, 55, 0.25);
  border-top-color: #1f2937;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
