import { useStaticQuery, graphql } from "gatsby";

export const useSiteMetadata = () => {
  const { site, file } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            title
            siteUrl
            description
          }
        }
        file(name: { eq: "logos" }) {
          childImageSharp {
            gatsbyImageData(width: 50, height: 50)
          }
          publicURL
        }
      }
    `
  );

  return { ...site.siteMetadata, file };
};
