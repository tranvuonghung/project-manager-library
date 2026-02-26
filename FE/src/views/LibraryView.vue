<template>
  <div class="page-container app-shell user-library">
    <BaseToast :visible="toast.isVisible.value" :message="toast.message.value" :type="toast.type.value" />

    <section class="app-header card library-header">
      <div class="app-header__content">
        <span class="app-kicker">Người dùng</span>
        <h1>Danh mục sách</h1>
        <p class="app-subtitle">Duyệt sách và mượn trực tiếp từ dữ liệu giả lập.</p>
      </div>

      <div class="app-toolbar library-toolbar">
        <BaseInput v-model="query" placeholder="Tìm theo tên sách, tác giả hoặc thể loại" />
        <ActionButton variant="ghost" :loading="loadingAction" @click="refreshData">Làm mới</ActionButton>
      </div>
    </section>

    <section class="metrics-grid">
      <article class="metric-card metric-card--catalog card">
        <span class="metric-label">Tổng số sách</span>
        <strong class="metric-value">{{ booksStore.totalBooks }}</strong>
        <span class="metric-note">Số sách hiện có trong thư viện</span>
      </article>
      <article class="metric-card metric-card--borrowing card">
        <span class="metric-label">Đang mượn</span>
        <strong class="metric-value">{{ activeBorrowCount }}</strong>
        <span class="metric-note">Số sách bạn đang mượn</span>
      </article>
      <article class="metric-card metric-card--available card">
        <span class="metric-label">Sẵn có</span>
        <strong class="metric-value">{{ availableCount }}</strong>
        <span class="metric-note">Sách có thể mượn ngay</span>
      </article>
    </section>

    <div v-if="booksStore.error" class="error-state">
      {{ booksStore.error }}
    </div>

    <DataTable
      :columns="columns"
      :rows="filteredBooks"
      :loading="booksStore.loading"
      :table-min-width="680"
      empty-text="Không có sách phù hợp. Hãy thử từ khóa khác."
    >
      <template #cell-status="{ row }">
        <StatusBadge :status="row.status" />
      </template>

      <template #cell-actions="{ row }">
        <ActionButton
          size="sm"
          :disabled="row.quantity <= 0 || borrowedBookIds.has(row.id) || loadingAction"
          :loading="loadingBookId === row.id"
          @click="borrow(row)"
        >
          {{ borrowedBookIds.has(row.id) ? "Đã mượn" : "Mượn sách" }}
        </ActionButton>
      </template>
    </DataTable>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import BaseInput from "../components/base/BaseInput.vue";
import BaseToast from "../components/base/BaseToast.vue";
import ActionButton from "../components/common/ActionButton.vue";
import DataTable from "../components/common/DataTable.vue";
import StatusBadge from "../components/common/StatusBadge.vue";
import { useToast } from "../composables/useToast";
import { useAuthStore } from "../store/auth.store";
import { useBooksStore } from "../store/books.store";
import { borrowService } from "../services/borrow.service";

const authStore = useAuthStore();
const booksStore = useBooksStore();
const toast = useToast();

const query = ref("");
const loadingAction = ref(false);
const loadingBookId = ref(null);
const borrowRecords = ref([]);

const columns = [
  { key: "id", label: "ID", width: "70px" },
  { key: "title", label: "Tên sách" },
  { key: "author", label: "Tác giả" },
  { key: "category", label: "Thể loại", width: "180px" },
  { key: "quantity", label: "SL", width: "90px", align: "center" },
  { key: "status", label: "Trạng thái", width: "120px", align: "center" },
  { key: "actions", label: "Thao tác", width: "140px", align: "right" },
];

const borrowedBookIds = computed(
  () =>
    new Set(
      borrowRecords.value
        .filter((item) => item.status === "borrowing")
        .map((item) => Number(item.bookId))
    )
);

const filteredBooks = computed(() => {
  const keyword = query.value.trim().toLowerCase();
  if (!keyword) {
    return booksStore.books;
  }

  return booksStore.books.filter(
    (book) =>
      book.title.toLowerCase().includes(keyword) ||
      book.author.toLowerCase().includes(keyword) ||
      book.category.toLowerCase().includes(keyword)
  );
});

const availableCount = computed(
  () => booksStore.books.filter((book) => book.status === "available").length
);

const activeBorrowCount = computed(
  () => borrowRecords.value.filter((item) => item.status === "borrowing").length
);

const loadBorrows = async () => {
  const userId = authStore.user?.id || 2;
  borrowRecords.value = await borrowService.getByUser(userId);
};

const refreshData = async () => {
  loadingAction.value = true;
  try {
    await booksStore.fetchBooks();
    await loadBorrows();
    toast.showSuccess("Đã làm mới danh mục");
  } catch (error) {
    toast.showError("Không thể làm mới danh mục");
  } finally {
    loadingAction.value = false;
  }
};

const borrow = async (book) => {
  loadingBookId.value = book.id;
  loadingAction.value = true;

  try {
    const userId = authStore.user?.id || 2;
    await borrowService.borrowBook({ userId, bookId: book.id });
    await booksStore.fetchBooks();
    await loadBorrows();
    toast.showSuccess(`Đã mượn: ${book.title}`);
  } catch (error) {
    toast.showError(error?.message || "Mượn sách thất bại");
  } finally {
    loadingBookId.value = null;
    loadingAction.value = false;
  }
};

onMounted(async () => {
  await booksStore.fetchBooks();
  await loadBorrows();
});
</script>

<style scoped>
.library-header {
  background: linear-gradient(180deg, #ffffff, #f9fbff);
  padding-top: 34px;
  padding-bottom: 34px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 22px;
}

.library-header .app-header__content {
  text-align: center;
}

.library-header .app-toolbar {
  width: 100%;
  justify-content: center;
}

.library-toolbar :deep(.base-input-wrap) {
  min-width: 360px;
  max-width: 460px;
}

.metric-card--catalog::before {
  background: linear-gradient(90deg, #93c5fd, #3b82f6);
}

.metric-card--borrowing::before {
  background: linear-gradient(90deg, #fca5a5, #ef4444);
}

.metric-card--available::before {
  background: linear-gradient(90deg, #86efac, #22c55e);
}

@media (max-width: 900px) {
  .library-header .app-header__content {
    text-align: left;
  }

  .library-header .app-toolbar {
    justify-content: flex-start;
  }

  .library-toolbar :deep(.base-input-wrap) {
    min-width: 0;
    max-width: none;
  }
}
</style>
