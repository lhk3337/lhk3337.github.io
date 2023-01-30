import Layout from "components/layout";
import Seo from "components/Seo";
import { graphql, Link, PageProps } from "gatsby";
import { categoryList } from "libs/category";
import React from "react";
interface mainProps {
  location: PageProps["location"];
  data: {
    allMarkdownRemark: {
      edges: [{ node: { frontmatter: { categories: [string]; date: Date; slug: string; title: string } } }];
    };
  };
}
export default function IndexPage({ location, data }: mainProps) {
  const { search } = location;
  const [_, query] = search.split("=");
  const selectedCategory = query === undefined ? "All" : query;
  // console.log(
  //   data.allMarkdownRemark.edges.filter(
  //     (value) => value.node.frontmatter.categories[0].toLowerCase() === selectedCategory
  //   )
  // );

  // console.log(data.allMarkdownRemark.edges.map((value) => value)); //All 조건

  return (
    <Layout location={location.pathname}>
      <menu className="bg-[#F3F3F3]">
        <ul>
          {categoryList.map((caterory) => (
            <li key={caterory.id}>
              <Link to={`?category=${caterory.queryUrl}`}>{caterory.name}</Link>
            </li>
          ))}
        </ul>
      </menu>
      <div className="mt-20">
        {data.allMarkdownRemark.edges
          .filter((value) => value.node.frontmatter.categories[0].toLowerCase() === selectedCategory)
          .map((item) => {
            const { title, date, slug } = item.node.frontmatter;
            return (
              <Link to={`/blog${slug}`}>
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
    }
  }
`;

export const Head = () => <Seo title="Blog" />;
