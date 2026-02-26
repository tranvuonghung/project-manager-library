<template>
  <nav class="admin-menu" aria-label="Admin menu">
    <div class="admin-menu__inner">
      <router-link class="admin-menu__link" to="/admin/dashboard">Bảng điều khiển</router-link>
      <router-link class="admin-menu__link" to="/admin/profile">Hồ sơ</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "MenuAdmin",
};
</script>

<style scoped>
.admin-menu {
  border-bottom: 1px solid #e5e7eb;
  background: #f8fafc;
  padding: 8px 16px;
}

.admin-menu__inner {
  display: flex;
  align-items: center;
  gap: 8px;
}

.admin-menu__link {
  border: 1px solid transparent;
  border-radius: 9999px;
  color: #334155;
  font-size: 14px;
  font-weight: 700;
  padding: 8px 14px;
  text-decoration: none;
  transition: all 0.18s ease;
}

.admin-menu__link:hover {
  background: #fff4cf;
  border-color: #f3d374;
  color: #1f2937;
}

.admin-menu__link.router-link-exact-active {
  background: #fcd34d;
  border-color: #e6b422;
  color: #1f2937;
}

@media (max-width: 768px) {
  .admin-menu {
    padding: 8px 10px;
  }

  .admin-menu__inner {
    overflow-x: auto;
    padding-bottom: 2px;
  }

  .admin-menu__link {
    white-space: nowrap;
    flex: 0 0 auto;
  }
}
</style>
