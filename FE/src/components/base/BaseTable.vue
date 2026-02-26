<template>
  <div class="base-table-wrap card">
    <div v-if="loading" class="base-table-loading">Loading data...</div>

    <template v-else>
      <table v-if="rows.length" class="base-table" :style="{ minWidth: `${tableMinWidth}px` }">
        <thead>
          <tr>
            <th v-for="column in columns" :key="column.key" :style="getColumnStyle(column)">
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row.id">
            <td v-for="column in columns" :key="`${row.id}-${column.key}`" :style="getColumnStyle(column)">
              <slot :name="`cell-${column.key}`" :row="row">
                {{ row[column.key] }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-else class="empty-state">{{ emptyText }}</div>
    </template>
  </div>
</template>

<script setup>
defineProps({
  columns: {
    type: Array,
    default: () => [],
  },
  rows: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  emptyText: {
    type: String,
    default: "No data available",
  },
  tableMinWidth: {
    type: Number,
    default: 760,
  },
});

const getColumnStyle = (column) => ({
  width: column.width || "auto",
  textAlign: column.align || "left",
});
</script>

<style scoped>
.base-table-wrap {
  width: 100%;
  border-radius: var(--radius-md);
  border: 1px solid var(--line);
  background: var(--surface);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  overflow-x: auto;
}

.base-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--surface);
}

.base-table th,
.base-table td {
  padding: 14px 12px;
  border-bottom: 1px solid var(--line);
  font-size: 14px;
  vertical-align: middle;
}

.base-table th {
  position: sticky;
  top: 0;
  z-index: 1;
  background: #f8fafe;
  font-size: 11px;
  color: #5f6b7f;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 700;
  border-bottom-color: var(--line-strong);
}

.base-table tbody tr:hover {
  background: #f8fbff;
}

.base-table tbody tr:nth-child(even) {
  background: #fbfcfe;
}

.base-table tbody tr:nth-child(even):hover {
  background: #f3f7ff;
}

.base-table tr:last-child td {
  border-bottom: none;
}

.base-table-loading {
  padding: 34px;
  text-align: center;
  color: var(--muted);
  font-weight: 600;
}

@media (max-width: 900px) {
  .base-table th,
  .base-table td {
    padding: 12px 10px;
  }
}
</style>
