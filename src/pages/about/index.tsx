import Layout from "components/layout";
import Seo from "components/Seo";
import { PageProps } from "gatsby";
import React from "react";
export default function About({ location }: PageProps) {
  return (
    <Layout location={location.pathname}>
      <div className="mx-auto mt-16 max-w-6xl px-6 sm:px-14">
        <h1 className="text-2xl font-black sm:text-4xl ">About</h1>
      </div>
    </Layout>
  );
}

export const Head = () => <Seo title="ABOUT" />;
