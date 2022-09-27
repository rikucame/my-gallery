import { graphql } from "gatsby";
import { GatsbyImage, getImage, ImageDataLike } from "gatsby-plugin-image";
import * as React from "react";
import styled from "styled-components";
import { BaseLayout } from "../../components/Layout/BaseLayout";
import { Photograph } from "../../components/parts/Photograph";

const Main = styled.main`
  width: 88%;
  margin: 15px 6%;
`;

const PhotographWrap = styled.div``;

type Photos = {
  node: {
    name: string;
    childImageSharp: ImageDataLike;
  };
}[];

type PageProps = {
  data: {
    allFile: {
      edges: Photos;
    };
  };
};

const Photos = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 30px;
`;

const PageContent: React.VFC<{ photos: Photos }> = ({ photos }) => {
  return (
    <Main>
      <Photos>
        {photos.map(({ node }) => {
          return (
            <PhotographWrap>
              <GatsbyImage
                image={getImage(node.childImageSharp)!}
                alt={node.name}
              />
            </PhotographWrap>
          );
        })}
      </Photos>
    </Main>
  );
};

const PhotosPage: React.VFC<PageProps> = ({ data }) => {
  return (
    <BaseLayout>
      <PageContent photos={data.allFile.edges} />
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
