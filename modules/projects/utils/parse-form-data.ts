export const parseFormData = (formData: FormData) => {
  return {
    name: formData.get("name"),
    description: formData.get("description"),
    startDate: formData.get("startDate"),
    status: formData.get("status"),
    stack: formData.getAll("stack"),
    favicon: formData.get("favicon"),
  };
};
