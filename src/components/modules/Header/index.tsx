import * as React from "react";
import { memo } from "react";
import styled from "styled-components";
import { HamburgerMenu } from "../HamburgerMenu";

const StyledHeader = styled.header`
  width: 100%;
  height: 60px;
`;

export const Header: React.VFC = memo(() => {
  return (
    <StyledHeader>
      <HamburgerMenu />
    </StyledHeader>
  );
});
