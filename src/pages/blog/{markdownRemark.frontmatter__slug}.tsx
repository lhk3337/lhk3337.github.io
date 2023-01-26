import * as React from "react";
import { graphql, PageProps } from "gatsby";
import Layout from "../../components/layout";
interface Props {
  data: {
    markdownRemark: {
      frontmatter: {
        title: string;
        tags: string[];
        date: string;
      };
      html: string;
    };
  };
}
export default function BlogPostTemplate({
  data, // this prop will be injected by the GraphQL query below.
}: Props) {
  // data.markdownRemark holds your post data
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  return (
    <Layout title="blog">
      <div className="px-8  my-20 ">
        <div
          className="prose max-w-none prose-code:before:content-none prose-code:after:content-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`;
