import React, { ReactNode, useEffect, useState } from "react";
import Nav from "components/nav";
import { Helmet } from "react-helmet";
import { useSiteMetadata } from "hooks/use-site-metadata";
interface LayoutProps {
  children: ReactNode;
  location?: string;
}
export default function Layout({ children, location }: LayoutProps) {
  const {
    title: siteTitle,
    siteUrl,
    description,
    file: { publicURL },
  } = useSiteMetadata();
  return (
    <main>
      <Helmet>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={publicURL} />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content={siteTitle} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@author_handle" />
        <meta name="twitter:title" content={siteUrl} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:creator" content="@author_handle" />
        <meta name="twitter:image" content={publicURL} />
        <html lang="ko" />
      </Helmet>
      <Nav location={location} />
      {children}
    </main>
  );
}
