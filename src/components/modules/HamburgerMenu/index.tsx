import { Link } from "gatsby";
import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import { colors } from "../../Utils/Colors";
import { CatalogList } from "../CatalogList";
import { SocialMediaLinks } from "../../parts/SocialMediaLinks";

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
    background-color: ${colors.blue};
  }
  mix-blend-mode: difference;
`;

const OpenMenuIcon = styled(MenuIcon)`
  border-top: 2px solid ${colors.blue};
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

const ChangeCloseArea = styled.div`
  height: 100vh;
  z-index: 10;
  position: relative;
  top: 0;
  left: 0;
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
  z-index: 50;
  transition: all 0.2s ease-out;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
`;

const PageLink = styled(Link)`
  font-size: 28px;
  margin-bottom: 8px;
`;

export const HamburgerMenu: React.VFC = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const OpenMenu = () => setIsOpenMenu(true);
  const CloseMenu = () => setIsOpenMenu(false);

  const [isOpenCatalog, setIsOpenCatalog] = useState(false);
  const OpenCatalog = () => setIsOpenCatalog(true);
  const CloseCatalog = () => setIsOpenCatalog(false);
  return (
    <React.Fragment>
      {isOpenMenu ? (
        isOpenCatalog ? (
          <CloseMenuIcon onClick={CloseCatalog} />
        ) : (
          <CloseMenuIcon onClick={CloseMenu} />
        )
      ) : (
        <OpenMenuIcon onClick={OpenMenu} />
      )}
      {isOpenMenu && <ChangeCloseArea onClick={CloseMenu} />}
      {isOpenCatalog && <CatalogList />}
      <MenuBackGround isOpen={isOpenMenu} />
      <Menu isOpen={isOpenMenu}>
        <PageLink to="/" onClick={CloseMenu}>
          Top
        </PageLink>
        <PageLink to="" onClick={OpenCatalog}>
          Catalog
        </PageLink>
        <SocialMediaLinks />
      </Menu>
    </React.Fragment>
  );
};
