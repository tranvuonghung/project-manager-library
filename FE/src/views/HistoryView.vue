<template>
  <div class="page page-history">
    <section class="section-head">
      <div>
        <h2>Lịch sử mượn sách</h2>
        <p class="section-sub">Theo dõi những lần mượn gần đây.</p>
      </div>
      <button class="ghost-link" type="button" @click="openFilter">Bộ lọc</button>
    </section>

    <div v-if="error" class="info-banner info-banner--error">{{ error }}</div>

    <section v-if="loading" class="history-list">
      <article v-for="item in skeletonItems" :key="`history-skeleton-${item}`" class="history-card">
        <div class="history-top">
          <div class="skeleton-line skeleton-line--short"></div>
          <div class="skeleton-line skeleton-line--short"></div>
        </div>
        <div class="history-body">
          <div class="skeleton-cover" style="width: 80px;"></div>
          <div style="flex: 1; display: grid; gap: 8px;">
            <div class="skeleton-line"></div>
            <div class="skeleton-line skeleton-line--short"></div>
            <div class="skeleton-line"></div>
          </div>
        </div>
      </article>
    </section>

    <div v-else-if="!items.length" class="empty-state">
      Chưa có lịch sử mượn nào để hiển thị.
    </div>

    <section v-else class="history-list">
      <article
        v-for="(item, index) in normalizedItems"
        :key="item.id"
        class="history-card reveal"
        :style="{ '--delay': getDelay(index, 0.1) }"
      >
        <div class="history-top">
          <span class="history-status" :class="`history-status--${item.statusTone}`">
            {{ item.statusLabel }}
          </span>
          <span class="history-code">{{ item.code }}</span>
        </div>
        <div class="history-body">
          <div class="cover" :class="item.cover">
            <img
              v-if="getBookImage(item) && !brokenCovers[item.id]"
              class="cover-image"
              :src="getBookImage(item)"
              :alt="item.title"
              loading="lazy"
              @error="handleCoverError(item.id)"
            />
            <div v-else class="cover-fallback">{{ getCoverFallback(item.title) }}</div>
          </div>
          <div>
            <h4 class="book-title">{{ item.title }}</h4>
            <p class="book-author">{{ item.author }}</p>
            <div class="history-meta">
              <div>
                <span class="meta-label">Mượn:</span>
                {{ item.borrowed }}
              </div>
              <div v-if="item.returned">
                <span class="meta-label">Đã trả:</span>
                {{ item.returned }}
              </div>
              <div v-if="item.due">
                <span class="meta-label">Hạn trả:</span>
                {{ item.due }}
              </div>
            </div>
          </div>
        </div>
        <div class="history-actions">
          <button
            v-for="action in item.actions"
            :key="action.id"
            class="btn"
            :class="action.variant === 'primary' ? 'btn-primary' : 'btn-ghost'"
            type="button"
            @click="handleAction(item, action)"
          >
            {{ action.label }}
          </button>
        </div>
      </article>
    </section>

    <div v-if="pagination.totalPages > 1" class="pagination" style="margin-top: 12px;">
      <button
        class="page-btn"
        type="button"
        :disabled="pagination.page === 1"
        @click="handlePage(pagination.page - 1)"
      >
        ‹
      </button>
      <button
        v-for="page in pagination.pages"
        :key="page"
        class="page-btn"
        :class="{ active: page === pagination.page }"
        type="button"
        @click="handlePage(page)"
      >
        {{ page }}
      </button>
      <button
        class="page-btn"
        type="button"
        :disabled="pagination.page === pagination.totalPages"
        @click="handlePage(pagination.page + 1)"
      >
        ›
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import {
  borrowBook,
  fetchHistory,
  renewLoan,
  returnBorrowedBook,
  submitReview,
} from "../services/libraryApi";

const loading = ref(false);
const error = ref("");
const items = ref([]);
const pagination = ref({ page: 1, totalPages: 1, pages: [] });
const brokenCovers = ref({});
const skeletonItems = [1, 2, 3, 4];

const getDelay = (index, start = 0.1) => `${start + index * 0.05}s`;
const getBookImage = (item) => item.imageUrl || item.coverImage || item.image || "";
const getCoverFallback = (title = "") => {
  const parts = String(title).split(/\s+/).filter(Boolean).slice(0, 2);
  return parts.join(" ");
};

const isPastDue = (value) => {
  if (!value) {
    return false;
  }
  const now = new Date();
  const current = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const due = new Date(`${value}T00:00:00`).getTime();
  return due < current;
};

const normalizedItems = computed(() =>
  items.value.map((item) => {
    const isBorrowing = item.statusLabel?.toLowerCase() === "borrowing";
    const overdue = isBorrowing && isPastDue(item.due);
    const statusTone = overdue ? "overdue" : isBorrowing ? "borrowing" : "returned";
    const statusLabel = overdue ? "QUÁ HẠN" : isBorrowing ? "ĐANG MƯỢN" : "ĐÃ TRẢ";

    return {
      ...item,
      statusLabel,
      statusTone,
    };
  })
);

const handleCoverError = (id) => {
  brokenCovers.value = {
    ...brokenCovers.value,
    [id]: true,
  };
};

const loadHistory = async (page = 1) => {
  loading.value = true;
  error.value = "";
  try {
    const data = await fetchHistory({ page });
    items.value = data.items || [];
    pagination.value = data.pagination || { page: 1, totalPages: 1, pages: [] };
  } catch (err) {
    error.value = "Không thể tải lịch sử mượn sách.";
  } finally {
    loading.value = false;
  }
};

const handlePage = (page) => {
  if (page === pagination.value.page) {
    return;
  }
  loadHistory(page);
};

const handleAction = async (item, action) => {
  try {
    if (action.id === "borrow-again") {
      await borrowBook({ bookId: item.bookId });
    }
    if (action.id === "renew") {
      await renewLoan({ loanId: item.id });
    }
    if (action.id === "return") {
      await returnBorrowedBook({ borrowId: item.id });
    }
    if (action.id === "write-review") {
      await submitReview({ bookId: item.bookId, payload: { rating: 5, comment: "" } });
    }
    await loadHistory(pagination.value.page);
  } catch (err) {
    error.value = "Không thể xử lý hành động này.";
  }
};

const openFilter = () => {
  // TODO: Open filter modal when BE provides filter options.
};

onMounted(() => loadHistory(1));
</script>
