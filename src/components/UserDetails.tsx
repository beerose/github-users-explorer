/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { ComponentProps } from "react";
import { transparentize } from "polished";

import { prefixWithHttps } from "../utils";
import { styled, useTheme } from "../theme";

import { RepositoryDetails } from "./RepositoryDetails";
import { User, Repository } from "../types";

const UserInfoList = "ul";
const UserInfoListItem: React.FC<ComponentProps<"li">> = props =>
  props.children ? <li {...props} /> : null;

interface UserWebsiteLinkProps
  extends Omit<ComponentProps<"a">, "href" | "children"> {
  url: string;
}
const UserWebsiteLink = ({ url, ...rest }: UserWebsiteLinkProps) => {
  const { colors } = useTheme();

  return url ? (
    <a
      href={prefixWithHttps(url)}
      css={css`
        color: ${colors.primary};
      `}
      {...rest}
    >
      {url}
    </a>
  ) : null;
};

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

const UserLogin = styled.a`
  text-decoration: none;

  color: ${props => transparentize(0.5, props.theme.colors.text)};

  ::before {
    content: "@";
  }
`;

const Bio = styled.p`
  margin: 1.5em;
  max-width: 20em;
  text-align: center;
`;

const Repositories = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

interface UserDetailsProps {
  user: User;
  repos: Repository[];
}
export const UserDetails = ({ user, repos }: UserDetailsProps) => {
  return (
    <UserDetailsSection>
      <Avatar src={user.avatar_url} alt="User avatar" />
      <UserDetailsHeader>
        <h2>{user.name}</h2>
        <UserLogin href={user.html_url}>{user.login}</UserLogin>
      </UserDetailsHeader>
      <Bio>{user.bio}</Bio>
      <UserInfoList>
        <UserInfoListItem>{user.company}</UserInfoListItem>
        <UserInfoListItem>{user.location}</UserInfoListItem>
        <UserInfoListItem>
          <UserWebsiteLink url={user.blog} />
        </UserInfoListItem>
      </UserInfoList>
      <Repositories>
        {repos.map(repo => (
          <RepositoryDetails key={repo.name} repository={repo} />
        ))}
      </Repositories>
    </UserDetailsSection>
  );
};
