import Layout from "components/layout";
import Seo from "components/Seo";
import React from "react";
export default function About({ location }: any) {
  return (
    <Layout location={location.pathname}>
      <div>About me</div>
    </Layout>
  );
}

export const Head = () => <Seo title="ABOUT" />;
