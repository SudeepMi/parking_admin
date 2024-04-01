import axios from "axios";

const publicApi = axios.create({
  baseURL: "http://localhost:4000",
});

const privateApi = axios.create({
  baseURL: "http://localhost:4000",
});

privateApi.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

privateApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 403) {
      console.log("request come here");
      // Handle the 403 error here (e.g., refresh access token)
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        // Handle the case where there is no refresh token available
        return Promise.reject(new Error("No refresh token found."));
      }

      try {
        const newAccessToken = await refreshAccessToken(refreshToken);

        // Retry the original request with the new access token
        const originalRequest = error.config;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return privateApi(originalRequest);
      } catch (refreshError) {
        // Handle errors that occur during the access token refresh process
        return Promise.reject(refreshError);
      }
    }
    // If the error is not a 403 status, just re-throw it
    return Promise.reject(error);
  }
);

// Function to refresh the access token
const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await publicApi.post("/auth/refresh", { refreshToken });
    const newAccessToken = response.data.accessToken;
    localStorage.setItem("accessToken", newAccessToken);
    return newAccessToken;
  } catch (error) {
    return Promise.reject(error);
  }
};

export { publicApi, privateApi };
