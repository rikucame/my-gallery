import * as React from "react";
import { ReactElement } from "react";
import { Footer } from "../../modules/Footer";
import { Head, SeoProps } from "../../modules/Head";
import { Header } from "../../modules/Header";

type BaseLayOutProps = {
  seo: SeoProps;
  children: ReactElement;
};

export const BaseLayout: React.VFC<BaseLayOutProps> = ({ children, seo }) => {
  return (
    <React.Fragment>
      <Head {...seo} />
      <Header />
      {children}
      <Footer />
    </React.Fragment>
  );
};
