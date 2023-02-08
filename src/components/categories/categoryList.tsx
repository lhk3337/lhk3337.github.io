import { Link } from "gatsby-link";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";
import CategoryItem from "./categoryItem";

interface Props {
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
  selectedCategory: string;
}

export default function CategoryList({ data, selectedCategory }: Props) {
  return (
    <div className=" mt-20 grid space-y-10 pb-16 sm:grid-flow-row sm:grid-cols-2 sm:gap-8 sm:space-y-0 lg:grid-cols-3">
      {selectedCategory === "all"
        ? data.allMarkdownRemark.edges.map((value, i) => {
            return <CategoryItem {...value.node.frontmatter} key={i} />;
          })
        : data.allMarkdownRemark.edges
            .filter((value) => value.node.frontmatter.categories[0].toLowerCase() === selectedCategory)
            .map((item, i) => {
              return <CategoryItem {...item.node.frontmatter} key={i} />;
            })}
    </div>
  );
}
