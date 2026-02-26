<template>
  <teleport to="body">
    <div v-if="visible" class="base-toast" :class="`base-toast--${type}`">
      {{ message }}
    </div>
  </teleport>
</template>

<script setup>
defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  message: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "success",
  },
});
</script>

<style scoped>
.base-toast {
  position: fixed;
  right: 18px;
  top: 18px;
  z-index: 1200;
  min-width: 240px;
  max-width: 380px;
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  padding: 12px 14px;
  border-radius: 12px;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.22);
  animation: toast-in 0.2s ease-out;
}

.base-toast--success {
  background: var(--success);
}

.base-toast--error {
  background: var(--danger);
}

@keyframes toast-in {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 640px) {
  .base-toast {
    right: 12px;
    left: 12px;
    top: 12px;
    min-width: 0;
    max-width: none;
  }
}
</style>
