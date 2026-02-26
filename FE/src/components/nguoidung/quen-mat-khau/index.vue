<template>
    <div class="reset-page d-flex align-items-center justify-content-center">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6 col-lg-5">
  
            <div class="card reset-card shadow-lg border-0">
              <div class="card-body p-5">
  
                <!-- Icon -->
                <div class="text-center mb-4">
                  <div class="icon-wrapper">
                    <img
                      src="https://img.freepik.com/vector-cao-cap/hinh-anh-minh-hoa-mot-o-khoa-da-mo_180401-4628.jpg"
                      width="100"
                      alt=""
                    />
                  </div>
                </div>
  
                <!-- Title -->
                <div class="text-center mb-4">
                  <h3 class="fw-bold">Quên Mật Khẩu?</h3>
                  <p class="text-muted mb-0">
                    Nhập email của bạn để nhận liên kết đặt lại mật khẩu
                  </p>
                </div>
  
                <!-- Input -->
                <div class="mb-4">
                  <input
                    type="email"
                    class="form-control custom-input"
                    placeholder="Nhập email của bạn"
                  />
                </div>
  
                <!-- Buttons -->
                <div class="d-grid gap-3">
                  <router-link to="/doi-mat-khau">
                    <button type="button" class="btn btn-warning btn-lg w-100">
                      GỬI YÊU CẦU
                    </button>
                  </router-link>
  
                  <router-link to="/login" class="btn btn-outline-secondary w-100">
                    ← Quay lại đăng nhập
                  </router-link>
                </div>
  
              </div>
            </div>
  
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {}
  </script>
  
  <style scoped>
  .reset-page {
    min-height: 100vh;
    background: linear-gradient(135deg, #1e3a8a, #0f172a);
    padding: 40px 15px;
  }
  
  .reset-card {
    border-radius: 18px;
    background: #ffffff;
    transition: 0.3s;
  }
  
  .reset-card:hover {
    transform: translateY(-5px);
  }
  
  .icon-wrapper {
    background: #fef3c7;
    width: 120px;
    height: 120px;
    margin: auto;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .custom-input {
    height: 50px;
    border-radius: 10px;
    font-size: 15px;
  }
  
  .custom-input:focus {
    border-color: #f59e0b;
    box-shadow: 0 0 0 0.2rem rgba(245, 158, 11, 0.25);
  }
  
  .btn-warning {
    background-color: #f59e0b;
    border: none;
    border-radius: 10px;
    transition: 0.3s;
  }
  
  .btn-warning:hover {
    background-color: #d97706;
  }
  
  .btn-outline-secondary {
    border-radius: 10px;
  }
  </style>
