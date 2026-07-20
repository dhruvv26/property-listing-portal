import api from "./api";

export const createProperty = (data: any) => {
  return api.post("/property", data);
};

export const getMyProperties = () => {
  return api.get("/property/my");
};

export const getPropertyById = (id: string) => {
  return api.get(`/property/${id}`);
};

export const updateProperty = (
  id: string,
  data: any
) => {
  return api.put(`/property/${id}`, data);
};

export const deleteProperty = (id: string) => {
  return api.delete(`/property/${id}`);
};

export const uploadImages = (
  id: string,
  data: FormData
) => {
  return api.post(`/property/${id}/images`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getPublicProperties = (params: any) => {
  return api.get("/property/public", {
    params,
  });
};

export const getPublicProperty = (id: string) => {
  return api.get(`/property/public/${id}`);
};