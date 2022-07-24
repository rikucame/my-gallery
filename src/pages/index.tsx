import { graphql, Link } from "gatsby";
import { ImageDataLike } from "gatsby-plugin-image";
import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { InView } from "react-intersection-observer";
import styled from "styled-components";
import { isHistoryBack } from "../atoms/isHistoryBack";
import { memoScrollLeft } from "../atoms/memoScrollLeft";
import { BaseLayout } from "../components/Layout/BaseLayout";
import { FrameInPhotograph } from "../components/parts/FrameInPhotograph";

const Main = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ThumbnailsWrap = styled.div`
  width: 100%;
  overflow: auto;
  scroll-behavior: smooth;
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

type Category = {
  totalCount: number;
  fieldValue: string;
};

type AllThumbnails = {
  edges: {
    node: {
      name: string;
      dir: string;
      childImageSharp: ImageDataLike;
    };
  }[];
};

type PageProps = {
  location: any;
  prevLocation: any;
  data: {
    allThumbnail: AllThumbnails;
    count: {
      group: Category[];
    };
  };
};

const PageContent: React.VFC<{
  categories: Category[];
  allThumbnails: AllThumbnails;
}> = ({ categories, allThumbnails }) => {
  const elm = React.useRef<HTMLDivElement>(null);
  const [viewCategory, setViewCategory] = useState<Category>(
    categories.slice(-1)[0]
  );

  const setCategory = useCallback(
    (entry: IntersectionObserverEntry, categoryName: string) => {
      if (entry.isIntersecting) {
        setViewCategory(
          categories.find((item) => item.fieldValue.includes(categoryName))!
        );
      }
    },
    []
  );

  const [isFirstVisit, Visit] = isHistoryBack();
  const [_, setScrollLeftAmount, doScroll] = memoScrollLeft(elm);
  useEffect(() => {
    Visit();
    doScroll();
  }, []);

  return (
    <Main>
      <ThumbnailsWrap ref={elm}>
        <Thumbnails count={allThumbnails.edges.length} animate={isFirstVisit}>
          {allThumbnails.edges.map(({ node }) => {
            const path = node.dir.split("images").slice(-1)[0];
            return (
              <PhotoWrap key={node.dir} to={path} onClick={setScrollLeftAmount}>
                <Beacon
                  onChange={(_invew, entry) => setCategory(entry, node.dir)}
                />
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
        <CategoryName animate={isFirstVisit}>
          {viewCategory.fieldValue.split("_").slice(-1)[0].toUpperCase()}
        </CategoryName>
        <ImagesCount>{viewCategory.totalCount} Images</ImagesCount>
      </InfoWrap>
    </Main>
  );
};

const IndexPage: React.VFC<PageProps> = ({ data }) => {
  const { allThumbnail, count } = data;
  return (
    <BaseLayout>
      <PageContent categories={count.group} allThumbnails={allThumbnail} />
    </BaseLayout>
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
            gatsbyImageData(blurredOptions: { width: 100 }, height: 900)
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
