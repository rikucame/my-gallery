import { graphql } from "gatsby";
import { ImageDataLike } from "gatsby-plugin-image";
import * as React from "react";
import styled from "styled-components";
import { BaseLayout } from "../../components/Layout/BaseLayout";
import { Photograph } from "../../components/parts/Photograph";

const Main = styled.main`
  width: 88%;
  margin: 15px 6%;
`;

const PhotographWrap = styled.div`
  margin-bottom: 40px;
`;

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

const PageContent: React.VFC<{ photos: Photos }> = ({ photos }) => {
  return (
    <Main>
      {photos.map(({ node }) => {
        return (
          <PhotographWrap>
            <Photograph
              childImageSharp={node.childImageSharp!}
              name={node.name}
              key={node.name}
            />
          </PhotographWrap>
        );
      })}
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
    allFile(filter: { dir: { eq: $dirPath } }) {
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
