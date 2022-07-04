import { GatsbyImage, getImage, ImageDataLike } from "gatsby-plugin-image";
import * as React from "react";
import styled, { css } from "styled-components";

type Props = {
  name: string;
  childImageSharp: ImageDataLike;
};

export const FrameInPhotograph: React.VFC<Props> = ({
  name,
  childImageSharp,
}) => {
  return (
    <Frame>
      <Photograph image={getImage(childImageSharp)!} alt={name} />
      <FrameShadow />
    </Frame>
  );
};

const Frame = styled.div`
  border: #333 8px solid;
  box-shadow: 4px 4px 5px 2px rgba(122, 122, 122, 0.91) inset;
  position: relative;
  background-color: #fffdf8;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  width: 100%;
  height: auto;
  position: relative;
`;

const Photograph = styled(GatsbyImage)`
  border: 6px solid;
  border-color: #cdcdcd #e6e6e6 #f0f0f0 #c0c0c0;
`;

const ShadowCommon = css`
  position: absolute;
  z-index: -1;
  content: "";
  display: block;
  filter: blur(2px);
`;

const FrameShadow = styled.span`
  ${ShadowCommon};
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  &::before {
    ${ShadowCommon};
    top: 0px;
    right: -20px;
    border-left: 20px solid #868686;
    border-top: 10px solid transparent;
    height: 100%;
  }

  &::after {
    ${ShadowCommon};
    bottom: -18px;
    right: -20px;
    border-top: 18px solid #868686;
    border-left: 10px solid transparent;
    width: calc(100% + 14px);
  }
`;
