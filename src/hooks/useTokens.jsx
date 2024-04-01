import { createContext, useState } from "react";

export const TokensContext = createContext();

// eslint-disable-next-line react/prop-types
export function TokensProvider({ children }) {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken"));

  const setTokens = (accessToken, refreshToken) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
  };

  const deleteTokens = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setAccessToken(null);
    setRefreshToken(null);
  };

  const value = {
    accessToken,
    refreshToken,
    setTokens,
    deleteTokens,
  };

  return <TokensContext.Provider value={value}>{children}</TokensContext.Provider>;
}
