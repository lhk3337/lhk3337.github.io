import React, { ReactNode, useEffect, useState } from "react";
import Nav from "components/nav";
interface LayoutProps {
  children: ReactNode;
  location?: string;
}
export default function Layout({ children, location }: LayoutProps) {
  return (
    <div>
      <div>
        <Nav location={location} />
        <div>{children}</div>
      </div>
    </div>
  );
}
