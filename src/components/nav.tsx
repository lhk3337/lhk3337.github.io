import { Link, useStaticQuery } from "gatsby";
import { graphql } from "gatsby";

import React, { useEffect, useRef, useState } from "react";
import { cls } from "libs/cls";
import useInnerWidth from "hooks/useInnerWidth";
import { GatsbyImage } from "gatsby-plugin-image";

interface Props {
  location?: string;
  themeIsDark: any;
  setThemeIsDark: any;
}
// 640px < window.innerWidth
export default function Nav({ location, setThemeIsDark, themeIsDark }: Props) {
  const [isMenu, setIsMenu] = useState(false); // side menu button handler
  const [preventScroll, setPreventScroll] = useState(false); // active sm nav menu scroll prevent

  const data = useStaticQuery<Queries.BlogTitleQuery>(graphql`
    query BlogTitle {
      site {
        siteMetadata {
          title
          siteUrl
          description
        }
      }
      file(name: { eq: "logos" }) {
        childImageSharp {
          gatsbyImageData(width: 50, height: 50)
        }
        publicURL
      }
    }
  `);

  useInnerWidth(() => setIsMenu(false));
  useInnerWidth(() => setPreventScroll(false));

  useEffect(() => {
    if (preventScroll) {
      document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
      return () => {
        const scrollY = document.body.style.top;
        document.body.style.cssText = "";
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      };
    }
  }, [preventScroll]);

  const onClickNav = () => {
    setIsMenu((prev) => !prev);
    setPreventScroll((prev) => !prev);
  };
  console.log(themeIsDark);
  return (
    <>
      <nav className="sticky top-0 z-50 flex h-[60px] w-full items-center justify-between bg-[rgba(255,255,255,0.75)] px-6 py-10 opacity-100 shadow-navShadow backdrop-blur-sm dark:bg-slate-700 dark:text-white md:px-6 lg:px-24">
        <Link to="/" className="flex items-center space-x-10">
          <GatsbyImage image={data.file?.childImageSharp?.gatsbyImageData!} alt="logos" className="rounded-full" />
          <h1 className="text-2xl font-bold">{data.site?.siteMetadata?.title}</h1>
        </Link>
        {/* sm screen menu buttons */}
        <div className="flex space-x-6">
          <button className="block sm:hidden" onClick={setThemeIsDark}>
            {themeIsDark === "dark" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                />
              </svg>
            )}
          </button>
          <button className="sm:hidden" onClick={onClickNav}>
            {isMenu ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-8 w-8"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-8 w-8"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
        {/* large screen menu buttons */}
        <div
          className={cls(
            isMenu
              ? "absolute top-24 left-1/2 w-[92%] -translate-x-1/2 space-y-5 rounded-xl bg-gray-50 p-5 text-xl dark:bg-slate-900"
              : "hidden",
            "sm:flex sm:w-auto sm:items-center sm:justify-between  sm:space-x-5 md:space-x-14 lg:space-x-20"
          )}
        >
          <ul className={cls(isMenu ? "space-y-6" : "flex space-x-7 text-xl md:space-x-20 lg:space-x-32")}>
            <li
              className={cls(
                location === "/" || location?.substring(0, 6) === "/blog/"
                  ? "rounded-none border-b-4 border-b-black font-bold dark:border-b-white"
                  : "",
                isMenu ? "rounded-lg border-none py-3 px-5 hover:bg-gray-100" : ""
              )}
            >
              <Link to="/">BLOG</Link>
            </li>
            <li
              className={cls(
                location === "/about/" ? "border-b-4 border-b-black font-bold dark:border-b-white" : "",
                isMenu ? "rounded-lg border-none py-3 px-5 hover:bg-gray-100" : ""
              )}
            >
              <Link to="/about" className=" dark:text-zinc-100">
                ABOUT
              </Link>
            </li>
          </ul>

          <ul
            className={cls(
              isMenu ? "flex justify-between px-10" : "flex space-x-5 border-l-2 border-black pl-5 dark:border-white"
            )}
          >
            <li className="hidden cursor-pointer sm:block" onClick={setThemeIsDark}>
              {themeIsDark === "dark" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  />
                </svg>
              )}
            </li>
            <li>
              <a href="https://github.com/lhk3337">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={isMenu ? "30" : "24"}
                  height={isMenu ? "30" : "24"}
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                </svg>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/holim/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={isMenu ? "30" : "24"}
                  height={isMenu ? "30" : "24"}
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                </svg>
              </a>
            </li>
            <li>
              <a href="mailto:lhk3337@gmail.com">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={isMenu ? "30" : "24"}
                  height={isMenu ? "30" : "24"}
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
