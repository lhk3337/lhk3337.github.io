import CategoryMenu from "components/categoryMenu";
import Layout from "components/layout";
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
      <div className="mt-20">
        {selectedCategory === "all"
          ? data.allMarkdownRemark.edges.map((value, i) => {
              const { title, date, slug } = value.node.frontmatter;
              return (
                <Link to={`/blog${slug}`} key={i}>
                  <h1 className="text-lg">{title}</h1>
                </Link>
              );
            })
          : data.allMarkdownRemark.edges
              .filter((value) => value.node.frontmatter.categories[0].toLowerCase() === selectedCategory)
              .map((item, i) => {
                const { title, date, slug } = item.node.frontmatter;
                return (
                  <Link to={`/blog${slug}`} key={i}>
                    <h1 className="text-lg">{title}</h1>
                  </Link>
                );
              })}
      </div>
    </Layout>
  );
}

export const query = graphql`
  query CategoryList {
    allMarkdownRemark {
      totalCount
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
    }
  }
`;

export const Head = () => <Seo title="Blog" />;
