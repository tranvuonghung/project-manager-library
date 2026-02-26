<template>
    <header class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <!-- Logo -->
            <a class="navbar-brand d-flex align-items-center" href="#">
                <img src="../../../assets/images/99-hinh-anh-hacker-cuc-chat-ngau-dep-nhat-e1669974791786.jpg" alt="Logo" class="me-2" />
                <span>Admin Panel</span>
            </a>

            <!-- Toggler for mobile -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!-- Navbar content -->
            <div class="collapse navbar-collapse  " id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            <i class="fa-solid fa-right-from-bracket"></i> 
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: "TopAdmin",
};
</script>

<style scoped>
.navbar-brand img {
    height: 40px;
}

.navbar-brand span {
    font-weight: bold;
    font-size: 24px;
    color: rgb(255, 255, 255);
}
.navbar-brand:hover span {
    color: #e5090d;
    transform: translateY(-2px);
    text-shadow: 0 0 8px #ac1717;
}

a {
    position: relative;
    text-decoration: none;
    color: rgb(214, 12, 204);
}

a::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    height: 2px;
    background-color: #00bbff;
    transition: width 0.3s ease;
}

a:hover::after {
    width: 100%;
}



.nav-link {
    font-weight: 500;
    color: rgb(255, 253, 253);
    font-weight: bold;
    font-size: 20px;

}
.nav-link:hover {
    color: #e5090d;
    transform: translateY(-2px);
    text-shadow: 0 0 8px #ac1717;
}
</style>
