import React, { ReactNode } from "react";
interface LayoutProps {
  children: ReactNode;
  title: string;
}
export default function Layout({ children, title }: LayoutProps) {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <title>{title}</title>
      <div>{children}</div>
    </div>
  );
}
