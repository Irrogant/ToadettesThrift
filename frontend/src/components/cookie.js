
export const getCookie = (name) => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(name + "=")) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

export const setCookie = (name, value, options = {}) => {
  let cookieString = `${name}=${encodeURIComponent(value)}; path=/`;

  // Set expiry date if provided
  if (options.expires) {
    const expiresDate = new Date();
    expiresDate.setTime(expiresDate.getTime() + options.expires * 24 * 60 * 60 * 1000); // Convert days to milliseconds
    cookieString += `; expires=${expiresDate.toUTCString()}`;
  }

  // Set Secure flag for HTTPS connections (optional)
  if (options.secure) {
    cookieString += "; Secure";
  }

  // Set SameSite attribute (optional)
  if (options.sameSite) {
    cookieString += `; SameSite=${options.sameSite}`;
  }

  document.cookie = cookieString;
};