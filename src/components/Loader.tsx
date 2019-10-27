/** @jsx jsx */
import { css, jsx, keyframes } from "@emotion/core";
import { useTheme } from "../theme";

const spin = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

export const Loader = () => {
  const { colors } = useTheme();
  return (
    <section
      css={css`
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        padding-top: 20px;
      `}
    >
      <div
        css={css`
          animation: ${spin} 4s infinite linear;
        `}
      >
        <div
          css={css`
            width: 60px;
            height: 60px;
            border: 3px solid ${colors.text09};
            border-top-color: ${colors.text05};
            border-radius: 50%;

            animation: ${spin} 1.25s infinite ease-in-out;
          `}
        />
      </div>
    </section>
  );
};
