/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { ComponentProps, ComponentType } from "react";
import { transparentize } from "polished";

import { prefixWithHttps } from "../utils";
import { styled, useTheme } from "../theme";
import { User, Repository } from "../types";

import { Row } from "./Row";
import { RepositoryDetails } from "./RepositoryDetails";
import { LocationIcon, WebsiteIcon, BriefcaseIcon } from "./icons";

const userDetailsHalfStyles = css`
  margin: 1.5em 0;
  padding: 0 0.5em;
  flex: 1 1 50%;
`;

const StyledUserInfoList = styled.ul`
  list-style-type: none;
  ${userDetailsHalfStyles};

  &:nth-child(2) {
    border-left: 1px solid ${({ theme }) => theme.colors.text09};
  }
`;
const UserInfoList = (props: ComponentProps<typeof StyledUserInfoList>) =>
  props.children ? <StyledUserInfoList {...props} /> : null;

interface UserInfoListItemProps extends ComponentProps<"li"> {
  Icon: ComponentType;
}
const UserInfoListItem: React.FC<UserInfoListItemProps> = ({
  children,
  Icon,
  ...rest
}) =>
  children ? (
    <li
      css={css`
        display: flex;
        align-items: center;
      `}
      {...rest}
    >
      <Icon
        css={css`
          width: 1em;
          margin-right: 0.4em;
        `}
      />
      {children}
    </li>
  ) : null;

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
  ${userDetailsHalfStyles};
`;

const Repositories = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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
      <Row>
        {user.bio && <Bio>{user.bio}</Bio>}
        <UserInfoList>
          <UserInfoListItem Icon={BriefcaseIcon}>
            {user.company}
          </UserInfoListItem>
          <UserInfoListItem Icon={LocationIcon}>
            {user.location}
          </UserInfoListItem>
          <UserInfoListItem Icon={WebsiteIcon}>
            <UserWebsiteLink url={user.blog} />
          </UserInfoListItem>
        </UserInfoList>
      </Row>
      <Repositories>
        {repos.map(repo => (
          <RepositoryDetails key={repo.name} repository={repo} />
        ))}
      </Repositories>
    </UserDetailsSection>
  );
};
