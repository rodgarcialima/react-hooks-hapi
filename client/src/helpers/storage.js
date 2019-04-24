export const saveAuthToLocalStorage = auth => {
  window.localStorage.setItem("app_auth", JSON.stringify(auth));
};

export const loadAuthFromLocalStorage = () => {
  return JSON.parse(window.localStorage.getItem("app_auth"));
};

export const clearStorage = () => {
  window.localStorage.clear();
};
