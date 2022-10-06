import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { PhotosType } from "../../../templates/photos";
import { LayoutButton } from "./components/LayoutButton";

const Main = styled.main`
  margin: 20px;
`;

const ButtonWrap = styled.div`
  position: fixed;
  right: 10px;
  top: 10px;
  z-index: 100;
  mix-blend-mode: difference;
`;

const PhotographWrap = styled.div<{ isTwoColumns: boolean }>`
  --width: ${({ isTwoColumns }) => (isTwoColumns ? 50 : 100)}vw;

  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(var(--width) - 25px);
  ${({ isTwoColumns }) => isTwoColumns && "height: calc(var(--width) - 20px)"};
`;

const Photograph = styled(GatsbyImage)`
  max-width: 800px;
  height: 100%;
`;

const Photographs = styled.div<{ isTwoColumns: boolean }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ isTwoColumns }) => (isTwoColumns ? 10 : 20)}px;
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
