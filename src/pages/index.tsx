import * as React from "react";
import { graphql, HeadFC, PageProps, useStaticQuery } from "gatsby";
import { cls } from "../libs/cls";
import { useSiteMetadata } from "../hooks/use-site-metadata";
import Layout from "../components/layout";
const IndexPage: React.FC<PageProps> = () => {
  const { title, description } = useSiteMetadata();

  return (
    <Layout title={title}>
      <h1 className={cls("text-3xl font-bold")}>{title}</h1>
      <h2>{description}</h2>
    </Layout>
  );
};

export default IndexPage;
