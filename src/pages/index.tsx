import { graphql } from "gatsby";
import React from "react";
import { BaseLayout } from "../components/Layout/BaseLayout";
import { SeoProps } from "../components/modules/Head";
import { Thumbnail, Category, Top } from "../components/Pages/Top";

type PageProps = {
  location: any;
  prevLocation: any;
  data: {
    allThumbnail: {
      edges: {
        node: Thumbnail;
      }[];
    };
    count: {
      group: Category[];
    };
  };
};

const viewOrder = ["portrait", "snap", "mood"];
const orderSort = (x: string, y: string) =>
  viewOrder.indexOf(x) - viewOrder.indexOf(y);

const IndexPage: React.VFC<PageProps> = ({ data }) => {
  const { allThumbnail, count } = data;
  const seo: SeoProps = {
    title: "",
    absolutePath: "",
  };
  const categoryInfos = count.group
    .map(({ totalCount, fieldValue }) => ({
      totalCount,
      fieldValue: fieldValue.split("/").slice(-1)[0],
    }))
    .sort((x, y) => orderSort(x.fieldValue, y.fieldValue));

  const thumbnails = allThumbnail.edges
    .map(({ node }) => ({
      dir: node.dir.split("/").slice(-1)[0],
      name: node.name,
      childImageSharp: node.childImageSharp,
    }))
    .sort((x, y) => orderSort(x.dir, y.dir));
  return (
    <BaseLayout seo={seo}>
      <Top categories={categoryInfos} Thumbnails={thumbnails} />
    </BaseLayout>
  );
};

export const pageQuery = graphql`
  query {
    allThumbnail: allFile(
      filter: { dir: { regex: "/(photos)/" }, name: { regex: "/(thumbnail)/" } }
      sort: { fields: dir, order: ASC }
    ) {
      edges {
        node {
          name
          dir
          childImageSharp {
            gatsbyImageData(blurredOptions: { width: 100 }, height: 900)
          }
        }
      }
    }
    count: allFile(filter: { dir: { regex: "/(photos)/" } }) {
      group(field: dir) {
        totalCount
        fieldValue
      }
    }
  }
`;

export default IndexPage;
