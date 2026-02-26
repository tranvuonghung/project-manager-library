<template>
    <div class="register-page">
      <div class="register-card">
  
        <div class="text-center mb-3">
          <h2>Tạo tài khoản</h2>
          <p class="sub-text">Đăng ký để sử dụng hệ thống thư viện</p>
        </div>
  
        <!-- Họ tên -->
        <div class="form-group">
          <label>Họ và tên</label>
          <input v-model="form.ho_ten" type="text" placeholder="Nhập họ và tên" required />
        </div>
  
        <!-- Ngày sinh -->
        <div class="form-group">
          <label>Ngày sinh</label>
          <input v-model="form.ngay_sinh" type="date" required />
        </div>
  
        <!-- Giới tính -->
        <div class="form-group">
          <label>Giới tính</label>
          <div class="radio-group">
            <label><input type="radio" value="Nam" v-model="form.gioi_tinh" /> Nam</label>
            <label><input type="radio" value="Nữ" v-model="form.gioi_tinh" /> Nữ</label>
            <label><input type="radio" value="Khác" v-model="form.gioi_tinh" /> Khác</label>
          </div>
        </div>
  
        <!-- Số điện thoại -->
        <div class="form-group">
          <label>Số điện thoại</label>
          <input v-model="form.so_dien_thoai" type="text" placeholder="Nhập số điện thoại" required />
        </div>
  
        <!-- Email -->
        <div class="form-group">
          <label>Email</label>
          <input v-model="form.email" type="email" placeholder="Nhập email" required />
        </div>
  
        <!-- Địa chỉ -->
        <div class="form-group">
          <label>Địa chỉ</label>
          <input v-model="form.dia_chi" type="text" placeholder="Nhập địa chỉ" required />
        </div>
  
        <!-- Mật khẩu -->
        <div class="form-group">
          <label>Mật khẩu</label>
          <div class="password-box">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="form.password"
              placeholder="Nhập mật khẩu"
              required
            />
            <span @click="togglePassword">
              {{ showPassword ? 'Ẩn' : 'Hiện' }}
            </span>
          </div>
        </div>
  
        <!-- Xác nhận mật khẩu -->
        <div class="form-group">
          <label>Xác nhận mật khẩu</label>
          <input
            type="password"
            v-model="form.confirmPassword"
            placeholder="Nhập lại mật khẩu"
            required
          />
        </div>
  
        <!-- Button -->
         <router-link to="/login">
            <button class="primary-button" @click="handleRegister">
          Đăng ký
        </button>
         </router-link>
        
  
        <router-link to="/login" class="ghost-button text-center">
          ← Đã có tài khoản? Đăng nhập
        </router-link>
  
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue"
  import { useRouter } from "vue-router"
  
  const router = useRouter()
  
  const showPassword = ref(false)
  
  const form = ref({
    ho_ten: "",
    ngay_sinh: "",
    gioi_tinh: "Nam",
    so_dien_thoai: "",
    email: "",
    dia_chi: "",
    password: "",
    confirmPassword: ""
  })
  
  const togglePassword = () => {
    showPassword.value = !showPassword.value
  }
  
  const handleRegister = () => {
  
    if (form.value.password !== form.value.confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!")
      return
    }
  
    console.log("Dữ liệu gửi lên API:", form.value)
  
    alert("Đăng ký thành công!")
    router.push("/login")
  }
  </script>
  <style scoped>
  .register-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;
    background: linear-gradient(135deg, #1e3a8a, #0f172a);
    font-family: "Inter", "Segoe UI", system-ui, sans-serif;
  }
  
  .register-card {
    width: 100%;
    max-width: 550px;
    background: #ffffff;
    border-radius: 20px;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
    padding: 45px 40px;
    display: flex;
    flex-direction: column;
    gap: 18px;
    transition: 0.3s;
  }
  
  .register-card:hover {
    transform: translateY(-5px);
  }
  
  h2 {
    font-size: 26px;
    font-weight: 700;
    color: #0b1f3a;
  }
  
  .sub-text {
    font-size: 14px;
    color: #6b7280;
  }
  
  /* ===== FORM ===== */
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
  }
  
  .form-group label {
    font-size: 14px;
    font-weight: 600;
  }
  
  /* INPUT CHUẨN HOÁ */
  .form-group input {
    width: 100%;
    height: 48px;
    border-radius: 12px;
    border: 1px solid #d1d5db;
    padding: 0 14px;
    font-size: 14px;
    outline: none;
    transition: all 0.3s ease;
    box-sizing: border-box; /* QUAN TRỌNG để không bị lệch */
  }
  
  .form-group input:focus {
    border-color: #f59e0b;
    box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.2);
  }
  
  /* ===== RADIO ===== */
  .radio-group {
    display: flex;
    gap: 30px;
    align-items: center;
    margin-top: 6px;
  }
  
  .radio-group label {
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
  }
  
  /* ===== PASSWORD BOX ===== */
  .password-box {
    position: relative;
    width: 100%;
  }
  
  .password-box input {
    padding-right: 60px; /* chừa chỗ cho nút hiện/ẩn */
  }
  
  .password-box span {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    font-size: 13px;
    color: #f59e0b;
    font-weight: 600;
  }
  
  /* ===== BUTTON ===== */
  .primary-button {
    width: 100%;
    background: #f59e0b;
    border: none;
    border-radius: 14px;
    padding: 14px;
    color: #fff;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    transition: 0.3s;
    margin-top: 10px;
  }
  
  .primary-button:hover {
    background: #d97706;
    transform: translateY(-2px);
  }
  
  /* ===== LINK BUTTON ===== */
  .ghost-button {
    width: 100%;
    border: 1px solid #d8dde5;
    border-radius: 14px;
    padding: 12px;
    font-size: 15px;
    font-weight: 600;
    color: #1e3a8a;
    text-decoration: none;
    text-align: center;
    transition: 0.3s;
  }
  
  .ghost-button:hover {
    background: #f3f4f6;
  }
  </style>
