import * as React from "react";
import { Helmet } from "react-helmet";
import { CreateGlobalStyle } from "../../../GrobalStyle";

const GATag = () => (
  <>
    <script
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-7ZTPC2JX51"
    />
    <script>
      {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-7ZTPC2JX51');
`}
    </script>
  </>
);

export type SeoProps = {
  title: string;
  absolutePath: string;
  description?: string;
  ogImagePath?: string;
};

export const Head: React.VFC<SeoProps> = ({
  title,
  absolutePath,
  description,
  ogImagePath,
}) => {
  const domain = "https://rikutoishikura.com";
  const siteName = "Rikuto Ishikura";
  const baseDescription = "Rikuto Ishikura | Rikkun | Photographer";
  const pageTitle = title.length
    ? `${siteName} | ${title.toUpperCase()}`
    : siteName;
  const pageDescription = description || baseDescription;
  const ogpImage = ogImagePath || `${domain}/ogp.jpg`;
  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:url" content={`${domain}${absolutePath}`} />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={ogpImage} />
        <link rel="shortcut icon" href="/favicon.svg" type="image/svg" />
        <link rel="stylesheet" href="https://use.typekit.net/lpr1vrm.css" />
        <GATag />
      </Helmet>
      <CreateGlobalStyle />
    </>
  );
};
