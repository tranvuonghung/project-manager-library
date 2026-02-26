<template>
  <div class="data-table-shell">
    <div v-if="loading" class="data-table-loading card" :style="{ '--table-min-width': `${tableMinWidth}px` }">
      <table>
        <thead>
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              :style="{ width: column.width || 'auto', textAlign: column.align || 'left' }"
            >
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="rowIndex in skeletonRows" :key="`skeleton-${rowIndex}`">
            <td v-for="column in columns" :key="`${rowIndex}-${column.key}`">
              <span class="skeleton-cell"></span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <BaseTable
      v-else
      :columns="columns"
      :rows="rows"
      :empty-text="emptyText"
      :table-min-width="tableMinWidth"
    >
      <template
        v-for="column in columns"
        :key="column.key"
        #[`cell-${column.key}`]="slotProps"
      >
        <slot :name="`cell-${column.key}`" v-bind="slotProps">
          {{ slotProps.row[column.key] }}
        </slot>
      </template>
    </BaseTable>
  </div>
</template>

<script setup>
import BaseTable from "../base/BaseTable.vue";

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
  skeletonRows: {
    type: Number,
    default: 6,
  },
});
</script>

<style scoped>
.data-table-loading {
  overflow-x: auto;
}

.data-table-loading table {
  width: 100%;
  min-width: var(--table-min-width);
  border-collapse: collapse;
}

.data-table-loading th,
.data-table-loading td {
  padding: 14px 12px;
  border-bottom: 1px solid var(--line);
}

.data-table-loading th {
  font-size: 11px;
  color: #667085;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 700;
  background: #f8fafc;
}

.skeleton-cell {
  display: block;
  height: 14px;
  border-radius: 9999px;
  background: linear-gradient(90deg, #edf2f7 20%, #f7f9fc 45%, #edf2f7 70%);
  background-size: 220% 100%;
  animation: table-shimmer 1.15s linear infinite;
}

@keyframes table-shimmer {
  to {
    background-position: -220% 0;
  }
}
</style>
