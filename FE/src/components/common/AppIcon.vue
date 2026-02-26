<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    :stroke="stroke"
    :stroke-width="strokeWidth"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <template v-if="name === 'search'">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </template>

    <template v-else-if="name === 'moon'">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8" />
    </template>

    <template v-else-if="name === 'bell'">
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </template>

    <template v-else-if="name === 'camera'">
      <path d="M3 7h4l2-3h6l2 3h4a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" />
      <circle cx="12" cy="13" r="4" />
    </template>

    <template v-else-if="name === 'user' || name === 'profile'">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20a8 8 0 0 1 16 0" />
    </template>

    <template v-else-if="name === 'lock'">
      <rect x="4" y="10" width="16" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 1 1 8 0v3" />
    </template>

    <template v-else-if="name === 'settings'">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a1 1 0 1 1-1.4 1.4l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V19a1 1 0 1 1-2 0v-.2a1 1 0 0 0-.6-.9 1 1 0 0 0-1.1.2l-.1.1a1 1 0 1 1-1.4-1.4l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H5a1 1 0 1 1 0-2h.2a1 1 0 0 0 .9-.6 1 1 0 0 0-.2-1.1l-.1-.1a1 1 0 1 1 1.4-1.4l.1.1a1 1 0 0 0 1.1.2 1 1 0 0 0 .6-.9V5a1 1 0 1 1 2 0v.2a1 1 0 0 0 .6.9 1 1 0 0 0 1.1-.2l.1-.1a1 1 0 0 1 1.4 1.4l-.1.1a1 1 0 0 0-.2 1.1 1 1 0 0 0 .9.6H19a1 1 0 1 1 0 2h-.2a1 1 0 0 0-.9.6Z" />
    </template>

    <template v-else-if="name === 'logout'">
      <path d="M10 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
      <path d="m16 17 5-5-5-5" />
      <path d="M21 12H9" />
    </template>

    <template v-else-if="name === 'chevron-right'">
      <path d="m9 6 6 6-6 6" />
    </template>

    <template v-else-if="name === 'home'">
      <path d="m3 10 9-7 9 7" />
      <path d="M5 10v10h14V10" />
    </template>

    <template v-else-if="name === 'book'">
      <path d="M4 5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2Z" />
      <path d="M6 3v16a2 2 0 0 0 2 2" />
    </template>

    <template v-else-if="name === 'layers'">
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5" />
      <path d="m3 16 9 5 9-5" />
    </template>

    <template v-else-if="name === 'dashboard'">
      <rect x="3" y="3" width="8" height="8" rx="1" />
      <rect x="13" y="3" width="8" height="5" rx="1" />
      <rect x="13" y="10" width="8" height="11" rx="1" />
      <rect x="3" y="13" width="8" height="8" rx="1" />
    </template>

    <template v-else-if="name === 'users'">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </template>

    <template v-else-if="name === 'shield'">
      <path d="m12 3 7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3Z" />
      <path d="m9.5 12 1.8 1.8 3.2-3.2" />
    </template>

    <template v-else>
      <circle cx="12" cy="12" r="9" />
    </template>
  </svg>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    default: 20,
  },
  stroke: {
    type: String,
    default: "currentColor",
  },
  strokeWidth: {
    type: [Number, String],
    default: 2,
  },
});
</script>
