import { graphql } from "gatsby";
import { ImageDataLike } from "gatsby-plugin-image";
import * as React from "react";
import { BaseLayout } from "../../components/Layout/BaseLayout";
import { Photos } from "../../components/Templates/Photos";
import { useLocation } from "@reach/router";
import { generateSeo } from "../../components/Utils/GenerateSeo";

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
  return (
    <BaseLayout seo={generateSeo(useLocation())}>
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
            gatsbyImageData(
              blurredOptions: { width: 100 }
              width: 1000
              quality: 100
            )
          }
        }
      }
    }
  }
`;

export default PhotosPage;
