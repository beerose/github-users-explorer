/** @jsx jsx */
import React, { ComponentProps, useRef } from "react";
import { css, jsx } from "@emotion/core";
import { SearchIcon } from "./SearchIcon";
import { styled, useTheme } from "../theme";
import { transparentize } from "polished";
import { useFocus } from "../utils/useFocus";

import { XIcon } from "./XIcon";

type ClearInputButtonProps = ComponentProps<"button">;
const ClearInputButton: React.FC<ClearInputButtonProps> = props => {
  const { colors } = useTheme();

  return (
    <button
      type="reset"
      title="Clear input"
      css={css`
        border: none;
        background: none;
        cursor: pointer;
        color: ${colors.text};
        opacity: 0.5;

        outline: none;

        :hover,
        :focus {
          opacity: 1;
        }
      `}
      {...props}
    >
      <XIcon />
    </button>
  );
};
type StyledLabelProps = { inputFocused: boolean };
const Label = styled.label<StyledLabelProps>`
  display: flex;

  font-size: 2em;
  padding: 0 1em;

  background: white;
  border-radius: 1.6em;

  ${props =>
    props.inputFocused &&
    css`
      box-shadow: 0 0 15px 1px ${transparentize(0.95, props.theme.colors.text)};
    `};
`;

const Input = styled.input`
  border: none;
  outline: none;

  background: none;

  width: 20em;
  font-size: inherit;
  line-height: 1.7;

  ::placeholder {
    opacity: 0.5;
  }
`;

type SearchInputProps = ComponentProps<"input">;
export const SearchInput: React.FC<SearchInputProps> = ({
  className,
  ...inputProps
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputFocused = useFocus(inputRef);
  const { colors } = useTheme();

  return (
    <Label inputFocused={inputFocused} className={className}>
      <SearchIcon
        width="1em"
        height="100%"
        stroke={transparentize(0.5, colors.text)}
        css={css`
          margin-right: 0.5em;
        `}
      />
      <Input ref={inputRef} {...inputProps} />
      <ClearInputButton />
    </Label>
  );
};
