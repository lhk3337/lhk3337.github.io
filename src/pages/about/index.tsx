import Layout from "components/layout";
import Seo from "components/Seo";
import { graphql, PageProps } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";
interface aboutProps {
  location: PageProps["location"];
  data: {
    file: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
      };
    };
  };
}
export default function About({ location, data }: aboutProps) {
  return (
    <Layout location={location.pathname}>
      <div className="mx-auto mt-16 max-w-6xl px-6 sm:px-14">
        <div className="flex flex-col items-center justify-center space-y-10">
          <h1 className="text-2xl font-black sm:text-4xl">About</h1>
          <GatsbyImage image={data.file.childImageSharp.gatsbyImageData} alt="profile" className="rounded-full" />
        </div>
        <div></div>
      </div>
    </Layout>
  );
}

export const queary = graphql`
  query AboutData {
    file(name: { eq: "profile" }) {
      childImageSharp {
        gatsbyImageData(width: 300, height: 300)
      }
      publicURL
    }
  }
`;

export const Head = () => <Seo title="ABOUT" />;
