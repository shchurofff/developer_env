export const parseFormData = (formData: FormData) => {
  return {
    name: formData.get("name"),
    description: formData.get("description"),
    startDay: formData.get("startDay"),
    endDay: formData.get("endDay"),
    status: formData.get("status"),
    stack: formData.getAll("stack"),
    favicon: formData.get("favicon"),
  };
};
