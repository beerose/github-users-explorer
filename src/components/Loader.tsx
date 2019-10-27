/** @jsx jsx */
import { ClipLoader } from "react-spinners";
import { css, jsx } from "@emotion/core";
import { useTheme } from "../theme";

export const Loader = () => {
  const { colors } = useTheme();
  return (
    <section
      css={css`
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        padding-top: 20px;
      `}
    >
      <ClipLoader loading size={80} color={colors.text05} />
    </section>
  );
};
