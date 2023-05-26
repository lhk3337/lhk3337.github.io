import React, { ReactNode, useEffect, useState } from "react";
import Nav from "components/nav";
interface LayoutProps {
  children: ReactNode;
  location?: string;
}
export default function Layout({ children, location }: LayoutProps) {
  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const uptoScroll = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <main>
      <Nav location={location} />
      {children}
      <button
        onClick={uptoScroll}
        className="fixed bottom-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F3F3F3] shadow-md dark:text-black md:right-8 md:bottom-8 md:h-14 md:w-14 md:text-2xl"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-10 w-10 md:h-8 md:w-8 "
        >
          <path
            fillRule="evenodd"
            d="M11.47 2.47a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06l-6.22-6.22V21a.75.75 0 01-1.5 0V4.81l-6.22 6.22a.75.75 0 11-1.06-1.06l7.5-7.5z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </main>
  );
}
