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

type Props = {
  data: {
    allFile: {
      edges: {
        node: {
          name: string;
          childImageSharp: ImageDataLike;
        };
      }[];
    };
  };
};

// markup
const IndexPage: React.VFC<Props> = ({ data }) => {
  return (
    <BaseLayout>
      <Main>
        {data.allFile.edges.map(({ node }) => {
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

export default IndexPage;
