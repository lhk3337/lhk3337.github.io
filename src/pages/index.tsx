import CategoryMenu from "components/categories/categoryMenu";
import Layout from "components/layout";
import CategoryList from "components/categories/categoryList";
import Seo from "components/Seo";
import { graphql, Link, PageProps } from "gatsby";
import React from "react";
import { IGatsbyImageData } from "gatsby-plugin-image";
import AdComponent from "components/adsense";

export interface mainProps {
  location: PageProps["location"];
  data: {
    allMarkdownRemark: {
      totalCount: number;
      edges: [
        {
          node: {
            frontmatter: {
              categories: [string];
              date: string;
              slug: string;
              title: string;
              desc: string;
              thumbnail: {
                childImageSharp: {
                  gatsbyImageData: IGatsbyImageData;
                };
              };
            };
          };
        }
      ];
      group: [{ totalCount: number; fieldValue: string }];
    };
  };
}

export default function IndexPage({ location, data }: mainProps) {
  const { search } = location;
  const [params, value] = search.split("=");
  const selectedCategory = params !== "?category" ? "all" : value;

  return (
    <Layout location={location.pathname}>
      <div className="mx-auto mt-16 px-6 sm:px-14 md:max-w-5xl lg:max-w-7xl">
        <h1 className="mb-5 text-2xl font-bold">Category</h1>
        <CategoryMenu data={data} location={location} />
        <AdComponent />
        <CategoryList data={data} selectedCategory={selectedCategory} />
      </div>
    </Layout>
  );
}

export const query = graphql`
  query CategoryList {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      edges {
        node {
          frontmatter {
            title
            slug
            date(formatString: "YYYY.MM.DD")
            categories
            desc
            thumbnail {
              childImageSharp {
                gatsbyImageData(quality: 100, height: 700)
              }
            }
          }
        }
      }
      group(field: { frontmatter: { categories: SELECT } }) {
        totalCount
        fieldValue
      }
      totalCount
    }
  }
`;

export const Head = () => <Seo title="Blog" />;
