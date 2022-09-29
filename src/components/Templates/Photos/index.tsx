import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { PhotosType } from "../../../templates/photos";
import { LayoutButton } from "./components/LayoutButton";

const Main = styled.main`
  margin: 15px 2vw;
`;

const ButtonWrap = styled.div`
  position: fixed;
  right: 10px;
  top: 10px;
  z-index: 100;
  mix-blend-mode: difference;
`;

const PhotographWrap = styled.div<{ isTwoColumns: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ isTwoColumns }) => (isTwoColumns ? 47 : 96)}vw;
  height: ${({ isTwoColumns }) => (isTwoColumns ? "47vw" : "auto")};
`;

const Photograph = styled(GatsbyImage)`
  height: 100%;
`;

const Photographs = styled.div<{ isTwoColumns: boolean }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ isTwoColumns }) => (isTwoColumns ? 1 : 4)}vw;
`;

export const Photos: React.VFC<{ photos: PhotosType }> = ({ photos }) => {
  const [isTwoColumns, setIsTwoColumns] = useState(false);
  const togleColumn = () => setIsTwoColumns(!isTwoColumns);
  return (
    <Main>
      <ButtonWrap>
        <LayoutButton onClick={togleColumn} isTwoColumns={isTwoColumns} />
      </ButtonWrap>
      <Photographs isTwoColumns={isTwoColumns}>
        {photos.map(({ node }) => {
          return (
            <PhotographWrap isTwoColumns={isTwoColumns}>
              <Photograph
                image={getImage(node.childImageSharp)!}
                alt={node.name}
              />
            </PhotographWrap>
          );
        })}
      </Photographs>
    </Main>
  );
};
