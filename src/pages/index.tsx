import CategoryMenu from "components/categoryMenu";
import Layout from "components/layout";
import CategoryList from "components/categoryList";
import Seo from "components/Seo";
import { graphql, Link, PageProps } from "gatsby";
import React from "react";

export interface mainProps {
  location: PageProps["location"];
  data: {
    allMarkdownRemark: {
      totalCount: number;
      edges: [{ node: { frontmatter: { categories: [string]; date: Date; slug: string; title: string } } }];
      group: [{ totalCount: number; fieldValue: string }];
    };
  };
}

export default function IndexPage({ location, data }: mainProps) {
  const { search } = location;
  const [_, query] = search.split("=");
  const selectedCategory = query === undefined ? "all" : query;

  return (
    <Layout location={location.pathname}>
      <menu className="bg-[#F3F3F3] p-5 sm:px-5 sm:py-3">
        <CategoryMenu data={data} location={location} />
      </menu>
      <CategoryList data={data} selectedCategory={selectedCategory} />
    </Layout>
  );
}

export const query = graphql`
  query CategoryList {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          frontmatter {
            title
            slug
            date(formatString: "YYYY.MM.DD")
            categories
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
