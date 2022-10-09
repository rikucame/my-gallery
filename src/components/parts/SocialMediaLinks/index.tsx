import * as React from "react";
import { ExternalLink } from "../../parts/ExternalLink";
import { TiSocialTwitter } from "@react-icons/all-files/ti/TiSocialTwitter";
import { TiSocialInstagram } from "@react-icons/all-files/ti/TiSocialInstagram";
import styled from "styled-components";
import { colors } from "../../Utils/Colors";

const SocialMediaLinkList = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  width: 60px;
`;

const socialMediaLinks = [
  {
    IconImage: TiSocialTwitter,
    link: "https://www.instagram.com/rikton_0318/",
  },
  { IconImage: TiSocialInstagram, link: "https://twitter.com/rikton_0318" },
];

export const SocialMediaLinks: React.VFC = () => (
  <SocialMediaLinkList>
    {socialMediaLinks.map(({ IconImage, link }) => {
      return (
        <ExternalLink href={link} key={link}>
          <IconImage color={colors.blue} size={22} />
        </ExternalLink>
      );
    })}
  </SocialMediaLinkList>
);
