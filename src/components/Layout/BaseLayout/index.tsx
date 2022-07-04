import * as React from "react";
import { ReactElement } from "react";
import { Footer } from "../../modules/Footer";
import { Head } from "../../modules/Head";
import { Header } from "../../modules/Header";

export const BaseLayout: React.VFC<{ children: ReactElement }> = ({
  children,
}) => {
  return (
    <React.Fragment>
      <Head />
      <Header />
      {children}
      <Footer />
    </React.Fragment>
  );
};
