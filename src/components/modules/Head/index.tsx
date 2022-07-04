import * as React from "react";
import { Helmet } from "react-helmet";

export const Head: React.VFC = () => {
  return (
    <Helmet
      link={[
        { rel: "stylesheet", href: "https://use.typekit.net/lpr1vrm.css" },
      ]}
    />
  );
};
