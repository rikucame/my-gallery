import { Link } from "gatsby";
import { ImageDataLike } from "gatsby-plugin-image";
import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { InView } from "react-intersection-observer";
import styled from "styled-components";
import { memoScrollLeft } from "../../../atoms/memoScrollLeft";
import { FrameInPhotograph } from "../../parts/FrameInPhotograph";
import { colors } from "../../Utils/Colors";

const Main = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ThumbnailsWrap = styled.div`
  width: 100%;
  overflow: auto;
  scroll-snap-type: x mandatory;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Thumbnails = styled.div<{ count: number }>`
  width: ${({ count }) => 95 * count}%;
  display: flex;
  padding: 15px 0;
  transition: all 0.6s ease-out;
`;

const PhotoWrap = styled(Link)`
  scroll-snap-align: center;
  scroll-snap-stop: always;
  margin-left: 60px;
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

const InfoWrap = styled(Link)`
  align-self: center;
  display: inline-block;
  margin-top: 20px;
`;

const CategoryName = styled.h1`
  font-weight: 700;
  font-size: 30px;
  transition-delay: 0.4ms;
  transition: all 0.6s ease-out;
`;

const ImagesCount = styled.p`
  font-weight: 400;
`;

const Dots = styled.ul`
  display: flex;
  justify-content: center;
`;

const Dot = styled.li<{ view: boolean }>`
  width: 19px;
  height: 19px;
  padding: 3px;
  list-style: none;
  font-size: ${({ view }) => (view ? 30 : 10)}px;
  display: flex;
  justify-content: center;
  align-items: center;
  &::before {
    content: "";
    display: block;
    width: ${({ view }) => (view ? 80 : 50)}%;
    height: ${({ view }) => (view ? 80 : 50)}%;
    border-radius: 50%;
    background-color: ${({ view }) => (view ? colors.black : colors.gray)};
  }
`;

export type Category = {
  totalCount: number;
  fieldValue: string;
};

export type AllThumbnails = {
  edges: {
    node: {
      name: string;
      dir: string;
      childImageSharp: ImageDataLike;
    };
  }[];
};

export const Top: React.VFC<{
  categories: Category[];
  allThumbnails: AllThumbnails;
}> = ({ categories, allThumbnails }) => {
  const elm = React.useRef<HTMLDivElement>(null);
  const [viewCategory, setViewCategory] = useState<Category>(
    categories.slice(-1)[0]
  );

  const setCategory = useCallback(
    (entry: IntersectionObserverEntry, categoryName: string) => {
      entry.isIntersecting &&
        setViewCategory(
          categories.find(({ fieldValue }) => fieldValue === categoryName)!
        );
    },
    []
  );

  const [_, setScrollLeftAmount, doScroll] = memoScrollLeft(elm);
  useEffect(() => {
    doScroll();
  }, []);

  return (
    <Main>
      <Dots>
        {categories.map(({ fieldValue }) => {
          return <Dot view={fieldValue === viewCategory.fieldValue} />;
        })}
      </Dots>
      <ThumbnailsWrap ref={elm}>
        <Thumbnails count={allThumbnails.edges.length}>
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
      <InfoWrap to={viewCategory.fieldValue.split("images").slice(-1)[0]}>
        <CategoryName>
          {viewCategory.fieldValue.split("_").slice(-1)[0].toUpperCase()}
        </CategoryName>
        <ImagesCount>{viewCategory.totalCount} Images</ImagesCount>
      </InfoWrap>
    </Main>
  );
};
