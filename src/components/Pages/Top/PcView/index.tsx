import { Link } from "gatsby";
import { ImageDataLike } from "gatsby-plugin-image";
import * as React from "react";
import styled from "styled-components";
import { FrameInPhotograph } from "../../../parts/FrameInPhotograph";

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

const ThumbnailList = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 40px 0px;
  justify-items: center;
  padding: 15px 0;
  transition: all 0.6s ease-out;
`;

const PhotoWrap = styled(Link)`
  scroll-snap-align: center;
  scroll-snap-stop: always;
  display: flex;
  width: 80%;
  max-width: 500px;
  flex-direction: column;
  align-items: center;
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

export type Category = {
  totalCount: number;
  fieldValue: string;
};

export type Thumbnail = {
  name: string;
  dir: string;
  childImageSharp: ImageDataLike;
};

export const PcView: React.VFC<{
  categories: Category[];
  thumbnails: Thumbnail[];
}> = ({ categories, thumbnails }) => (
  <Main>
    <ThumbnailsWrap>
      <ThumbnailList>
        {thumbnails.map(({ dir, name, childImageSharp }, index) => {
          return (
            <PhotoWrap key={dir} to={`photos/${dir}`}>
              <FrameInPhotograph
                childImageSharp={childImageSharp!}
                name={name}
              />
              <InfoWrap to={`photos/${categories[index].fieldValue}`}>
                <CategoryName>
                  {categories[index].fieldValue.toUpperCase()}
                </CategoryName>
                <ImagesCount>{categories[index].totalCount} Images</ImagesCount>
              </InfoWrap>
            </PhotoWrap>
          );
        })}
      </ThumbnailList>
    </ThumbnailsWrap>
  </Main>
);
