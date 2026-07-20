import api from "./api";

export const registerUser = (data: any) => {
  return api.post("/auth/register", data);
};

export const loginUser = (data: any) => {
  return api.post("/auth/login", data);
};

export const verifyEmail = (token: string) => {
  return api.get(`/auth/verify/${token}`);
};

export const forgotPassword = (email: string) => {
  return api.post("/auth/forgot-password", {
    email,
  });
};

export const resetPassword = (
  token: string,
  password: string
) => {
  return api.post(`/auth/reset-password/${token}`, {
    password,
  });
};