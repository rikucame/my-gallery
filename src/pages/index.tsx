import { graphql, Link } from "gatsby";
import { ImageDataLike } from "gatsby-plugin-image";
import * as React from "react";
import { useState, useEffect } from "react";
import { InView } from "react-intersection-observer";
import styled from "styled-components";
import { BaseLayout } from "../components/Layout/BaseLayout";
import { FrameInPhotograph } from "../components/parts/FrameInPhotograph";

// const photoPages = [{ name: portrait }];

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

const Thumbnails = styled.div<{ count: number }>`
  width: ${({ count }) => 95 * count}%;
  display: flex;
  padding: 15px 0;
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

const CategoryName = styled.h2`
  font-weight: 700;
`;

const ImagesCount = styled.p`
  font-weight: 400;
`;

type Props = {
  data: {
    thumbnail: {
      edges: {
        node: {
          name: string;
          dir: string;
          childImageSharp: ImageDataLike;
        };
      }[];
    };
    count: {
      group: {
        totalCount: Number;
        fieldValue: string;
      }[];
    };
  };
};

// markup
const IndexPage: React.VFC<Props> = ({ data }) => {
  const { thumbnail, count } = data;

  const [viewPhotoCategory, setViewPhotoCategory] = useState<string>("");
  const [categoryImagesCount, setCategoryImagesCount] = useState<Number>();
  useEffect(() => {
    const viewCount = count.group.find((category) =>
      category.fieldValue.includes(viewPhotoCategory!)
    );
    setCategoryImagesCount(viewCount?.totalCount);
  }, [viewPhotoCategory]);
  return (
    <React.Fragment>
      <BaseLayout>
        <Main>
          <ThumbnailsWrap>
            <Thumbnails count={thumbnail.edges.length}>
              {thumbnail.edges.map(({ node }) => {
                const path = node.dir.match(/\/photos\/.+/)![0];
                return (
                  <PhotoWrap key={node.dir} to={path}>
                    <Beacon
                      onChange={(_invew, entry) =>
                        entry.isIntersecting &&
                        setViewPhotoCategory(entry.target.innerHTML)
                      }
                    >
                      {node.dir.split("_").slice(-1)}
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
            <CategoryName>{viewPhotoCategory.toUpperCase()}</CategoryName>
            <ImagesCount>{categoryImagesCount} Images</ImagesCount>
          </InfoWrap>
        </Main>
      </BaseLayout>
    </React.Fragment>
  );
};

export const pageQuery = graphql`
  query {
    thumbnail: allFile(
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
