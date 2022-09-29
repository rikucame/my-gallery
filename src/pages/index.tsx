import { graphql } from "gatsby";
import React from "react";
import { BaseLayout } from "../components/Layout/BaseLayout";
import { SeoProps } from "../components/modules/Head";
import { AllThumbnails, Category, Top } from "../components/Pages/Top";

type PageProps = {
  location: any;
  prevLocation: any;
  data: {
    allThumbnail: AllThumbnails;
    count: {
      group: Category[];
    };
  };
};

const IndexPage: React.VFC<PageProps> = ({ data }) => {
  const { allThumbnail, count } = data;
  const seo: SeoProps = {
    title: "",
    absolutePath: "",
  };
  return (
    <BaseLayout seo={seo}>
      <Top categories={count.group} allThumbnails={allThumbnail} />
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
