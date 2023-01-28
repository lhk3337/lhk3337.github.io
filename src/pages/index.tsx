import Layout from "components/layout";
import Seo from "components/Seo";
import React from "react";
export default function IndexPage({ location }: any) {
  return (
    <Layout location={location.pathname}>
      <div>Blog main</div>
    </Layout>
  );
}

export const Head = () => <Seo title="Blog" />;
