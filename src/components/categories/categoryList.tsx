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
    <div className="category_lists">
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
