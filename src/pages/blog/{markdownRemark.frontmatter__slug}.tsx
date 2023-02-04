import * as React from "react";
import { graphql, PageProps } from "gatsby";
import Layout from "../../components/layout";
import Seo from "components/Seo";
interface Props {
  location: {
    pathname: string;
  };
  data: {
    markdownRemark: {
      frontmatter: {
        title: string;
        tags: string[];
        date: string;
        categories: string[];
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
      frontmatter: { date, title, categories },
    },
  } = data;
  return (
    <Layout location={location.pathname}>
      <div className="mt-20 space-y-10 pb-1">
        <div className="space-y-10">
          <span className="rounded-lg bg-slate-100 p-2 text-xl font-bold text-black">{categories.join()}</span>

          <h1 className="text-4xl font-bold">{title}</h1>
          <h2 className="text-lg text-gray-400">{date}</h2>
        </div>
        <div
          className="prose max-w-none prose-p:m-0 prose-figcaption:text-center prose-code:before:content-none prose-code:after:content-none prose-img:m-0"
          dangerouslySetInnerHTML={{ __html: html }}
        />
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
        categories
      }
    }
  }
`;
export const Head = ({ data }: Props) => {
  const {
    markdownRemark: {
      frontmatter: { title },
    },
  } = data;

  return <Seo title={title} />;
};
