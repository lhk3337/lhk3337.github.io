import { Link } from "gatsby";
import { cls } from "libs/cls";
import { mainProps } from "pages/index";
import React, { useEffect, useRef, useState } from "react";
import { JsIcons, NextJsIcon, ReactIcon, TailwinIcon, TsIcon, WebIcon } from "./categoryIcon";

interface Values {
  Javascript: React.JSX.Element;
  React: React.JSX.Element;
  Typescript: React.JSX.Element;
  Nextjs: React.JSX.Element;
  Tailwind: React.JSX.Element;
  Web: React.JSX.Element;
  totalCount: number;
  fieldValue: string;
}

export default function CategoryMenu({ data, location }: mainProps) {
  const { search } = location;
  const [_, query] = search.split("=");

  const scrollRef = useRef<HTMLUListElement>(null);
  const [scrollX, setScrollX] = useState(0);

  const slide = (shift: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += shift;
    }
    setScrollX(scrollX + shift);
  };
  const categoriesData = {
    ...data.allMarkdownRemark,
    group: data.allMarkdownRemark.group.map((categoryItem) => {
      return {
        ...categoryItem,
        Javascript: <JsIcons />,
        React: <ReactIcon />,
        Typescript: <TsIcon />,
        Nextjs: <NextJsIcon />,
        Tailwind: <TailwinIcon />,
        Web: <WebIcon />,
      };
    }),
  };

  return (
    <menu className="flex items-center rounded-md bg-[#F3F3F3] pt-1 dark:bg-[#161b22] sm:px-3">
      <button className="px-1 sm:px-0" onClick={() => slide(-150)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <ul
        ref={scrollRef}
        className="scroll flex h-full w-full space-x-8 overflow-x-scroll scroll-smooth whitespace-nowrap scrollbar-hide"
      >
        <li>
          <Link to={`?category=all`} className="flex cursor-pointer flex-col items-center p-2">
            <div
              className={cls(
                "mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-white font-bold dark:bg-slate-700 sm:h-20 sm:w-20",
                query === undefined || query === "all" ? "border-2 border-[#2E8EFF]" : ""
              )}
            >
              <span className=" text-base sm:text-xl">All</span>
            </div>
            <span className={cls("text-sm sm:text-base", query === undefined || query === "all" ? "font-bold" : "")}>
              All ({data.allMarkdownRemark.totalCount})
            </span>
          </Link>
        </li>
        {categoriesData.group.map((category: Values, i) => {
          const { fieldValue } = category;
          return (
            <li key={i}>
              <Link
                to={`?category=${category.fieldValue.toLowerCase()}`}
                className="flex cursor-pointer flex-col items-center p-2"
              >
                <div
                  className={cls(
                    "mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-white dark:bg-slate-700 sm:h-20 sm:w-20",
                    query === category.fieldValue.toLowerCase() ? "border-2 border-[#2E8EFF]" : ""
                  )}
                >
                  {category[fieldValue as keyof Values]}
                </div>
                <span
                  className={cls(
                    "text-sm sm:text-base",
                    query === category.fieldValue.toLowerCase() ? "font-bold" : ""
                  )}
                >
                  {category.fieldValue} ({category.totalCount})
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      <button className="px-1 sm:px-0" onClick={() => slide(150)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </menu>
  );
}
