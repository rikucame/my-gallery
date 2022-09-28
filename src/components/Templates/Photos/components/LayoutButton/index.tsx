import React from "react";
import styled from "styled-components";
import { colors } from "../../../../Utils/Colors";

type LayoutButtonProps = {
  onClick: () => void;
  isTwoColumns: boolean;
};

const Button = styled.button`
  display: flex;
  flex-wrap: wrap;
  width: 34px;
  height: 34px;
  background-color: transparent;
  border: none;
  overflow: hidden;
`;

const ButtonRect = styled.div<{ isTwoColumns: boolean }>`
  --size: ${({ isTwoColumns }) => (isTwoColumns ? 32 : 14)}px;
  border: 2px solid ${colors.blue};
  border-radius: 20% / 20%;
  width: var(--size);
  height: var(--size);
  margin: 1px;
  transition: all 0.3s ease-in-out;
`;

export const LayoutButton: React.VFC<LayoutButtonProps> = ({
  onClick,
  isTwoColumns,
}) => {
  return (
    <Button onClick={onClick}>
      <ButtonRect isTwoColumns={isTwoColumns} />
      <ButtonRect isTwoColumns={isTwoColumns} />
      <ButtonRect isTwoColumns={isTwoColumns} />
      <ButtonRect isTwoColumns={isTwoColumns} />
    </Button>
  );
};
