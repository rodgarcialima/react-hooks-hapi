import jwt from "jsonwebtoken";

export const tokenExpired = token => {
  const exp = decodeToken(token).exp;
  if (exp) return dateExpired(exp);
  return true;
};

export const decodeToken = token => {
  try {
    return jwt.decode(token);
  } catch (err) {
    return null;
  }
};

export const dateExpired = exp => {
  return new Date().getTime() / 1000 >= exp;
};
