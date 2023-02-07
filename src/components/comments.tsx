import React, { useEffect, useRef, useState } from "react";

export default function Comments() {
  const commentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (commentRef.current?.children.length === 0) {
      const scriptEl = document.createElement("script");
      scriptEl.setAttribute("src", "https://utteranc.es/client.js");
      scriptEl.setAttribute("crossorigin", "anonymous");
      scriptEl.setAttribute("async", "true");
      scriptEl.setAttribute("repo", "lhk3337/blog-comments");
      scriptEl.setAttribute("issue-term", "pathname");
      scriptEl.setAttribute("theme", "github-light");

      commentRef.current?.appendChild(scriptEl);
    }
  }, []);
  return <div className="py-10 dark:bg-slate-800" ref={commentRef} />;
}
