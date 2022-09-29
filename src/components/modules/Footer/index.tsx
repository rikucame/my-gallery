import * as React from "react";
import { memo } from "react";
import styled from "styled-components";
import { colors } from "../../Utils/Colors";

const StyledFooter = styled.footer`
  position: fixed;
  right: 3px;
  bottom: 10px;
`;

const Name = styled.p`
  font-size: 13px;
  color: ${colors.blue};
  font-weight: 400;
  transform: rotate(-30deg);
`;

export const Footer: React.VFC = memo(() => {
  return (
    <StyledFooter>
      <Name>RIKUTO</Name>
    </StyledFooter>
  );
});
