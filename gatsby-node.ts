import path from "path";
import { GatsbyNode } from "gatsby";

type Result = {
  allDirectory: {
    nodes: {
      name: string;
      absolutePath: string;
    }[];
  };
};

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions: { createPage },
}) => {
  const queryResults = await graphql<Result>(`
    query {
      allDirectory(filter: { dir: { regex: "/(/src/images/photos)/" } }) {
        nodes {
          name
          absolutePath
        }
      }
    }
  `);

  const productTemplate = path.resolve(`src/templates/photos/index.tsx`);
  queryResults.data?.allDirectory.nodes.forEach(({ name, absolutePath }) => {
    createPage({
      path: `/photos/${name}`,
      component: productTemplate,
      context: {
        // This time the entire product is passed down as context
        dirPath: absolutePath,
      },
    });
  });
};
