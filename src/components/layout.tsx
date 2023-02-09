import React, { ReactNode, useEffect, useState } from "react";
import Nav from "components/nav";
interface LayoutProps {
  children: ReactNode;
  location?: string;
}
export default function Layout({ children, location }: LayoutProps) {
  return (
    <main>
      <Nav location={location} />
      {children}
    </main>
  );
}
