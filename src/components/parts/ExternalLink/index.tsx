import * as React from "react";
import { ReactElement } from "react";

export const ExternalLink: React.VFC<{
  href: string;
  children: ReactElement | String;
}> = ({ href, children }) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};
