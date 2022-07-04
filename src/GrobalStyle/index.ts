import { createGlobalStyle } from "styled-components";
import { colors } from "../components/Utils/Colors";

export const CreateGlobalStyle = createGlobalStyle`
  * {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    font-family: tilden-sans, sans-serif;
    font-style: normal;
  }

  p, a {
    color: ${colors.black};
    text-decoration: none;
  }

  img {
    color: transparent;
  }
`;
