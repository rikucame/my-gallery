import { graphql, Link } from "gatsby";
import { ImageDataLike } from "gatsby-plugin-image";
import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { InView } from "react-intersection-observer";
import styled from "styled-components";
import { BaseLayout } from "../components/Layout/BaseLayout";
import { FrameInPhotograph } from "../components/parts/FrameInPhotograph";

const Main = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ThumbnailsWrap = styled.div`
  width: 100%;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Thumbnails = styled.div<{ count: number; animate: boolean }>`
  width: ${({ count }) => 95 * count}%;
  display: flex;
  padding: 15px 0;
  margin-left: ${({ animate }) => (animate ? 0 : -198)}%;
  transition: all 0.6s ease-out;
`;

const PhotoWrap = styled(Link)`
  margin-left: 45px;
  display: flex;
  flex-direction: column;
  align-items: center;
  &:last-child {
    margin-right: 45px;
  }
`;

const Beacon = styled(InView)`
  color: transparent;
  height: 0px;
  width: 1px;
`;

const InfoWrap = styled.div`
  align-self: center;
  display: inline-block;
  margin-top: 20px;
`;

const CategoryName = styled.h2<{ animate: boolean }>`
  font-weight: 700;
  font-size: ${({ animate }) => (animate ? 30 : 14)}px;
  transition-delay: 0.4ms;
  transition: all 0.6s ease-out;
`;

const ImagesCount = styled.p`
  font-weight: 400;
`;

type Props = {
  data: {
    allThumbnail: {
      edges: {
        node: {
          name: string;
          dir: string;
          childImageSharp: ImageDataLike;
        };
      }[];
    };
    count: {
      group: Category[];
    };
  };
};

type Category = {
  totalCount: number;
  fieldValue: string;
};

// markup
const IndexPage: React.VFC<Props> = ({ data }) => {
  const { allThumbnail, count } = data;
  const [viewCategory, setViewCategory] = useState<Category>(
    count.group.slice(-1)[0]
  );

  const [animate, setAnimate] = useState<boolean>(false);
  useEffect(() => setAnimate(true), []);

  const setCategory = useCallback((entry: IntersectionObserverEntry) => {
    entry.isIntersecting &&
      setViewCategory(
        count.group.find((item) =>
          item.fieldValue.includes(entry.target.innerHTML)
        )!
      );
  }, []);

  return (
    <React.Fragment>
      <BaseLayout>
        <Main>
          <ThumbnailsWrap>
            <Thumbnails count={allThumbnail.edges.length} animate={animate}>
              {allThumbnail.edges.map(({ node }) => {
                const path = node.dir.match(/\/photos\/.+/)![0];
                return (
                  <PhotoWrap key={node.dir} to={path}>
                    <Beacon onChange={(_invew, entry) => setCategory(entry)}>
                      {node.dir.split("_").slice(-1)[0]}
                    </Beacon>
                    <FrameInPhotograph
                      childImageSharp={node.childImageSharp!}
                      name={node.name}
                    />
                  </PhotoWrap>
                );
              })}
            </Thumbnails>
          </ThumbnailsWrap>
          <InfoWrap>
            <CategoryName animate={animate}>
              {viewCategory.fieldValue.split("_").slice(-1)[0].toUpperCase()}
            </CategoryName>
            <ImagesCount>{viewCategory.totalCount} Images</ImagesCount>
          </InfoWrap>
        </Main>
      </BaseLayout>
    </React.Fragment>
  );
};

export const pageQuery = graphql`
  query {
    allThumbnail: allFile(
      filter: { dir: { regex: "/(photos)/" }, name: { regex: "/(thumbnail)/" } }
      sort: { fields: dir, order: ASC }
    ) {
      edges {
        node {
          name
          dir
          childImageSharp {
            gatsbyImageData(blurredOptions: { width: 100 }, width: 900)
          }
        }
      }
    }
    count: allFile(filter: { dir: { regex: "/(photos)/" } }) {
      group(field: dir) {
        totalCount
        fieldValue
      }
    }
  }
`;

export default IndexPage;
