<template>
  <span class="status-badge" :class="`status-badge--${resolvedTone}`">
    {{ resolvedLabel }}
  </span>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  status: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  tone: {
    type: String,
    default: "",
  },
});

const toneByStatus = {
  available: "success",
  unavailable: "danger",
  borrowing: "warning",
  returned: "info",
  overdue: "danger",
  pending: "warning",
};

const resolvedTone = computed(() => {
  if (props.tone) {
    return props.tone;
  }
  const status = String(props.status || "").trim().toLowerCase();
  return toneByStatus[status] || "neutral";
});

const resolvedLabel = computed(() => {
  if (props.label) {
    return props.label;
  }
  const raw = String(props.status || "").trim();
  if (!raw) {
    return "Unknown";
  }
  return raw.charAt(0).toUpperCase() + raw.slice(1);
});
</script>

<style scoped>
.status-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 92px;
  padding: 5px 10px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.01em;
}

.status-badge--neutral {
  color: #475467;
  background: #f2f4f7;
}

.status-badge--success {
  color: #067647;
  background: #ecfdf3;
}

.status-badge--danger {
  color: #b42318;
  background: #fef3f2;
}

.status-badge--warning {
  color: #b54708;
  background: #fffaeb;
}

.status-badge--info {
  color: #175cd3;
  background: #eff8ff;
}
</style>
