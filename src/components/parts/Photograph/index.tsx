import * as React from "react";
import { GatsbyImage, getImage, ImageDataLike } from "gatsby-plugin-image";
import styled from "styled-components";
import { memo } from "react";

type Props = {
  name: string;
  childImageSharp: ImageDataLike;
};

export const Photograph: React.VFC<Props> = memo(
  ({ name, childImageSharp }) => {
    return <StyledPhotograph image={getImage(childImageSharp)!} alt={name} />;
  }
);

const StyledPhotograph = styled(GatsbyImage)`
  color: transparent;
  box-shadow: 7px 7px 5px 2px rgba(122, 122, 122, 0.91);
`;
