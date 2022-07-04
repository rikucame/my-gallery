import * as React from "react";
import styled from "styled-components";
import { CreateGlobalStyle } from "../../../GrobalStyle";
import { HamburgerMenu } from "../HamburgerMenu";

const StyledHeader = styled.header`
  width: 100%;
  height: 60px;
`;

export const Header: React.VFC = () => {
  return (
    <StyledHeader>
      <CreateGlobalStyle />
      <HamburgerMenu />
    </StyledHeader>
  );
};
