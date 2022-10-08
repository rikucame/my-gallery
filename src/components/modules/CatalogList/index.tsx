import styled from "styled-components";
import { Link } from "gatsby";
import * as React from "react";
import { colors } from "../../Utils/Colors";

const Main = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 50px;
  background-color: ${colors.white};
`;

const CatalogListWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 60px;
  position: fixed;
  left: 0;
  top: 0;
  background-color: ${colors.white};
  z-index: 90;
`;

const ItemsWrap = styled.section`
  width: 60%;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-size: 26px;
  margin-bottom: 5px;
`;

const Items = styled.ul``;

const Item = styled.li`
  list-style: none;
  margin-left: 15px;
  margin-bottom: 5px;
`;

const ItemLink = styled(Link)``;

const Name = styled.p`
  font-size: 20px;
  padding: 5px 0;
`;

const catalog: CatalogItemsProps = [
  {
    title: "Genre",
    links: [
      { name: "Portrait", path: "/photos/portrait" },
      { name: "Mood", path: "/photos/mood" },
      { name: "Snap", path: "/photos/snap" },
    ],
  },
  {
    title: "Theme",
    links: [{ name: "Coming soon", path: "" }],
  },
];

export type CatalogItemsProps = {
  title: string;
  links: {
    name: string;
    path: string;
  }[];
}[];

export const CatalogList: React.VFC = () => (
  <CatalogListWrap>
    {catalog.map(({ title, links }) => (
      <ItemsWrap>
        <Title>{title}</Title>
        <Items>
          {links.map(({ name, path }) => (
            <Item>
              <ItemLink to={path}>
                <Name>{name}</Name>
              </ItemLink>
            </Item>
          ))}
        </Items>
      </ItemsWrap>
    ))}
  </CatalogListWrap>
);
