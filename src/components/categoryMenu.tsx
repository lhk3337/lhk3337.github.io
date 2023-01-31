import { Link } from "gatsby";
import { cls } from "libs/cls";
import { mainProps } from "pages/index";
import React from "react";
import { JsIcons, ReactIcon, TsIcon } from "./icon";

interface Values {
  [key: string]: any;
}

export default function CategoryMenu({ data, location }: mainProps) {
  const { search } = location;
  const [_, query] = search.split("=");

  const datas = {
    ...data.allMarkdownRemark,
    group: data.allMarkdownRemark.group.map((v) => {
      return { ...v, Javascript: <JsIcons />, React: <ReactIcon />, Typescript: <TsIcon /> };
    }),
  };

  return (
    <ul className="flex justify-between sm:flex-none sm:justify-start sm:space-x-20">
      <li>
        <Link to={`?category=all`} className="flex flex-col items-center space-y-2">
          <div
            className={cls(
              "h-16 w-16 rounded-full bg-white flex items-center justify-center font-bold",
              query === undefined || query === "all" ? "border-2 border-[#2E8EFF]" : ""
            )}
          >
            <span className="text-lg">All</span>
          </div>
          <span className={cls(query === undefined || query === "all" ? "font-bold" : "")}>
            All ({data.allMarkdownRemark.totalCount})
          </span>
        </Link>
      </li>
      {datas.group.map((caterory: Values, i) => {
        return (
          <li key={i}>
            <Link
              to={`?category=${caterory.fieldValue.toLowerCase()}`}
              className="flex flex-col items-center space-y-2"
            >
              <div
                className={cls(
                  "h-16 w-16 bg-white rounded-full flex justify-center items-center",
                  query === caterory.fieldValue.toLowerCase() ? "border-2 border-[#2E8EFF]" : ""
                )}
              >
                {caterory[caterory.fieldValue]}
              </div>
              <span className={cls(query === caterory.fieldValue.toLowerCase() ? "font-bold" : "")}>
                {caterory.fieldValue} ({caterory.totalCount})
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
