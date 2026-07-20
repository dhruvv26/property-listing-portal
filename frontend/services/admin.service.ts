import api from "./api";

export const getDashboard = () => {
  return api.get("/admin/dashboard");
};

export const getUsers = () => {
  return api.get("/admin/users");
};

export const getProperties = (status = "ALL") => {
  if (status === "ALL") {
    return api.get("/admin/properties");
  }

  return api.get(`/admin/properties?status=${status}`);
};

export const approveProperty = (id: string) => {
  return api.put(`/admin/approve/${id}`);
};

export const rejectProperty = (
  id: string,
  reason: string
) => {
  return api.put(`/admin/reject/${id}`, {
    reason,
  });
};