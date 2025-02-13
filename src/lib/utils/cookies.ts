export const setCookie = (name: string, value: string, expiresInDays = 7) => {
  const expires = new Date();
  expires.setDate(expires.getDate() + expiresInDays);

  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; secure; samesite=strict`;
};

export const getCookie = (name: string) => {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];
};

export const removeCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const clearAuthCookies = () => {
  removeCookie("token");
  removeCookie("userId");
};
