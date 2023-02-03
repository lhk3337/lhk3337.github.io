import React, { ReactNode } from "react";
import Nav from "components/nav";
interface LayoutProps {
  children: ReactNode;
  location?: string;
}
export default function Layout({ children, location }: LayoutProps) {
  return (
    <div className="px-6 sm:px-14">
      <Nav location={location} />
      <div className="mx-auto w-full max-w-5xl mt-20">{children}</div>
    </div>
  );
}
