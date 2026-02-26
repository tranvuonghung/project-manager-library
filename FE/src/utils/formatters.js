export const getInitials = (name = "") => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) {
    return "?";
  }
  const first = parts[0][0] || "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return `${first}${last}`.toUpperCase();
};

export const normalizeText = (value = "") =>
  value
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim();

export const matchesQuery = (value = "", query = "") => {
  if (!query) {
    return true;
  }
  return normalizeText(value).includes(normalizeText(query));
};

export const truncateText = (value = "", max = 80) => {
  const text = value.toString();
  if (text.length <= max) {
    return text;
  }
  return `${text.slice(0, max - 1)}...`;
};
