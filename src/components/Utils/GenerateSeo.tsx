import { WindowLocation } from "@reach/router";
import { SeoProps } from "../modules/Head";

export const generateSeo: (location: WindowLocation<unknown>) => SeoProps = (
  location
) => {
  return {
    title: location.pathname.split("/").slice(-1)[0],
    absolutePath: location.pathname,
  };
};
