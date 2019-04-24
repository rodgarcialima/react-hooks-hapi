import { loadAuthFromLocalStorage, clearStorage } from "helpers/storage";
import { tokenExpired } from "helpers/token";

let auth = loadAuthFromLocalStorage();
if (!auth || !auth.token || !auth.user || tokenExpired(auth.token)) {
  clearStorage();
  auth = {
    token: undefined,
    user: undefined
  };
}

export default auth;
