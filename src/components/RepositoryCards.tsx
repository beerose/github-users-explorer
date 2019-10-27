import React from "react";
import { styled } from "../theme";
import { RepositoryDetails } from "./RepositoryDetails";
import { Repository } from "../types";

const RepositoryDetailsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

type RepositoryCardProps = {
  repositories: Repository[];
};
export const RepositoryCards: React.FC<RepositoryCardProps> = ({
  repositories,
}) => (
  <RepositoryDetailsList>
    {repositories.map(repo => (
      <RepositoryDetails key={repo.name} repository={repo} />
    ))}
  </RepositoryDetailsList>
);
