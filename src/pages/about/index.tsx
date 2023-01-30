import Layout from "components/layout";
import Seo from "components/Seo";
import { PageProps } from "gatsby";
import React from "react";
export default function About({ location }: PageProps) {
  return (
    <Layout location={location.pathname}>
      <div>About me</div>
    </Layout>
  );
}

export const Head = () => <Seo title="ABOUT" />;
