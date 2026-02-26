<template>
  <div class="pm-shell">
    <header class="pm-topbar">
      <div class="pm-brand">{{ brand }}</div>
      <div class="pm-top-actions">
        <button class="pm-icon-btn" type="button" aria-label="Tìm kiếm">
          <AppIcon name="search" :size="17" />
        </button>
        <button class="pm-icon-btn" type="button" aria-label="Giao diện">
          <AppIcon name="moon" :size="17" />
        </button>
      </div>
    </header>

    <main class="pm-content">
      <section class="pm-profile-card">
        <div class="pm-avatar-wrap">
          <img class="pm-avatar" :src="resolvedAvatarSrc" :alt="displayName" />
          <label class="pm-camera-btn" aria-label="Đổi ảnh đại diện">
            <AppIcon name="camera" :size="12" />
            <input type="file" accept="image/*" class="pm-hidden-input" @change="handleAvatarSelect" />
          </label>
        </div>

        <h1 class="pm-name">{{ displayName }}</h1>
        <p class="pm-email">{{ email }}</p>

        <div class="pm-stats">
          <div
            v-for="(stat, index) in stats"
            :key="`${stat.label}-${index}`"
            class="pm-stat-item"
            :class="{ 'pm-stat-item--last': index === stats.length - 1 }"
          >
            <div class="pm-stat-value">{{ stat.value }}</div>
            <div class="pm-stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </section>

      <section v-for="section in sections" :key="section.title" class="pm-section">
        <h2 class="pm-section-title">{{ section.title }}</h2>
        <div class="pm-menu-card">
          <button
            v-for="item in section.items"
            :key="item.id || item.label"
            class="pm-menu-item"
            type="button"
            @click="handleMenuClick(item)"
          >
            <span class="pm-menu-left">
              <span class="pm-menu-icon" :class="`pm-tone-${getTone(item)}`">
                <AppIcon :name="item.icon || 'settings'" :size="15" />
              </span>
              <span class="pm-menu-label" :class="`pm-text-${getTone(item)}`">{{ item.label }}</span>
            </span>
            <AppIcon name="chevron-right" :size="15" class="pm-chevron" />
          </button>
        </div>
      </section>
    </main>

    <nav class="pm-bottom-nav" aria-label="Điều hướng nhanh">
      <button
        v-for="item in bottomNav"
        :key="item.id || item.label"
        class="pm-bottom-item"
        :class="{ 'is-active': isNavActive(item), 'is-disabled': !canNavigate(item) }"
        type="button"
        :aria-disabled="!canNavigate(item)"
        @click="handleNavClick(item)"
      >
        <AppIcon :name="item.icon || 'home'" :size="17" />
        <span>{{ item.label }}</span>
      </button>
    </nav>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import AppIcon from "./AppIcon.vue";

const props = defineProps({
  brand: {
    type: String,
    default: "Truyện Hay",
  },
  displayName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  avatarSrc: {
    type: String,
    required: true,
  },
  stats: {
    type: Array,
    default: () => [],
  },
  sections: {
    type: Array,
    default: () => [],
  },
  bottomNav: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["menu-click", "nav-click", "avatar-change"]);

const router = useRouter();
const route = useRoute();
const localAvatarPreview = ref("");

const resolvedAvatarSrc = computed(() => localAvatarPreview.value || props.avatarSrc);
const canNavigate = (item) => typeof item.to === "string" && item.to.length > 0;
const getTone = (item) => item.tone || "slate";

const handleAvatarSelect = (event) => {
  const file = event?.target?.files?.[0];
  if (!file || !file.type.startsWith("image/")) {
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    const nextAvatar = String(reader.result || "");
    localAvatarPreview.value = nextAvatar;
    emit("avatar-change", { file, avatarUrl: nextAvatar });
  };
  reader.readAsDataURL(file);
};

const handleMenuClick = (item) => {
  emit("menu-click", item);
  if (canNavigate(item)) {
    router.push(item.to);
  }
};

const handleNavClick = (item) => {
  emit("nav-click", item);
  if (canNavigate(item)) {
    router.push(item.to);
  }
};

const isNavActive = (item) => {
  if (Array.isArray(item.match) && item.match.includes(route.path)) {
    return true;
  }
  return canNavigate(item) && route.path === item.to;
};
</script>

<style scoped>
.pm-shell {
  min-height: 100vh;
  background: radial-gradient(560px 240px at 100% 0%, rgba(248, 219, 144, 0.36), transparent 56%),
    radial-gradient(420px 220px at 0% 100%, rgba(153, 178, 204, 0.28), transparent 58%),
    #eef0f4;
  color: #1f2937;
  font-family: "Inter", "Segoe UI", "Tahoma", sans-serif;
}

.pm-topbar {
  position: sticky;
  top: 0;
  z-index: 20;
  height: 54px;
  background: linear-gradient(92deg, #f3cb00 0%, #f7d73e 58%, #f3cb00 100%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 14px;
  box-shadow: 0 1px 0 #e4bc00;
}

.pm-brand {
  font-family: "Brush Script MT", "Segoe Script", cursive;
  font-size: 31px;
  line-height: 1;
  color: #111827;
}

.pm-top-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pm-icon-btn {
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  color: #111827;
  display: grid;
  place-items: center;
  padding: 0;
  cursor: pointer;
}

.pm-content {
  width: min(100%, 440px);
  margin: 0 auto;
  padding: 12px 12px 96px;
}

.pm-profile-card {
  background: #ffffff;
  border: 1px solid #eadfc8;
  border-radius: 14px;
  text-align: center;
  padding: 16px 18px 14px;
  box-shadow: 0 12px 24px rgba(31, 27, 22, 0.08);
}

.pm-avatar-wrap {
  position: relative;
  width: fit-content;
  margin: 0 auto 10px;
}

.pm-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 3px solid #f3cb00;
  object-fit: cover;
}

.pm-camera-btn {
  position: absolute;
  right: -3px;
  bottom: -2px;
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 50%;
  background: #f3cb00;
  color: #111827;
  display: grid;
  place-items: center;
  padding: 0;
  cursor: pointer;
}

.pm-hidden-input {
  display: none;
}

.pm-name {
  margin: 0;
  font-size: 30px;
  font-weight: 700;
  line-height: 1.2;
}

.pm-email {
  margin: 5px 0 0;
  font-size: 13px;
  color: #9aa3b3;
}

.pm-stats {
  margin-top: 12px;
  display: flex;
}

.pm-stat-item {
  flex: 1;
  border-right: 1px solid #e4e7ec;
}

.pm-stat-item--last {
  border-right: none;
}

.pm-stat-value {
  font-size: 22px;
  font-weight: 700;
  color: #111827;
  line-height: 1;
}

.pm-stat-label {
  margin-top: 4px;
  text-transform: uppercase;
  font-size: 10px;
  letter-spacing: 0.08em;
  color: #9aa3b3;
}

.pm-section {
  margin-top: 14px;
}

.pm-section-title {
  margin: 0 4px 8px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.13em;
  color: #7184a1;
  font-weight: 700;
}

.pm-menu-card {
  border-radius: 14px;
  border: 1px solid #eadfc8;
  background: #ffffff;
  overflow: hidden;
}

.pm-menu-item {
  width: 100%;
  border: none;
  background: transparent;
  padding: 12px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border-bottom: 1px solid #f2ebe0;
  transition: background-color 0.2s ease;
}

.pm-menu-item:hover {
  background: #fffaf0;
}

.pm-menu-item:last-child {
  border-bottom: none;
}

.pm-menu-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.pm-menu-icon {
  width: 26px;
  height: 26px;
  border-radius: 8px;
  display: grid;
  place-items: center;
}

.pm-menu-label {
  font-size: 14px;
  font-weight: 600;
  color: #253047;
}

.pm-chevron {
  color: #9eabc0;
}

.pm-tone-blue {
  background: #e7efff;
  color: #3975ff;
}

.pm-tone-amber {
  background: #fff4df;
  color: #cf8d12;
}

.pm-tone-slate {
  background: #edf1f6;
  color: #5f6b7f;
}

.pm-tone-rose {
  background: #ffe8ea;
  color: #ef4f52;
}

.pm-text-rose {
  color: #ef4f52;
}

.pm-text-blue,
.pm-text-amber,
.pm-text-slate {
  color: #253047;
}

.pm-bottom-nav {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 30;
  background: #ffffff;
  border-top: 1px solid #e4e7ec;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  padding: 8px 4px calc(8px + env(safe-area-inset-bottom));
}

.pm-bottom-item {
  border: none;
  background: transparent;
  color: #9aa6ba;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  font-size: 10px;
  font-weight: 600;
  padding: 3px 0;
  cursor: pointer;
}

.pm-bottom-item.is-active {
  color: #b88600;
  background: #fff5d7;
  border-radius: 10px;
}

.pm-bottom-item.is-disabled {
  color: #c4cbd7;
}

@media (min-width: 768px) {
  .pm-topbar {
    margin: 10px 10px 0;
    border-radius: 10px;
  }

  .pm-bottom-nav {
    left: 10px;
    right: 10px;
    bottom: 10px;
    border-radius: 12px;
    border: 1px solid #e4e7ec;
  }
}
</style>
