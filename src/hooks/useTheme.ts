import { useState, useCallback, useEffect } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState("");

  const themeToggler = useCallback(() => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    window.__setPreferredTheme(nextTheme);
  }, [theme]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTheme(window.__theme);
    }

    window.__onThemeChange = (newTheme: string) => {
      setTheme(newTheme);
    };
  }, []);

  return [theme, themeToggler];
};

export default useTheme;

// window 설정한 부분은 gatsby-ssr.ts에 있음
