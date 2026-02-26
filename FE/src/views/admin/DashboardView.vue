<template>
  <div class="page-container app-shell admin-dashboard">
    <BaseToast :visible="toast.isVisible.value" :message="toast.message.value" :type="toast.type.value" />

    <section class="app-header card dashboard-header">
      <div class="app-header__content">
        <span class="app-kicker">Admin Workspace</span>
        <h1>Admin Book Management</h1>
        <p class="app-subtitle">Frontend-only CRUD with mock data. Backend-ready structure.</p>
      </div>

      <div class="app-toolbar dashboard-toolbar">
        <BaseInput v-model="query" placeholder="Search by title or author" />
        <ActionButton @click="openCreateModal">Add Book</ActionButton>
      </div>
    </section>

    <section class="metrics-grid">
      <article class="metric-card metric-card--primary card">
        <span class="metric-label">Total Books</span>
        <strong class="metric-value">{{ booksStore.totalBooks }}</strong>
        <span class="metric-note">Current catalog size</span>
      </article>
      <article class="metric-card metric-card--success card">
        <span class="metric-label">Available</span>
        <strong class="metric-value">{{ availableBooks }}</strong>
        <span class="metric-note">Ready to borrow</span>
      </article>
      <article class="metric-card metric-card--warning card">
        <span class="metric-label">Unavailable</span>
        <strong class="metric-value">{{ unavailableBooks }}</strong>
        <span class="metric-note">Need restock</span>
      </article>
    </section>

    <div v-if="booksStore.error" class="error-state">
      {{ booksStore.error }}
    </div>

    <DataTable
      :columns="columns"
      :rows="filteredBooks"
      :loading="booksStore.loading"
      empty-text="No books found. Add a new book to start managing library inventory."
    >
      <template #cell-status="{ row }">
        <StatusBadge :status="row.status" />
      </template>

      <template #cell-actions="{ row }">
        <div class="table-actions">
          <ActionButton variant="ghost" size="sm" @click="openEditModal(row)">Edit</ActionButton>
          <ActionButton variant="danger" size="sm" @click="openDeleteModal(row)">Delete</ActionButton>
        </div>
      </template>
    </DataTable>

    <BaseModal
      v-model="showFormModal"
      :title="isEditing ? 'Update Book' : 'Create Book'"
      :confirm-text="isEditing ? 'Save Changes' : 'Create'"
      :loading="saving"
      @confirm="submitForm"
    >
      <div class="form-grid">
        <BaseInput v-model="form.title" label="Title" placeholder="Book title" />
        <BaseInput v-model="form.author" label="Author" placeholder="Author name" />
        <BaseInput v-model="form.category" label="Category" placeholder="Category" />
        <BaseInput v-model="form.quantity" label="Quantity" type="number" placeholder="0" />
      </div>
    </BaseModal>

    <BaseModal
      v-model="showDeleteModal"
      title="Delete Book"
      confirm-text="Delete"
      confirm-variant="danger"
      :loading="deleting"
      @confirm="confirmDelete"
    >
      <p>
        Are you sure you want to delete
        <strong>{{ selectedBook?.title }}</strong>
        ?
      </p>
    </BaseModal>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import BaseInput from "../../components/base/BaseInput.vue";
import BaseModal from "../../components/base/BaseModal.vue";
import BaseToast from "../../components/base/BaseToast.vue";
import ActionButton from "../../components/common/ActionButton.vue";
import DataTable from "../../components/common/DataTable.vue";
import StatusBadge from "../../components/common/StatusBadge.vue";
import { useToast } from "../../composables/useToast";
import { useBooksStore } from "../../store/books.store";

const booksStore = useBooksStore();
const toast = useToast();

const query = ref("");
const showFormModal = ref(false);
const showDeleteModal = ref(false);
const saving = ref(false);
const deleting = ref(false);
const selectedBook = ref(null);

const form = reactive({
  id: null,
  title: "",
  author: "",
  category: "",
  quantity: 1,
});

const columns = [
  { key: "id", label: "ID", width: "70px" },
  { key: "title", label: "Title" },
  { key: "author", label: "Author" },
  { key: "category", label: "Category", width: "180px" },
  { key: "quantity", label: "Quantity", width: "110px", align: "center" },
  { key: "status", label: "Status", width: "120px", align: "center" },
  { key: "actions", label: "Actions", width: "220px", align: "right" },
];

const isEditing = computed(() => Boolean(form.id));
const availableBooks = computed(
  () => booksStore.books.filter((book) => book.status === "available").length
);
const unavailableBooks = computed(
  () => booksStore.books.filter((book) => book.status === "unavailable").length
);

const filteredBooks = computed(() => {
  if (!query.value.trim()) {
    return booksStore.books;
  }

  const normalized = query.value.trim().toLowerCase();
  return booksStore.books.filter(
    (book) =>
      book.title.toLowerCase().includes(normalized) ||
      book.author.toLowerCase().includes(normalized) ||
      book.category.toLowerCase().includes(normalized)
  );
});

const resetForm = () => {
  form.id = null;
  form.title = "";
  form.author = "";
  form.category = "";
  form.quantity = 1;
};

const openCreateModal = () => {
  resetForm();
  showFormModal.value = true;
};

const openEditModal = (book) => {
  form.id = book.id;
  form.title = book.title;
  form.author = book.author;
  form.category = book.category;
  form.quantity = book.quantity;
  showFormModal.value = true;
};

const openDeleteModal = (book) => {
  selectedBook.value = book;
  showDeleteModal.value = true;
};

const submitForm = async () => {
  if (!form.title.trim() || !form.author.trim() || !form.category.trim()) {
    toast.showError("Please fill all required fields");
    return;
  }

  saving.value = true;
  try {
    const payload = {
      title: form.title,
      author: form.author,
      category: form.category,
      quantity: Number(form.quantity) || 0,
    };

    if (isEditing.value) {
      await booksStore.updateBook(form.id, payload);
      toast.showSuccess("Book updated successfully");
    } else {
      await booksStore.addBook(payload);
      toast.showSuccess("Book created successfully");
    }

    showFormModal.value = false;
    resetForm();
  } catch (error) {
    toast.showError(error?.message || "Failed to save book");
  } finally {
    saving.value = false;
  }
};

const confirmDelete = async () => {
  if (!selectedBook.value) {
    return;
  }

  deleting.value = true;
  try {
    await booksStore.deleteBook(selectedBook.value.id);
    toast.showSuccess("Book deleted successfully");
    showDeleteModal.value = false;
    selectedBook.value = null;
  } catch (error) {
    toast.showError(error?.message || "Failed to delete book");
  } finally {
    deleting.value = false;
  }
};

onMounted(async () => {
  await booksStore.fetchBooks();
});
</script>

<style scoped>
.dashboard-header {
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, #ffffff, #f9fbff);
}

.dashboard-header::after {
  content: "";
  position: absolute;
  right: -45px;
  top: -45px;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(147, 197, 253, 0.32), transparent 70%);
  pointer-events: none;
}

.dashboard-toolbar :deep(.base-input-wrap) {
  min-width: 320px;
}

.metric-card--primary::before {
  background: linear-gradient(90deg, #93c5fd, #3b82f6);
}

.metric-card--success::before {
  background: linear-gradient(90deg, #86efac, #22c55e);
}

.metric-card--warning::before {
  background: linear-gradient(90deg, #fcd34d, #f59e0b);
}

@media (max-width: 900px) {
  .dashboard-toolbar :deep(.base-input-wrap) {
    min-width: 0;
  }
}
</style>
