import * as React from "react";
import { memo } from "react";
import { Helmet } from "react-helmet";
import { CreateGlobalStyle } from "../../../GrobalStyle";

export const Head: React.VFC = memo(() => {
  return (
    <>
      <Helmet
        link={[
          { rel: "stylesheet", href: "https://use.typekit.net/lpr1vrm.css" },
        ]}
      />
      <CreateGlobalStyle />
    </>
  );
});
