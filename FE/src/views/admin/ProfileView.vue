<template>
  <ProfileMobileLayout
    brand="Truyện Hay"
    :display-name="profile.name"
    :email="profile.email"
    :avatar-src="profile.avatarUrl || avatarFallback"
    :stats="stats"
    :sections="sections"
    :bottom-nav="bottomNav"
    @menu-click="handleMenuClick"
    @avatar-change="handleAvatarChange"
  />

  <BaseToast :visible="toast.isVisible.value" :message="toast.message.value" :type="toast.type.value" />

  <BaseModal
    v-model="showEditModal"
    title="Cập nhật tài khoản quản trị"
    confirm-text="Lưu thay đổi"
    :loading="savingProfile"
    @confirm="saveProfile"
  >
    <div class="form-grid">
      <BaseInput v-model="editForm.name" label="Tên quản trị viên" placeholder="Nhập tên hiển thị" />
      <BaseInput v-model="editForm.email" type="email" label="Email quản trị" placeholder="Nhập email" />
    </div>
    <p class="profile-modal-help">Dữ liệu đang chạy ở chế độ mock, chưa kết nối backend.</p>
  </BaseModal>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import BaseInput from "../../components/base/BaseInput.vue";
import BaseModal from "../../components/base/BaseModal.vue";
import BaseToast from "../../components/base/BaseToast.vue";
import ProfileMobileLayout from "../../components/common/ProfileMobileLayout.vue";
import { useToast } from "../../composables/useToast";
import avatarFallback from "../../assets/images/99-hinh-anh-hacker-cuc-chat-ngau-dep-nhat-e1669974791786.jpg";
import { borrowService } from "../../services/borrow.service";
import { fetchProfile, updateProfile } from "../../services/userApi";
import { useAuthStore } from "../../store/auth.store";

const authStore = useAuthStore();
const router = useRouter();
const toast = useToast();

const profile = reactive({
  id: 1,
  name: "Quản trị viên",
  email: "admin@library.local",
  avatarUrl: "",
});

const borrowRecords = ref([]);
const showEditModal = ref(false);
const savingProfile = ref(false);

const editForm = reactive({
  name: "",
  email: "",
});

const stats = computed(() => {
  const borrowingCount = borrowRecords.value.filter((item) => item.status === "borrowing").length;
  const returnedCount = borrowRecords.value.filter((item) => item.status === "returned").length;
  return [
    { label: "Đang mượn", value: String(borrowingCount) },
    { label: "Đã trả", value: String(returnedCount) },
  ];
});

const sections = [
  {
    title: "Quản trị hệ thống",
    items: [
      { id: "edit-profile", label: "Thông tin quản trị", icon: "users", tone: "blue" },
      { id: "permission", label: "Phân quyền truy cập", icon: "shield", tone: "amber" },
      { id: "admin-settings", label: "Cài đặt ứng dụng", icon: "settings", tone: "slate" },
    ],
  },
  {
    title: "Khác",
    items: [{ id: "logout", label: "Đăng xuất", icon: "logout", tone: "rose" }],
  },
];

const bottomNav = [
  {
    id: "dashboard",
    label: "Bảng điều khiển",
    icon: "dashboard",
    to: "/admin/dashboard",
    match: ["/admin/dashboard"],
  },
  { id: "books", label: "Sách", icon: "book" },
  { id: "users", label: "Người dùng", icon: "users" },
  {
    id: "profile",
    label: "Cá nhân",
    icon: "profile",
    to: "/admin/profile",
    match: ["/admin/profile"],
  },
];

const setProfileState = (payload = {}) => {
  profile.id = payload.id || profile.id;
  profile.name = payload.name || profile.name;
  profile.email = payload.email || profile.email;
  profile.avatarUrl = payload.avatarUrl || profile.avatarUrl;
};

const syncAuthStore = (payload = {}) => {
  if (!authStore.user) {
    return;
  }
  authStore.user = {
    ...authStore.user,
    ...payload,
  };
};

const loadProfile = async () => {
  try {
    const data = await fetchProfile();
    setProfileState(data);
    editForm.name = profile.name;
    editForm.email = profile.email;
  } catch (error) {
    toast.showError("Không thể tải hồ sơ quản trị");
  }
};

const loadBorrowStats = async () => {
  try {
    borrowRecords.value = await borrowService.getAll();
  } catch (error) {
    borrowRecords.value = [];
  }
};

const handleAvatarChange = async ({ avatarUrl }) => {
  if (!avatarUrl) {
    return;
  }

  try {
    await updateProfile({
      payload: {
        name: profile.name,
        email: profile.email,
        avatarUrl,
      },
    });
    setProfileState({ avatarUrl });
    syncAuthStore({ avatarUrl });
    toast.showSuccess("Cập nhật ảnh đại diện thành công");
  } catch (error) {
    toast.showError("Không thể cập nhật ảnh đại diện");
  }
};

const saveProfile = async () => {
  const nextName = editForm.name.trim();
  const nextEmail = editForm.email.trim();

  if (!nextName) {
    toast.showError("Vui lòng nhập tên quản trị viên");
    return;
  }
  if (!nextEmail || !nextEmail.includes("@")) {
    toast.showError("Email không hợp lệ");
    return;
  }

  savingProfile.value = true;
  try {
    await updateProfile({
      payload: {
        name: nextName,
        email: nextEmail,
        avatarUrl: profile.avatarUrl,
      },
    });

    setProfileState({ name: nextName, email: nextEmail });
    syncAuthStore({ name: nextName, email: nextEmail });
    showEditModal.value = false;
    toast.showSuccess("Đã cập nhật tài khoản quản trị");
  } catch (error) {
    toast.showError("Không thể cập nhật tài khoản");
  } finally {
    savingProfile.value = false;
  }
};

const handleMenuClick = async (item) => {
  if (item.id === "edit-profile") {
    editForm.name = profile.name;
    editForm.email = profile.email;
    showEditModal.value = true;
    return;
  }

  if (item.id === "permission") {
    toast.showSuccess("Màn hình phân quyền sẽ được bổ sung sau");
    return;
  }

  if (item.id === "admin-settings") {
    toast.showSuccess("Màn hình cài đặt sẽ được bổ sung sau");
    return;
  }

  if (item.id === "logout") {
    await authStore.logout();
    router.push("/admin/login");
  }
};

onMounted(async () => {
  await loadProfile();
  await loadBorrowStats();
});
</script>

<style scoped>
.profile-modal-help {
  margin-top: 10px;
  font-size: 13px;
  color: #6b7280;
}
</style>
