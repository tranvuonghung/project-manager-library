<template>
    <div class="user-login-wrapper">
      <div class="user-login-card">

        <!-- Admin Link -->
        <div class=" d-flex flex-row-reverse">
            <router-link to="/admin/login" class="btn btn-warning"><b>Admin</b></router-link>
        </div>
  
        <!-- Logo -->
        <div class="logo">
          <img src="/logo.png" alt="logo" />
        </div>
  
        <h2>Đăng nhập</h2>
  
        <!-- Form -->
        <form @submit.prevent="handleLogin">
  
          <!-- Email / Username -->
          <div class="form-group">
            <label>Email hoặc Username</label>
            <input 
              type="text" 
             
              placeholder="Nhập email hoặc username"
              required
            />
            <!-- v-model="form.username" -->
          </div>
  
          <!-- Password -->
          <div class="form-group">
            <label>Mật khẩu</label>
            <div class="password-box">
              <input 
                :type="showPassword ? 'text' : 'password'"
                
                placeholder="Nhập mật khẩu"
                required
              />
              <!-- v-model="form.password" -->
              <span @click="togglePassword">
                {{ showPassword ? 'Ẩn' : 'Hiện' }}
              </span>
            </div>
          </div>
  
          <!-- Remember -->
          <div class="remember">
            <input type="checkbox"  />
            <!-- v-model="form.remember" -->
            <label>Ghi nhớ đăng nhập</label>
          </div>
  
          <!-- Button -->
          <button type="submit" class="login-btn">
            ĐĂNG NHẬP
          </button>
  
          <!-- Links -->
          <div class="extra-links">
            <router-link to="/quen-mat-khau">Quên mật khẩu?</router-link>
            <router-link to="/dang-ky">Chưa có tài khoản? Đăng ký</router-link>
          </div>
  
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const showPassword = ref(false)
  
  const form = ref({
    username: '',
    password: '',
    remember: false
  })
  
  const togglePassword = () => {
    showPassword.value = !showPassword.value
  }
  
  const handleLogin = () => {
    console.log("Dữ liệu đăng nhập:", form.value)
    // TODO: gọi API đăng nhập
  }
  </script>
  
  <style scoped>
.user-login-wrapper {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #111827, #1f2937);
  animation: fadeInBg 1s ease;
}

/* CARD */
.user-login-card {
  width: 550px;
  background: #fff;
  padding: 65px;
  border-radius: 42px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.25);
  animation: slideUp 0.6s ease;
  transition: 0.3s;
}

.login-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 30px 70px rgba(0,0,0,0.3);
}

/* LOGO */
.logo {
  text-align: center;
  margin-bottom: 15px;
}

.logo img {
  width: 65px;
  transition: 0.4s;
}

.logo img:hover {
  transform: rotate(8deg) scale(1.1);
}

/* TITLE */
h2 {
  text-align: center;
  margin-bottom: 25px;
  color: #333;
  animation: fadeIn 1s ease;
}

/* FORM */
.form-group {
  margin-bottom: 20px;
  transition: 0.3s;
}

.form-group label {
  font-size: 14px;
  font-weight: 500;
}

/* INPUT */
.form-group input {
  width: 100%;
  height: 45px;
  padding: 10px 14px;
  margin-top: 6px;
  border: 1px solid #ddd;
  border-radius: 10px;
  outline: none;
  transition: all 0.3s ease;
}

.form-group input:focus {
  border-color: #f6c343;
  box-shadow: 0 0 0 3px rgba(246,195,67,0.25);
  transform: scale(1.02);
}

/* PASSWORD */
.password-box {
  position: relative;
}

.password-box input {
  padding-right: 55px;
}

.password-box span {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 13px;
  color: #f6c343;
  font-weight: 600;
  transition: 0.3s;
}

.password-box span:hover {
  color: #e0ad2f;
  transform: translateY(-50%) scale(1.1);
}

/* REMEMBER */
.remember {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 22px;
  font-size: 14px;
}

/* BUTTON */
.login-btn {
  width: 100%;
  height: 48px;
  background: #f6c343;
  border: none;
  border-radius: 12px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login-btn:hover {
  background: #e0ad2f;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(246,195,67,0.4);
}

.login-btn:active {
  transform: scale(0.98);
}

/* LINKS */
.extra-links {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  font-size: 13px;
}

.extra-links a {
  text-decoration: none;
  color: #f6c343;
  position: relative;
  transition: 0.3s;
}

.extra-links a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 0%;
  height: 2px;
  background: #f6c343;
  transition: 0.3s;
}   

.extra-links a:hover::after {
  width: 100%;
}

/* ===== ANIMATIONS ===== */

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInBg {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>