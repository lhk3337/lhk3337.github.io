import { Link } from "gatsby-link";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";

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
    <div className=" mt-20 grid space-y-10 sm:grid-flow-row sm:grid-cols-2 sm:gap-8 sm:space-y-0 lg:grid-cols-3">
      {selectedCategory === "all"
        ? data.allMarkdownRemark.edges.map((value, i) => {
            const {
              title,
              date,
              slug,
              categories,
              desc,
              thumbnail: {
                childImageSharp: { gatsbyImageData },
              },
            } = value.node.frontmatter;

            return (
              <Link
                to={`/blog${slug}`}
                key={i}
                className="rounded-lg shadow-md duration-500 ease-in-out hover:scale-[1.01] hover:shadow-xl dark:bg-[#161b22]"
              >
                <GatsbyImage image={gatsbyImageData} alt="thumbnail" className="aspect-video rounded-t-lg" />
                <div className="p-5">
                  <span>{categories.join()}</span>
                  <h1 className="text-lg">{title}</h1>
                  <span>{desc}</span>
                  <div>
                    <span>{date}</span>
                  </div>
                </div>
              </Link>
            );
          })
        : data.allMarkdownRemark.edges
            .filter((value) => value.node.frontmatter.categories[0].toLowerCase() === selectedCategory)
            .map((item, i) => {
              const {
                title,
                date,
                slug,
                categories,
                desc,
                thumbnail: {
                  childImageSharp: { gatsbyImageData },
                },
              } = item.node.frontmatter;
              return (
                <Link
                  to={`/blog${slug}`}
                  key={i}
                  className="rounded-lg shadow-md duration-500 ease-in-out hover:scale-[1.01] hover:shadow-xl dark:bg-[#161b22]"
                >
                  <GatsbyImage image={gatsbyImageData} alt="thumbnail" className="aspect-video rounded-t-lg" />
                  <div className="p-5">
                    <span>{categories.join()}</span>
                    <h1 className="text-lg">{title}</h1>
                    <span>{desc}</span>
                    <div>
                      <span>{date}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
    </div>
  );
}
