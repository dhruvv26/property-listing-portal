export const isLoggedIn = () => {
  if (typeof window === "undefined") return false;

  return !!localStorage.getItem("token");
};

export const getUser = () => {
  if (typeof window === "undefined") return null;

  const user = localStorage.getItem("user");

  return user ? JSON.parse(user) : null;
};

export const logoutUser = () => {
  localStorage.clear();
};