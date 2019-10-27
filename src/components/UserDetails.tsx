import React from "react";

import * as github from "../githubClient";
import { styled } from "../theme";
import { transparentize } from "polished";
import { RepositoryDetails } from "./RepositoryDetails";

const Avatar = styled.img`
  border-radius: 50%;
  width: 8em;
`;

const UserDetailsSection = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 2em;
`;

const UserDetailsHeader = styled.header`
  text-align: center;

  h2 {
    margin-bottom: 0.2em;
  }
`;

const Login = styled.a`
  text-decoration: none;

  color: ${props => transparentize(0.5, props.theme.colors.text)};

  ::before {
    content: "@";
  }
`;

const Bio = styled.section`
  margin: 1.5em;
  max-width: 20em;
  text-align: center;
`;

const Repositories = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

interface UserDetailsProps {
  user: github.User;
  repos: github.Repository[];
}
export const UserDetails = ({ user, repos }: UserDetailsProps) => {
  return (
    <UserDetailsSection>
      <Avatar src={user.avatar_url} alt="User avatar" />
      <UserDetailsHeader>
        <h2>{user.name}</h2>
        <Login href={user.html_url} target="__blank">
          {user.login}
        </Login>
      </UserDetailsHeader>
      <Bio>{user.bio}</Bio>
      <Repositories>
        {repos.map(repo => (
          <RepositoryDetails repository={repo} />
        ))}
      </Repositories>
    </UserDetailsSection>
  );
};
