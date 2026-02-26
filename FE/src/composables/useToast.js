import { ref } from "vue";

export const useToast = () => {
  const isVisible = ref(false);
  const message = ref("");
  const type = ref("success");
  let timer = null;

  const show = (nextMessage, nextType = "success", duration = 2000) => {
    message.value = nextMessage;
    type.value = nextType;
    isVisible.value = true;

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      isVisible.value = false;
    }, duration);
  };

  const hide = () => {
    isVisible.value = false;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  const showSuccess = (nextMessage, duration) => show(nextMessage, "success", duration);
  const showError = (nextMessage, duration) => show(nextMessage, "error", duration);

  return {
    isVisible,
    message,
    type,
    show,
    hide,
    showSuccess,
    showError,
  };
};
