import React from "react";

import { styled } from "../theme";

import { StarIcon } from "./StarIcon";
import { Repository } from "../types";

const RepositoryLink = styled.a`
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.text09};
  border-radius: 3px;
  width: 15em;
  min-height: 10em;
  background: white;

  text-decoration: none;
  color: inherit;

  margin: 1em;
  padding: 0.5em 1em;

  :hover {
    border: 1px solid ${({ theme }) => theme.colors.text09};
    box-shadow: 0 0 10px 1px ${({ theme }) => theme.colors.text09};
  }

  h3 {
    margin: 0.5em 0;
  }

  p {
    margin: 10px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${({ theme }) => theme.colors.text05};
  }
`;

const StarsDetails = styled.div`
  align-self: flex-end;

  display: flex;
  align-items: center;

  svg {
    margin-right: 0.2em;
    width: 16px;
  }
`;

type RepositoryDetailsProps = {
  repository: Repository;
};
export const RepositoryDetails: React.FC<RepositoryDetailsProps> = ({
  repository,
}) => {
  return (
    <RepositoryLink href={repository.html_url}>
      <StarsDetails>
        <StarIcon />
        {repository.stargazers_count}
      </StarsDetails>
      <h3>{repository.name}</h3>
      <p>{repository.description}</p>
    </RepositoryLink>
  );
};
