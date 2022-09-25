import { Link } from "gatsby";
import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import { ExternalLink } from "../../parts/ExternalLink";
import { colors } from "../../Utils/Colors";
import { TiSocialTwitter } from "@react-icons/all-files/ti/TiSocialTwitter";
import { TiSocialInstagram } from "@react-icons/all-files/ti/TiSocialInstagram";

const MenuIcon = styled.button`
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 100;
  width: 30px;
  height: 30px;
  border: none;
  background-color: transparent;
  &::before,
  &::after {
    content: "";
    position: absolute;
    background-color: ${colors.black};
  }
`;

const OpenMenuIcon = styled(MenuIcon)`
  border-top: 2px solid ${colors.black};
  &::before,
  &::after {
    height: 2px;
    left: 0px;
  }
  &::before {
    top: 12px;
    width: calc(200% / 3);
  }
  &::after {
    top: 26px;
    width: calc(100% / 3);
  }
`;
const CloseMenuIcon = styled(MenuIcon)`
  &::before,
  &::after {
    top: 0px;
    left: 14px;
    width: 2px;
    height: 30px;
    transform-origin: 50% 50%;
  }
  &::before {
    transform: rotate(45deg);
  }
  &::after {
    transform: rotate(-45deg);
  }
`;

const MenuBackGround = styled.div<{ isOpen: boolean }>`
  width: 100vw;
  height: 110vh;
  position: fixed;
  bottom: 0px;
  left: -100vw;
  background-color: white;
  transition: all 0.2s ease-out;
  transform: rotate(${({ isOpen }) => (isOpen ? 16 : 0)}deg);
  transform-origin: bottom right;
  z-index: 10;
  box-shadow: 0px 3px 3px 2px #333;
`;

const Menu = styled.menu<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 80px;
  left: ${({ isOpen }) => (isOpen ? 20 : -100)}px;
  z-index: 100;
  transition: all 0.2s ease-out;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
`;

const PageLink = styled(Link)`
  font-size: 28px;
  margin-bottom: 8px;
`;

const SocialMediaLinkList = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  min-width: 60px;
`;

const pageLinks = [
  { title: "Top", path: "/" },
  { title: "Genre", path: "/genre" },
];

const socialMediaLinks = [
  {
    IconImage: TiSocialTwitter,
    link: "https://www.instagram.com/rikton_0318/",
  },
  { IconImage: TiSocialInstagram, link: "https://twitter.com/rikton_0318" },
];

export const HamburgerMenu: React.VFC = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const OpenMenu = () => setIsOpenMenu(true);
  const CloseMenu = () => setIsOpenMenu(false);
  return (
    <React.Fragment>
      {isOpenMenu ? (
        <CloseMenuIcon onClick={CloseMenu} />
      ) : (
        <OpenMenuIcon onClick={OpenMenu} />
      )}
      {isOpenMenu && <ChangeCloseArea onClick={CloseMenu} />}
      <MenuBackGround isOpen={isOpenMenu} />
      <Menu isOpen={isOpenMenu}>
        {pageLinks.map(({ title, path }) => {
          return (
            <PageLink to={path} onClick={CloseMenu} key={title}>
              {title}
            </PageLink>
          );
        })}
        <SocialMediaLinkList>
          {socialMediaLinks.map(({ IconImage, link }) => {
            return (
              <ExternalLink href={link} key={link}>
                <IconImage color={colors.blue} size={22} />
              </ExternalLink>
            );
          })}
        </SocialMediaLinkList>
      </Menu>
    </React.Fragment>
  );
};

const ChangeCloseArea = styled.div`
  height: 100vh;
  z-index: 10;
  position: relative;
  top: 0;
  left: 0;
`;
