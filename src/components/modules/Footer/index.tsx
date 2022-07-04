import * as React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  position: fixed;
  right: 3px;
  bottom: 10px;
`;

const Name = styled.p`
  font-weight: 400;
  transform: rotate(-30deg);
`;

export const Footer: React.VFC = () => {
  return (
    <StyledFooter>
      <Name>RIKUTO</Name>
    </StyledFooter>
  );
};
