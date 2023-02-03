import React, { ReactNode } from "react";
import Nav from "components/nav";
interface LayoutProps {
  children: ReactNode;
  location?: string;
}
export default function Layout({ children, location }: LayoutProps) {
  return (
    <div>
      <Nav location={location} />
      <div className="mx-auto mt-20 w-full max-w-5xl px-6 sm:px-14">{children}</div>
    </div>
  );
}
