import { graphql, useStaticQuery } from "gatsby";
import React from "react";
interface Props {
  title: string;
}
export default function Seo({ title }: Props) {
  const { site } = useStaticQuery<Queries.SeoDataQuery>(graphql`
    query SeoData {
      site {
        siteMetadata {
          title
          siteUrl
          description
        }
      }
    }
  `);
  return (
    <title>
      {title} | {site?.siteMetadata?.title}
    </title>
  );
}
