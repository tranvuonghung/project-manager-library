<template>
    <div class="admin-login-wrapper">
      <div class="admin-login-card">
  
        <div class="admin-badge">ADMIN</div>
        
        <div class=" d-flex flex-row-reverse">
            <router-link to="/login" class="btn btn-danger"><b>User</b></router-link>
        </div>

        <div class="logo">
          <img src="/logo.png" alt="logo" />
        </div>
  
        <h3 class="text-center">Đăng nhập quản trị</h3>
  
        <form @submit.prevent="handleLogin">
  
          <div class="form-group mt-4">
            <label>Email quản trị</label>
            <input 
              type="text"
              v-model="form.username"
              placeholder="Nhập email"
              required
            />
          </div>
  
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
  
          <button type="submit" class="login-btn">
            ĐĂNG NHẬP ADMIN
          </button>
  
        </form>
  
        <p class="back-link">
          <router-link to="/login">← Quay lại đăng nhập người dùng</router-link>
        </p>
  
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  const showPassword = ref(false)
  
  const form = ref({
    username: '',
    password: ''
  })
  
  const togglePassword = () => {
    showPassword.value = !showPassword.value
  }
  
  const handleLogin = () => {
  
    // Demo kiểm tra cứng (sau này thay bằng API)
    if (form.value.username === 'admin@localhost' && form.value.password === '123456') {
      alert("Đăng nhập admin thành công")
      router.push('/admin/dashboard')
    } else {
      alert("Sai tài khoản admin")
    }
  }
  </script>
  
  <style scoped>
.admin-login-wrapper {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #0f172a, #1e293b);
  animation: fadeInBg 0.8s ease;
}

/* CARD */
.admin-login-card {
  width: 550px;
  background: #ffffff;
  padding: 60px;
  border-radius: 20px;
  box-shadow: 0 25px 60px rgba(0,0,0,0.35);
  position: relative;
  animation: slideUp 0.6s ease;
  transition: 0.3s;
}

.admin-login-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 35px 80px rgba(0,0,0,0.45);
}

/* BADGE */
.admin-badge {
  position: absolute;
  top: -14px;
  right: -14px;
  background: linear-gradient(45deg, #dc2626, #991b1b);
  color: white;
  padding: 8px 16px;
  font-size: 11px;
  font-weight: bold;
  border-radius: 30px;
  box-shadow: 0 6px 20px rgba(220,38,38,0.4);
  animation: pulse 2s infinite;
}

/* LOGO */
.logo {
  text-align: center;
  margin-bottom: 15px;
}

.logo img {
  width: 70px;
  transition: 0.4s;
}

.logo img:hover {
  transform: rotate(10deg) scale(1.1);
}

/* TITLE */
h3 {
  text-align: center;
  margin-bottom: 25px;
  color: #111827;
  font-size: 22px;
  font-weight: 700;
}

/* FORM */
.form-group {
  margin-bottom: 22px;
}

.form-group label {
  font-weight: 600;
  font-size: 14px;
}

.form-group input {
  width: 100%;
  height: 48px;
  padding: 10px 14px;
  margin-top: 6px;
  border-radius: 12px;
  border: 1px solid #d1d5db;
  outline: none;
  transition: all 0.3s ease;
}

.form-group input:focus {
  border-color: #dc2626;
  box-shadow: 0 0 0 3px rgba(220,38,38,0.25);
  transform: scale(1.02);
}

/* PASSWORD */
.password-box {
  position: relative;
}

.password-box input {
  padding-right: 60px;
}

.password-box span {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  color: #dc2626;
  transition: 0.3s;
}

.password-box span:hover {
  transform: translateY(-50%) scale(1.1);
}

/* BUTTON */
.login-btn {
  width: 100%;
  height: 52px;
  margin-top: 15px;
  background: linear-gradient(45deg, #dc2626, #991b1b);
  border: none;
  border-radius: 14px;
  font-weight: bold;
  color: white;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 25px rgba(220,38,38,0.4);
}

.login-btn:active {
  transform: scale(0.98);
}

/* BACK LINK */
.back-link {
  text-align: center;
  margin-top: 22px;
  font-size: 13px;
}

.back-link a {
  text-decoration: none;
  color: #6b7280;
  position: relative;
  transition: 0.3s;
}

.back-link a:hover {
  color: #dc2626;
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

@keyframes fadeInBg {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(220,38,38,0.5); }
  70% { box-shadow: 0 0 0 10px rgba(220,38,38,0); }
  100% { box-shadow: 0 0 0 0 rgba(220,38,38,0); }
}
</style>
