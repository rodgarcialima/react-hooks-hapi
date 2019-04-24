import produce from "immer";

// Local
import { saveAuthToLocalStorage, clearStorage } from "helpers/storage";
import { decodeToken } from "helpers/token";
import {
  ACTION_LOGIN,
  ACTION_LOGOUT,
  ACTION_REFRESH_TOKEN
} from "./actions/auth";

const emptyToken = {
  token: undefined,
  user: undefined
};

export default (prevState, action) =>
  produce(prevState, draft => {
    switch (action.type) {
      /**
       *
       */
      case ACTION_LOGIN: {
        const auth = {
          token: action.payload.token,
          user: decodeToken(action.payload.token) || emptyToken
        };
        saveAuthToLocalStorage(auth);
        draft.auth = auth; // update state
        return draft;
      }

      /**
       *
       */
      case ACTION_LOGOUT: {
        const auth = {
          token: undefined,
          user: undefined
        };
        clearStorage();
        draft.auth = auth; // update state
        return draft;
      }

      /**
       *
       */
      case ACTION_REFRESH_TOKEN: {
        const auth = {
          token: action.payload.token,
          user: decodeToken(action.payload.token) || emptyToken
        };
        saveAuthToLocalStorage(auth);
        draft.auth = auth; // update state
        return draft;
      }

      default:
        return draft;
    }
  });
