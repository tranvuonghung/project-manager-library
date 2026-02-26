import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { pinia } from "./store";
import "./styles/global.css";

import LayoutNguoiDung from "./layout/wrapper/user/LayoutNguoiDung.vue";
import LayoutAdmin from "./layout/wrapper/admin/LayoutAdmin.vue";
import LayoutBlank from "./layout/wrapper/View/blank.vue";

const app = createApp(App);

app.use(pinia);
app.use(router);

app.component("Layout-NguoiDung", LayoutNguoiDung);
app.component("Layout-Admin", LayoutAdmin);
app.component("Layout-Blank", LayoutBlank);

app.mount("#app");
