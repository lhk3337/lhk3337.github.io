import * as React from "react";
import { graphql } from "gatsby";
const linkStyle = {
  padding: "5rem 10rem",
};
export default function BlogPostTemplate({
  data, // this prop will be injected by the GraphQL query below.
}: any) {
  console.log(data);
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;
  return (
    <div>
      <div style={linkStyle}>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}

export const pageQuery = graphql`
  query ($id: String!) {
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
