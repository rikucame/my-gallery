import styled from "styled-components";
import { Link } from "gatsby";
import * as React from "react";
import { CatalogItemsProps } from "../../../pages/catalog";

const Main = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 50px;
`;

const CatalogListWrap = styled.div`
  width: 80%;
`;

const ItemsWrap = styled.section`
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

export const Catalog: React.VFC<{ catalog: CatalogItemsProps }> = ({
  catalog,
}) => (
  <Main>
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
  </Main>
);
