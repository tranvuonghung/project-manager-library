<template>
  <label class="base-input-wrap">
    <span v-if="label" class="base-input-label">{{ label }}</span>
    <input
      class="base-input"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :disabled="disabled"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </label>
</template>

<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["update:modelValue"]);
</script>

<style scoped>
.base-input-wrap {
  display: flex;
  flex-direction: column;
  gap: 7px;
  width: 100%;
}

.base-input-label {
  font-size: 12px;
  color: #4e596d;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.base-input {
  width: 100%;
  height: 44px;
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
  padding: 0 13px;
  outline: none;
  font-size: 14px;
  color: var(--text);
  background: var(--surface);
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}

.base-input::placeholder {
  color: #9aa4b2;
}

.base-input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(36, 85, 230, 0.16);
}

.base-input:disabled {
  color: #6b7280;
  background: #f5f7fb;
}
</style>
