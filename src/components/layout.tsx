import React, { ReactNode, useEffect, useState } from "react";
import Nav from "components/nav";
import { cls } from "libs/cls";
import useTheme from "hooks/useTheme";
interface LayoutProps {
  children: ReactNode;
  location?: string;
}
export default function Layout({ children, location }: LayoutProps) {
  const [theme, themeToggler] = useTheme();
  return (
    <div className={cls(theme === "dark" ? "dark" : "")}>
      <div className="dark:bg-slate-700">
        <Nav location={location} setThemeIsDark={themeToggler} themeIsDark={theme} />
        <div className="mx-auto mt-20 w-full max-w-5xl px-6 dark:bg-slate-700 sm:px-14">{children}</div>
      </div>
    </div>
  );
}
