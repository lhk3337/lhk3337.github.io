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
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          // width="30"
          // height="30"
          className="h-6 w-6 md:h-8 md:w-8 "
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
        </svg>
      </button>
    </main>
  );
}
