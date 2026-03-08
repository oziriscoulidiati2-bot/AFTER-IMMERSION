// /assets/js/state.js

export const state = {
  user: null,
  token: null
};

export function setUser(user, token) {
  state.user = user;
  state.token = token;
  localStorage.setItem("token", token);
}

export function logout() {
  state.user = null;
  state.token = null;
  localStorage.removeItem("token");
}