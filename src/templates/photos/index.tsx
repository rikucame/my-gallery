import { graphql } from "gatsby";
import { ImageDataLike } from "gatsby-plugin-image";
import * as React from "react";
import { BaseLayout } from "../../components/Layout/BaseLayout";
import { SeoProps } from "../../components/modules/Head";
import { Photos } from "../../components/Templates/Photos";
import { useLocation } from "@reach/router";

export type PhotosType = {
  node: {
    name: string;
    childImageSharp: ImageDataLike;
  };
}[];

type PageProps = {
  data: {
    allFile: {
      edges: PhotosType;
    };
  };
};

const PhotosPage: React.VFC<PageProps> = ({ data }) => {
  const location = useLocation();
  const seo: SeoProps = {
    title: location.pathname.split("_").slice(-1)[0],
    absolutePath: location.pathname,
  };
  return (
    <BaseLayout seo={seo}>
      <Photos photos={data.allFile.edges} />
    </BaseLayout>
  );
};

export const pageQuery = graphql`
  query ($dirPath: String!) {
    allFile(
      filter: { dir: { eq: $dirPath } }
      sort: { fields: name, order: ASC }
    ) {
      edges {
        node {
          name
          childImageSharp {
            gatsbyImageData(blurredOptions: { width: 100 }, width: 600)
          }
        }
      }
    }
  }
`;

export default PhotosPage;
