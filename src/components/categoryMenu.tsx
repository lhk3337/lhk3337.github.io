import { Link } from "gatsby";
import { cls } from "libs/cls";
import { mainProps } from "pages/index";
import React, { useEffect, useRef, useState } from "react";
import { JsIcons, NextJsIcon, ReactIcon, TailwinIcon, TsIcon } from "./icon";

interface Values {
  [key: string]: any;
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
      };
    }),
  };

  return (
    <menu className="bg-[#F3F3F3] flex items-center sm:px-3 rounded-md pt-1">
      <button className="px-1 sm:px-0" onClick={() => slide(-150)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <ul
        ref={scrollRef}
        className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide flex space-x-8"
      >
        <li>
          <Link to={`?category=all`} className="p-2 cursor-pointer items-center flex-col flex">
            <div
              className={cls(
                "w-12 h-12 sm:h-20 sm:w-20 rounded-full bg-white flex items-center justify-center font-bold mb-2",
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
        {categoriesData.group.map((caterory: Values, i) => {
          return (
            <li key={i}>
              <Link
                to={`?category=${caterory.fieldValue.toLowerCase()}`}
                className="p-2 cursor-pointer items-center flex-col flex"
              >
                <div
                  className={cls(
                    "w-12 h-12 sm:h-20 sm:w-20 bg-white rounded-full flex justify-center items-center mb-2",
                    query === caterory.fieldValue.toLowerCase() ? "border-2 border-[#2E8EFF]" : ""
                  )}
                >
                  {caterory[caterory.fieldValue]}
                </div>
                <span
                  className={cls(
                    "text-sm sm:text-base",
                    query === caterory.fieldValue.toLowerCase() ? "font-bold" : ""
                  )}
                >
                  {caterory.fieldValue} ({caterory.totalCount})
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
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </menu>
  );
}
