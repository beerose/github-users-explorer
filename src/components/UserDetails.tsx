import React from "react";

import * as github from "../githubClient";
import { styled } from "../theme";
import { transparentize } from "polished";

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
    margin-bottom: 0;
  }
`;

const Login = styled.p`
  margin: 0.3em;
  color: ${props => transparentize(0.5, props.theme.colors.text)};
`;

const Bio = styled.section`
  margin: 1.5em;
  max-width: 20em;
  text-align: center;
`;

const Repository = styled.div``;

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
        <Login>@{user.login}</Login>
      </UserDetailsHeader>
      <Bio>{user.bio}</Bio>
      {repos.map(repo => (
        <Repository>{repo.name}</Repository>
      ))}
    </UserDetailsSection>
  );
};
