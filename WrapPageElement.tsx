import React, { ReactNode } from "react";
import { RecoilRoot } from "recoil";

export const WrapPageElement: React.VFC<{
  element: ReactNode;
  props: Object;
}> = ({ props, element }) => {
  return (
    <div>
      <RecoilRoot {...props}>{element}</RecoilRoot>
    </div>
  );
};
