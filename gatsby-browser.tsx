import React, { ReactElement } from "react";
import { RecoilRoot, RecoilRootProps } from "recoil";

export const wrapPageElement: React.VFC<{
  element: any;
  props: RecoilRootProps;
}> = ({ element, props }) => {
  return <RecoilRoot {...props}>{element}</RecoilRoot>;
};
