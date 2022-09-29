import * as React from "react";
import { memo } from "react";
import { Helmet } from "react-helmet";
import { CreateGlobalStyle } from "../../../GrobalStyle";

const url = "https://rikutoishikura.com";
const title = "Rikuto Ishikura";
const description = "Rikuto Ishikura | Rikkun | Photographer";
const faviconPath = "/favicon.svg";

const OgpSettings: React.VFC = () => (
  <>
    <meta property="og:url" content={url} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={`${url}/ogp.jpg`} />
  </>
);

export const Head: React.VFC = memo(() => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <link rel="shortcut icon" href={faviconPath} type="image/svg" />
        <link rel="stylesheet" href="https://use.typekit.net/lpr1vrm.css" />
        <meta name="description" content={description} />
        <OgpSettings />
      </Helmet>
      <CreateGlobalStyle />
    </>
  );
});
