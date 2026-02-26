<template>
  <div class="page page-home">
    <section class="hero-grid">
      <aside class="side-panels">
        <div class="panel reveal" style="--delay: 0.05s;">
          <div class="panel-title">Danh mục chính</div>
          <div class="panel-links">
            <button
              v-for="item in mainCategories"
              :key="item.id"
              class="panel-link"
              :class="{ active: item.id === selectedCategory }"
              type="button"
              @click="handleCategorySelect(item)"
            >
              {{ item.label }}
            </button>
          </div>
        </div>
        <div class="panel reveal" style="--delay: 0.1s;">
          <div class="panel-title">Thể loại nhanh</div>
          <div class="chip-grid">
            <button
              v-for="genre in quickGenres"
              :key="genre.id"
              class="chip"
              :class="{ active: genre.id === selectedGenre }"
              type="button"
              @click="handleGenreSelect(genre)"
            >
              {{ genre.label }}
            </button>
          </div>
        </div>
      </aside>

      <div class="hero-main">
        <div v-if="error" class="info-banner info-banner--error">
          {{ error }}
        </div>

        <div class="section-head">
          <div>
            <h2>Gợi ý dành riêng cho bạn</h2>
            <p class="section-sub">Tuyển chọn theo thói quen đọc gần đây của bạn.</p>
          </div>
          <button class="ghost-link" type="button" @click="handleViewAll">Xem tất cả →</button>
        </div>

        <div v-if="loading" class="recommend-grid">
          <article v-for="item in skeletonItems" :key="`recommended-skeleton-${item}`" class="book-card book-card--skeleton">
            <div class="skeleton-cover"></div>
            <div class="book-meta">
              <div class="skeleton-line"></div>
              <div class="skeleton-line skeleton-line--short"></div>
            </div>
          </article>
        </div>

        <div v-else-if="!recommended.length" class="empty-state">
          Chưa có gợi ý phù hợp. Hãy thử đổi danh mục hoặc thể loại.
        </div>

        <div v-else class="recommend-grid">
          <article
            v-for="(book, index) in recommended"
            :key="book.id"
            class="book-card reveal"
            :style="{ '--delay': getDelay(index, 0.1) }"
          >
            <span v-if="book.badge" class="badge" :class="book.badgeClass">{{ book.badge }}</span>
            <div class="cover" :class="book.cover">
              <img
                v-if="getBookImage(book) && !brokenCovers[book.id]"
                class="cover-image"
                :src="getBookImage(book)"
                :alt="book.title"
                loading="lazy"
                @error="handleCoverError(book.id)"
              />
              <div v-else class="cover-fallback">{{ getCoverFallback(book.title) }}</div>
            </div>
            <div class="book-meta">
              <h4 class="book-title">{{ book.title }}</h4>
              <p class="book-author">{{ book.author }}</p>
            </div>
          </article>
        </div>

        <div id="discover-section" class="section-head section-head--discover">
          <div>
            <h3>Khám phá theo Thể loại</h3>
            <p class="section-sub">Lọc nhanh theo mood đọc của bạn.</p>
          </div>
          <div class="pill-group">
            <button
              v-for="filter in discoverFilters"
              :key="filter.id"
              class="pill"
              :class="{ active: filter.id === selectedFilter }"
              type="button"
              @click="handleFilterSelect(filter)"
            >
              {{ filter.label }}
            </button>
          </div>
        </div>

        <div v-if="loading" class="discover-grid">
          <article v-for="item in skeletonItems" :key="`discover-skeleton-${item}`" class="book-card book-card--skeleton">
            <div class="skeleton-cover"></div>
            <div class="book-meta">
              <div class="skeleton-line"></div>
              <div class="skeleton-line skeleton-line--short"></div>
            </div>
            <div class="book-actions">
              <div class="skeleton-line"></div>
              <div class="skeleton-line skeleton-line--short"></div>
            </div>
          </article>
        </div>

        <div v-else-if="!discover.length" class="empty-state">
          Chưa có sách phù hợp với bộ lọc hiện tại.
        </div>

        <div v-else class="discover-grid">
          <article
            v-for="(book, index) in discover"
            :key="book.id"
            class="book-card reveal"
            :style="{ '--delay': getDelay(index, 0.15) }"
          >
            <span class="badge" :class="book.badgeClass">{{ book.badge }}</span>
            <div class="cover" :class="book.cover">
              <img
                v-if="getBookImage(book) && !brokenCovers[book.id]"
                class="cover-image"
                :src="getBookImage(book)"
                :alt="book.title"
                loading="lazy"
                @error="handleCoverError(book.id)"
              />
              <div v-else class="cover-fallback">{{ getCoverFallback(book.title) }}</div>
            </div>
            <div class="book-meta">
              <h4 class="book-title">{{ book.title }}</h4>
              <p class="book-author">{{ book.author }}</p>
            </div>
            <div class="book-actions">
              <button
                class="btn btn-primary"
                type="button"
                :disabled="book.status !== 'available'"
                @click="handleBorrow(book)"
              >
                {{ book.action }}
              </button>
              <button class="btn btn-ghost" type="button" @click="openDetails(book)">
                Chi tiết
              </button>
            </div>
          </article>
        </div>

        <div class="pagination" style="margin-top: 18px;">
          <button class="page-btn" type="button">‹</button>
          <button class="page-btn active" type="button">1</button>
          <button class="page-btn" type="button">2</button>
          <button class="page-btn" type="button">3</button>
          <button class="page-btn" type="button">12</button>
          <button class="page-btn" type="button">›</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { fetchHomeData, borrowBook } from "../services/libraryApi";

const router = useRouter();
const route = useRoute();

const loading = ref(false);
const error = ref("");
const mainCategories = ref([]);
const quickGenres = ref([]);
const recommended = ref([]);
const discoverFilters = ref([]);
const discover = ref([]);

const selectedCategory = ref("all");
const selectedGenre = ref("popular");
const selectedFilter = ref("all");
const brokenCovers = ref({});
const skeletonItems = [1, 2, 3, 4];
const validFilters = new Set(["all", "tech", "general"]);

const getDelay = (index, start = 0.1) => `${start + index * 0.05}s`;
const getBookImage = (book) => book.imageUrl || book.coverImage || book.image || "";
const getCoverFallback = (title = "") => {
  const parts = String(title).split(/\s+/).filter(Boolean).slice(0, 2);
  return parts.join(" ");
};

const handleCoverError = (bookId) => {
  brokenCovers.value = {
    ...brokenCovers.value,
    [bookId]: true,
  };
};

const applyDefaults = (data) => {
  if (!selectedCategory.value && data.mainCategories?.length) {
    selectedCategory.value = data.mainCategories[0].id;
  }
  if (!selectedGenre.value && data.quickGenres?.length) {
    selectedGenre.value = data.quickGenres[0].id;
  }
  if (!selectedFilter.value && data.discoverFilters?.length) {
    selectedFilter.value = data.discoverFilters[0].id;
  }
};

const loadHome = async () => {
  loading.value = true;
  error.value = "";
  try {
    const data = await fetchHomeData({
      filterId: selectedFilter.value,
      categoryId: selectedCategory.value,
      genreId: selectedGenre.value,
    });
    mainCategories.value = data.mainCategories || [];
    quickGenres.value = data.quickGenres || [];
    discoverFilters.value = data.discoverFilters || [];
    recommended.value = data.recommended || [];
    discover.value = data.discover || [];
    applyDefaults(data);
  } catch (err) {
    error.value = "Không thể tải dữ liệu trang chủ.";
  } finally {
    loading.value = false;
  }
};

const handleCategorySelect = (item) => {
  selectedCategory.value = item.id;
  loadHome();
};

const handleGenreSelect = (genre) => {
  selectedGenre.value = genre.id;
  loadHome();
};

const handleFilterSelect = async (filter) => {
  const nextFilterId = filter.id;
  selectedFilter.value = nextFilterId;

  const query = { ...route.query };
  if (nextFilterId === "all") {
    delete query.category;
  } else {
    query.category = nextFilterId;
  }

  await router.replace({ query });
};

const normalizeFilterFromQuery = (value) => {
  const normalized = String(value || "all").trim().toLowerCase();
  if (validFilters.has(normalized)) {
    return normalized;
  }
  return "all";
};

watch(
  () => route.query.category,
  async (value) => {
    const queryFilter = normalizeFilterFromQuery(value);
    selectedFilter.value = queryFilter;
    await loadHome();
  },
  { immediate: true }
);

const handleBorrow = async (book) => {
  if (book.status !== "available") {
    return;
  }
  try {
    await borrowBook({ bookId: book.id });
  } catch (err) {
    error.value = "Không thể gửi yêu cầu mượn sách.";
  }
};

const openDetails = (book) => {
  // TODO: Map to book details page when BE route is ready.
  void book;
};

const handleViewAll = () => {
  // TODO: Navigate to full recommendation list when BE route is ready.
};
</script>
