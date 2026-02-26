<template>
  <teleport to="body">
    <div v-if="modelValue" class="base-modal-overlay" @click.self="close">
      <div class="base-modal card">
        <div class="base-modal__header">
          <h3>{{ title }}</h3>
          <button class="base-modal__close" type="button" @click="close">x</button>
        </div>

        <div class="base-modal__body">
          <slot />
        </div>

        <div class="base-modal__footer">
          <BaseButton variant="ghost" :disabled="loading" @click="cancel">{{ cancelText }}</BaseButton>
          <BaseButton :variant="confirmVariant" :loading="loading" @click="confirm">{{ confirmText }}</BaseButton>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import BaseButton from "./BaseButton.vue";

defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "Confirm",
  },
  confirmText: {
    type: String,
    default: "Confirm",
  },
  cancelText: {
    type: String,
    default: "Cancel",
  },
  confirmVariant: {
    type: String,
    default: "primary",
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "confirm", "cancel"]);

const close = () => {
  emit("update:modelValue", false);
};

const cancel = () => {
  emit("cancel");
  close();
};

const confirm = () => {
  emit("confirm");
};
</script>

<style scoped>
.base-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.48);
  backdrop-filter: blur(3px);
  display: grid;
  place-items: center;
  z-index: 1000;
  padding: 18px;
}

.base-modal {
  width: min(100%, 520px);
  padding: 18px;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
}

.base-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.base-modal__header h3 {
  font-size: 18px;
  line-height: 1.2;
}

.base-modal__close {
  width: 30px;
  height: 30px;
  border: 1px solid var(--line);
  border-radius: 50%;
  background: #f8fafd;
  color: #52607a;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.base-modal__close:hover {
  background: #eef2f8;
  color: #1f2937;
}

.base-modal__body {
  margin-top: 14px;
  color: #374151;
  font-size: 14px;
  line-height: 1.45;
}

.base-modal__footer {
  margin-top: 18px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

@media (max-width: 640px) {
  .base-modal {
    padding: 16px;
  }
}
</style>
