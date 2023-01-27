import React, { ReactNode } from "react";
import Nav from "components/nav";
interface LayoutProps {
  children: ReactNode;
  title: string;
}
export default function Layout({ children, title }: LayoutProps) {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <title>{title}</title>
      <Nav />
      <div>{children}</div>
    </div>
  );
}
