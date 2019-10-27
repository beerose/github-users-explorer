/** @jsx jsx */
import React, { ComponentProps, useRef } from "react";
import { css, jsx } from "@emotion/core";

import { styled, useTheme } from "../theme";
import { transparentize } from "polished";
import { useFocus } from "../utils";

import { SearchIcon, XIcon } from "./icons";
import { Button } from "./Button";

type ClearInputButtonProps = ComponentProps<"button">;
const ClearInputButton: React.FC<ClearInputButtonProps> = props => {
  const { colors } = useTheme();

  return (
    <Button
      title="Clear input"
      css={css`
        display: flex;

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
      <XIcon width="1em" height="1em" />
    </Button>
  );
};
type StyledLabelProps = { inputFocused: boolean };
const Label = styled.label<StyledLabelProps>`
  display: flex;

  font-size: 2em;
  padding: 0 1em;

  background: white;
  border-radius: 1.6em;

  ${({ theme, inputFocused }) =>
    inputFocused &&
    css`
      box-shadow: 0 0 15px 1px ${transparentize(0.95, theme.colors.text)},
        0 0 1px 1px ${transparentize(0.88, theme.colors.text)};
    `};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.2em;
  }
`;

const Input = styled.input`
  border: none;
  outline: none;

  overflow: hidden;
  text-overflow: ellipsis;

  background: none;

  flex: 1 1 0;

  font-size: inherit;
  line-height: 1.7;

  ::placeholder {
    opacity: 0.5;
  }
`;

interface SearchInputProps extends Omit<ComponentProps<"input">, "onReset"> {
  onReset: () => void;
}
export const SearchInput: React.FC<SearchInputProps> = ({
  className,
  onReset,
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
      <ClearInputButton onClick={onReset} />
    </Label>
  );
};
