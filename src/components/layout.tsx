import React, { ReactNode, useEffect, useState } from "react";
import Nav from "components/nav";
import { cls } from "libs/cls";
interface LayoutProps {
  children: ReactNode;
  location?: string;
}
export default function Layout({ children, location }: LayoutProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      if (scrollPosition > 0 && !isVisible) {
        setIsVisible(true);
      } else if (scrollPosition === 0 && isVisible) {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isVisible]);

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
        className={cls(
          isVisible ? "opacity-100" : "opacity-0",
          "fixed bottom-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F3F3F3] shadow-md transition-opacity duration-300 ease-in-out dark:text-black md:bottom-12 md:right-12 md:h-12 md:w-12 md:text-2xl"
        )}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
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

// isVisible ? "block" : "hidden";
