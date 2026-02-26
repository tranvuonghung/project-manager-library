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
    title="Chỉnh sửa hồ sơ"
    confirm-text="Lưu thay đổi"
    :loading="savingProfile"
    @confirm="saveProfile"
  >
    <div class="form-grid">
      <BaseInput v-model="editForm.name" label="Họ và tên" placeholder="Nhập họ và tên" />
      <BaseInput v-model="editForm.email" type="email" label="Email" placeholder="Nhập email" />
    </div>
    <p class="profile-modal-help">Thông tin hồ sơ đang được lưu bằng dữ liệu giả lập (mock).</p>
  </BaseModal>

  <BaseModal
    v-model="showPasswordModal"
    title="Đổi mật khẩu"
    confirm-text="Xác nhận đổi mật khẩu"
    :loading="changingPassword"
    @confirm="changePassword"
  >
    <div class="form-grid">
      <BaseInput
        v-model="passwordForm.currentPassword"
        type="password"
        label="Mật khẩu hiện tại"
        placeholder="Nhập mật khẩu hiện tại"
      />
      <BaseInput
        v-model="passwordForm.newPassword"
        type="password"
        label="Mật khẩu mới"
        placeholder="Tối thiểu 6 ký tự"
      />
      <BaseInput
        v-model="passwordForm.confirmPassword"
        type="password"
        label="Xác nhận mật khẩu mới"
        placeholder="Nhập lại mật khẩu mới"
      />
    </div>
    <p v-if="passwordError" class="profile-modal-error">{{ passwordError }}</p>
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
  id: 2,
  name: "Người dùng",
  email: "nguoidung@library.local",
  avatarUrl: "",
});

const borrowRecords = ref([]);
const showEditModal = ref(false);
const showPasswordModal = ref(false);
const savingProfile = ref(false);
const changingPassword = ref(false);
const passwordError = ref("");

const editForm = reactive({
  name: "",
  email: "",
});

const passwordForm = reactive({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const stats = computed(() => {
  const readCount = borrowRecords.value.filter((item) => item.status === "returned").length;
  const borrowingCount = borrowRecords.value.filter((item) => item.status === "borrowing").length;
  return [
    { label: "Đã đọc", value: String(readCount) },
    { label: "Đang mượn", value: String(borrowingCount) },
  ];
});

const sections = [
  {
    title: "Tài khoản & bảo mật",
    items: [
      { id: "edit-profile", label: "Chỉnh sửa hồ sơ", icon: "user", tone: "blue" },
      { id: "change-password", label: "Đổi mật khẩu", icon: "lock", tone: "amber" },
      { id: "settings", label: "Cài đặt ứng dụng", icon: "settings", tone: "slate" },
    ],
  },
  {
    title: "Khác",
    items: [{ id: "logout", label: "Đăng xuất", icon: "logout", tone: "rose" }],
  },
];

const bottomNav = [
  { id: "home", label: "Trang chủ", icon: "home", to: "/" },
  { id: "library", label: "Thư viện", icon: "book", to: "/library" },
  { id: "history", label: "Lịch sử", icon: "layers", to: "/history" },
  { id: "profile", label: "Cá nhân", icon: "profile", to: "/profile" },
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
    toast.showError("Không thể tải thông tin hồ sơ");
  }
};

const loadBorrowStats = async () => {
  try {
    const userId = Number(authStore.user?.id || profile.id || 2);
    borrowRecords.value = await borrowService.getByUser(userId);
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
    toast.showError("Vui lòng nhập họ và tên");
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
    toast.showSuccess("Cập nhật hồ sơ thành công");
  } catch (error) {
    toast.showError("Không thể cập nhật hồ sơ");
  } finally {
    savingProfile.value = false;
  }
};

const resetPasswordForm = () => {
  passwordForm.currentPassword = "";
  passwordForm.newPassword = "";
  passwordForm.confirmPassword = "";
  passwordError.value = "";
};

const changePassword = async () => {
  passwordError.value = "";

  if (!passwordForm.currentPassword) {
    passwordError.value = "Vui lòng nhập mật khẩu hiện tại.";
    return;
  }
  if (passwordForm.newPassword.length < 6) {
    passwordError.value = "Mật khẩu mới cần ít nhất 6 ký tự.";
    return;
  }
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    passwordError.value = "Mật khẩu xác nhận không khớp.";
    return;
  }

  changingPassword.value = true;
  try {
    await new Promise((resolve) => setTimeout(resolve, 300));
    showPasswordModal.value = false;
    resetPasswordForm();
    toast.showSuccess("Đổi mật khẩu thành công");
  } catch (error) {
    passwordError.value = "Không thể đổi mật khẩu lúc này.";
  } finally {
    changingPassword.value = false;
  }
};

const handleMenuClick = async (item) => {
  if (item.id === "edit-profile") {
    editForm.name = profile.name;
    editForm.email = profile.email;
    showEditModal.value = true;
    return;
  }

  if (item.id === "change-password") {
    resetPasswordForm();
    showPasswordModal.value = true;
    return;
  }

  if (item.id === "settings") {
    toast.showSuccess("Tính năng cài đặt sẽ sớm được cập nhật");
    return;
  }

  if (item.id === "logout") {
    await authStore.logout();
    router.push("/login");
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

.profile-modal-error {
  margin-top: 10px;
  color: #dc2626;
  font-size: 13px;
  font-weight: 600;
}
</style>
