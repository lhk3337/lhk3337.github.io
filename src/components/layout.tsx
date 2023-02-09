import React, { ReactNode, useEffect, useState } from "react";
import Nav from "components/nav";
import { Helmet } from "react-helmet";
import { useSiteMetadata } from "hooks/use-site-metadata";
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
