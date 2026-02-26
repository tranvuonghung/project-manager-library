<template>
  <div class="library-shell">
    <header class="library-header">
      <div class="brand">
        <button class="mobile-menu-btn" type="button" aria-label="Mở menu" @click="toggleMobileMenu">
          <svg
            class="icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M3 6h18"></path>
            <path d="M3 12h18"></path>
            <path d="M3 18h18"></path>
          </svg>
        </button>
        <span class="brand-mark">Thư Viện</span>
      </div>
      <nav class="main-nav" :class="{ 'is-open': isMobileMenuOpen }" aria-label="Primary">
        <router-link to="/" class="nav-link" @click="closeMobileMenu">Trang chủ</router-link>
        <router-link to="/library" class="nav-link" @click="closeMobileMenu">Sách của tôi</router-link>
        <router-link to="/history" class="nav-link" @click="closeMobileMenu">Lịch sử</router-link>
        <div class="nav-category-wrap" :class="{ 'is-open': isCategoryMenuOpen }" ref="categoryMenuRef">
          <button
            class="nav-link nav-link--menu"
            type="button"
            :aria-expanded="isCategoryMenuOpen"
            @click="toggleCategoryMenu"
          >
            Thể loại
            <svg
              class="icon icon--sm"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M6 9l6 6 6-6"></path>
            </svg>
          </button>

          <div v-if="isCategoryMenuOpen" class="category-dropdown">
            <button
              v-for="item in categoryOptions"
              :key="item.id"
              class="category-dropdown__item"
              type="button"
              @click="selectCategory(item.id)"
            >
              {{ item.label }}
            </button>
          </div>
        </div>
      </nav>
      <div class="header-actions">
        <label class="search">
          <svg
            class="icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7"></circle>
            <path d="M20 20l-3.5-3.5"></path>
          </svg>
          <input
            v-model="searchQuery"
            type="search"
            placeholder="Tìm kiếm theo tên sách, tác giả"
            :disabled="isSearching"
            @keydown.enter.prevent="submitSearch"
          />
        </label>
        <button class="icon-btn" type="button" aria-label="Thông báo" @click="handleNotifications">
          <svg
            class="icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          <span v-if="notificationCount" class="notify-badge">
            {{ notificationCount > 99 ? "99+" : notificationCount }}
          </span>
        </button>
        <button class="user-pill" type="button" @click="openProfile">
          <span>{{ profile.name }}</span>
          <span class="user-avatar">{{ profile.initials }}</span>
        </button>
      </div>
    </header>

    <main class="library-main">
      <slot />
    </main>

    <nav class="mobile-nav" aria-label="Mobile">
      <router-link to="/" class="mobile-link">
        <svg
          class="icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M3 10l9-7 9 7"></path>
          <path d="M5 10v10h14V10"></path>
        </svg>
        <span>Home</span>
      </router-link>
      <router-link to="/library" class="mobile-link">
        <svg
          class="icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M4 6h12a2 2 0 0 1 2 2v12H6a2 2 0 0 1-2-2V6z"></path>
          <path d="M6 6V4a2 2 0 0 1 2-2h10v14"></path>
        </svg>
        <span>Library</span>
      </router-link>
      <router-link to="/history" class="mobile-link">
        <svg
          class="icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M12 8v4l3 3"></path>
          <circle cx="12" cy="12" r="9"></circle>
        </svg>
        <span>History</span>
      </router-link>
      <router-link to="/profile" class="mobile-link">
        <svg
          class="icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        <span>Profile</span>
      </router-link>
    </nav>

    <footer class="library-footer">
      <div class="footer-inner">
        <div class="footer-brand">Truyện Hay</div>
        <p>Website đọc truyện online chất lượng cao.</p>
        <div class="footer-meta">Copyright © 2024.</div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { searchBooks } from "../../../services/libraryApi";
import { fetchNotifications, fetchProfile } from "../../../services/userApi";
import { getInitials } from "../../../utils/formatters";

const router = useRouter();
const route = useRoute();
const searchQuery = ref("");
const isSearching = ref(false);
const profile = ref({ name: "Admin User", initials: "A" });
const notificationCount = ref(0);
const isMobileMenuOpen = ref(false);
const isCategoryMenuOpen = ref(false);
const categoryMenuRef = ref(null);
const categoryOptions = [
  { id: "all", label: "Tất cả" },
  { id: "tech", label: "Công nghệ" },
  { id: "general", label: "Tổng hợp" },
];

const loadHeader = async () => {
  try {
    const userProfile = await fetchProfile();
    profile.value = {
      name: userProfile?.name || "Admin User",
      initials: getInitials(userProfile?.name || "Admin User"),
    };
  } catch (error) {
    profile.value = { name: "Admin User", initials: "A" };
  }

  try {
    const notify = await fetchNotifications();
    notificationCount.value = notify?.unread || 0;
  } catch (error) {
    notificationCount.value = 0;
  }
};

const submitSearch = async () => {
  const query = searchQuery.value.trim();
  if (!query) {
    return;
  }

  isSearching.value = true;
  try {
    await searchBooks({ query });
  } finally {
    isSearching.value = false;
  }

  router.push({ path: "/library", query: { q: query } });
};

const handleNotifications = () => {
  // TODO: Open notifications panel or navigate to a dedicated page.
};

const openProfile = () => {
  closeMobileMenu();
  closeCategoryMenu();
  router.push("/profile");
};

const toggleCategoryMenu = () => {
  isCategoryMenuOpen.value = !isCategoryMenuOpen.value;
};

const closeCategoryMenu = () => {
  isCategoryMenuOpen.value = false;
};

const selectCategory = async (categoryId) => {
  closeCategoryMenu();
  closeMobileMenu();

  const query = { ...route.query };
  if (categoryId === "all") {
    delete query.category;
  } else {
    query.category = categoryId;
  }

  await router.push({
    path: "/",
    query,
    hash: "#discover-section",
  });

  await nextTick();
  const discoverSection = document.getElementById("discover-section");
  if (discoverSection) {
    discoverSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const onDocumentClick = (event) => {
  if (!categoryMenuRef.value) {
    return;
  }
  if (!categoryMenuRef.value.contains(event.target)) {
    closeCategoryMenu();
  }
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  if (isMobileMenuOpen.value) {
    closeCategoryMenu();
  }
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

watch(
  () => route.path,
  () => {
    closeMobileMenu();
    closeCategoryMenu();
  }
);

onMounted(() => {
  loadHeader();
  document.addEventListener("click", onDocumentClick);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", onDocumentClick);
});
</script>

<style>
@import "../../../assets/css/library.css";
</style>
