import * as React from "react";
import { graphql } from "gatsby";
import Layout from "components/layout";
import Seo from "components/Seo";
import Comments from "components/comments";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
interface Props {
  location: {
    pathname: string;
    desc: string;
  };
  data: {
    markdownRemark: {
      frontmatter: {
        title: string;
        tags: string[];
        date: string;
        desc: string;
        categories: string[];
        thumbnail: {
          childImageSharp: {
            gatsbyImageData: IGatsbyImageData;
          };
        };
      };
      html: string;
    };
  };
}
export default function BlogPostTemplate({
  data, // this prop will be injected by the GraphQL query below.
  location,
}: Props) {
  // data.markdownRemark holds your post data
  const {
    markdownRemark: {
      html,
      frontmatter: {
        date,
        title,
        desc,
        categories,
        thumbnail: {
          childImageSharp: { gatsbyImageData },
        },
      },
    },
  } = data;
  return (
    <Layout location={location.pathname}>
      {/* example image */}
      <GatsbyImage className="mb-10 h-[24rem] w-full" alt="" image={gatsbyImageData} />
      <div className="mx-auto mt-20 max-w-6xl space-y-10 px-6 pb-1 sm:px-14">
        <div className="space-y-10">
          <div className="flex h-10 items-center">
            <span className="rounded-md bg-slate-100 pl-2 pr-2.5 pt-1 text-xl font-bold text-slate-700">
              {categories.join()}
            </span>
          </div>
          <h1 className="text-4xl font-bold">{title}</h1>
          <h2>{desc}</h2>
          <h2 className="text-lg text-gray-400">{date}</h2>
        </div>
        <div className="markdown_styles" dangerouslySetInnerHTML={{ __html: html }} />
        <div className="border-t border-stone-200 pt-10 text-center">
          <span className="text-xl text-slate-500 dark:text-slate-300 ">
            이해한 것을 정리하다보니 <br />
            잘못된 부분이 있을 수도 있습니다. <br />
            댓글로 잘못된 부분을 알려주세요.
          </span>
        </div>
        <Comments />
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(formatString: "YYYY.MM.DD")
        slug
        title
        desc
        categories
        thumbnail {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`;
export const Head = ({ data }: Props) => {
  const {
    markdownRemark: {
      frontmatter: { title, desc },
    },
  } = data;
  return <Seo title={title} desc={desc} />;
};
