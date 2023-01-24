import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { cls } from "../libs/cls";
const IndexPage: React.FC<PageProps> = () => {
  return (
    <div>
      <h1 className={cls("text-3xl font-bold", true ? " underline" : "")}>Hello world!</h1>
    </div>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
