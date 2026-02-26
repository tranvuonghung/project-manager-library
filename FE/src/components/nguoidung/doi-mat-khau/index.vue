<template>
    <div class="reset-page">
      <div class="reset-card">
  
        <div class="text-center mb-3">
          <h2>Đổi mật khẩu</h2>
          <p class="sub-text">Vui lòng nhập mã bí mật và mật khẩu mới</p>
        </div>
  
        <!-- Mã bí mật -->
        <div class="form-group">
          <label>Mã bí mật</label>
          <input
            v-model="form.secret"
            type="text"
            placeholder="Nhập mã bí mật"
            required
          />
        </div>
  
        <!-- Mật khẩu mới -->
        <div class="form-group">
          <label>Mật khẩu mới</label>
          <div class="password-box">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="form.password"
              placeholder="Nhập mật khẩu mới"
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
            <button class="btn primary-button">Thay đổi mật khẩu </button> 
        </router-link>
  
        <router-link to="/login" class="ghost-button text-center">
          ← Quay lại đăng nhập
        </router-link>
  
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue"
  
  const showPassword = ref(false)
  
  const form = ref({
    secret: "",
    password: "",
    confirmPassword: ""
  })
  
  const togglePassword = () => {
    showPassword.value = !showPassword.value
  }
  
  const handleChange = () => {
    if (form.value.password !== form.value.confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!")
      return
    }
  
    alert("Đổi mật khẩu thành công!")
  }
  </script>
  
  <style scoped>
  .reset-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;
    background: linear-gradient(135deg, #1e3a8a, #0f172a);
    font-family: "Inter", "Segoe UI", system-ui, sans-serif;
  }
  
  .reset-card {
    width: 100%;
    max-width: 500px;
    background: #ffffff;
    border-radius: 20px;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
    padding: 45px 40px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    transition: 0.3s;
  }
  
  .reset-card:hover {
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
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  
  .form-group label {
    font-size: 14px;
    font-weight: 700;
    color: #0f1f3d;
  }
  
  .form-group input {
    height: 48px;
    width: 100%;
    border-radius: 10px;
    border: 1px solid #d1d5db;
    padding: 10px 14px;
    font-size: 15px;
    outline: none;
    transition: 0.3s;
  }
  
  .form-group input:focus {
    border-color: #f59e0b;
    box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.2);
  }
  
  .password-box {
    position: relative;
  }
  
  .password-box span {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    font-size: 13px;
    color: #f59e0b;
    font-weight: 600;
  }
  
  .primary-button {
    width: 100%;
    background: #f59e0b;
    border: none;
    border-radius: 12px;
    padding: 14px;
    color: #fff;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    transition: 0.3s;
  }
  
  .primary-button:hover {
    background: #d97706;
  }
  
  .ghost-button {
    width: 100%;
    border: 1px solid #d8dde5;
    border-radius: 12px;
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
