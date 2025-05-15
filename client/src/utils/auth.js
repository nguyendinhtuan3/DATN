export const storeAuthInfo = (token, user) => {
  Cookies.set("authToken", token, { expires: 7 });
  if (user) {
    Cookies.set("userInfo", JSON.stringify(user), { expires: 7 });
  }
};
