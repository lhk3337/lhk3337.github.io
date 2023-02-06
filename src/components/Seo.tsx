import { useSiteMetadata } from "hooks/use-site-metadata";
import React from "react";
interface Props {
  title: string;
}
export default function Seo({ title: pageTitle }: Props) {
  const { title: siteTitle } = useSiteMetadata();

  return (
    <title>
      {pageTitle} | {siteTitle}
    </title>
  );
}
