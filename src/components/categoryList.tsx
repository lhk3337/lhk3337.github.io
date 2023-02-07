import { Link } from "gatsby-link";
import React from "react";

interface Props {
  data: {
    allMarkdownRemark: {
      totalCount: number;
      edges: [{ node: { frontmatter: { categories: [string]; date: Date; slug: string; title: string } } }];
      group: [{ totalCount: number; fieldValue: string }];
    };
  };
  selectedCategory: string;
}

export default function CategoryList({ data, selectedCategory }: Props) {
  return (
    <div className="mx-auto mt-20 grid max-w-6xl space-y-10 sm:grid-flow-row sm:gap-8 sm:space-y-0 md:grid-cols-2 lg:grid-cols-3">
      {selectedCategory === "all"
        ? data.allMarkdownRemark.edges.map((value, i) => {
            const { title, date, slug } = value.node.frontmatter;
            return (
              <Link to={`/blog${slug}`} key={i} className="rounded-lg border-2 border-b-white">
                <h1 className="text-lg">{title}</h1>
              </Link>
            );
          })
        : data.allMarkdownRemark.edges
            .filter((value) => value.node.frontmatter.categories[0].toLowerCase() === selectedCategory)
            .map((item, i) => {
              const { title, date, slug } = item.node.frontmatter;
              return (
                <Link to={`/blog${slug}`} key={i} className="rounded-lg border-2 border-b-white">
                  <h1 className="text-lg">{title}</h1>
                </Link>
              );
            })}
    </div>
  );
}
