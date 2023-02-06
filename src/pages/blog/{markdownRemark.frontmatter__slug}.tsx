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
      <img
        className="mb-10 aspect-video h-[24rem] w-full"
        height={200}
        src="https://images.unsplash.com/photo-1674413146432-3e01d9868828?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80"
      />
      {/* example image */}
      <div className="mx-auto mt-20 max-w-6xl space-y-10 px-6 pb-1 sm:px-14">
        <div className="space-y-10">
          <div className="flex h-10 items-center">
            <span className="rounded-md bg-slate-100 pl-2 pr-2.5 pt-1 text-xl font-bold text-slate-700">
              {categories.join()}
            </span>
          </div>
          <h1 className="text-4xl font-bold">{title}</h1>
          <h2 className="text-lg text-gray-400">{date}</h2>
        </div>
        <div className="markdown_styles" dangerouslySetInnerHTML={{ __html: html }} />
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
