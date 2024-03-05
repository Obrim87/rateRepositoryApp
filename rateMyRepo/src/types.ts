import { StyleProp, TextStyle } from 'react-native';
import AuthStorage from './utils/authStorage';
import { Dispatch, SetStateAction } from 'react';

export type RepoOrReview = 'repo' | 'review';

export type SortTypes =
  | 'Latest Repositories'
  | 'Highest Rated Repositories'
  | 'Lowest Rated Repositories';

export type SortDropdownData = {
  key: string;
  value: SortTypes;
};

export interface CreateReviewValues {
  repoOwnerName: string;
  repoName: string;
  repoRating: string;
  repoReview: string;
}

export interface SignInProps {
  username: string;
  password: string;
}

export interface SignInContainerProps {
  signIn: ({ username, password }: SignInProps) => Promise<void>;
  data: CurrentUser;
  handleSignOut: () => void;
}

export interface CurrentUser {
  me: {
    id?: string;
    username?: string;
    reviews?: {
      edges: Review[];
    };
  };
}

export interface CurrentUserContextType {
  currentUser: CurrentUser;
  setCurrentUser: Dispatch<SetStateAction<CurrentUser>>;
}

export interface User {
  id: string;
  username: string;
}

export interface Review {
  node: {
    createdAt: string;
    id: string;
    rating: number;
    text: string;
    repositoryId: string;
    repository: {
      fullName: string;
    };
    user: {
      username: string;
    };
  };
}

export interface SingleViewRepository {
  id: string;
  fullName: string;
  description: string;
  language: string;
  forksCount: number;
  stargazersCount: number;
  ratingAverage: number;
  reviewCount: number;
  ownerAvatarUrl: string;
  url: string;
  reviews: {
    edges: Review[];
  };
}

export interface Repository {
  node: SingleViewRepository;
  cursor?: string;
}

export interface Repositories {
  totalCount: number;
  edges: Repository[];
  pageInfo: {
    startCursor: string;
    endCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface TextProps {
  color?: 'textPrimary' | 'textSecondary' | 'primary';
  fontSize?: 'body' | 'subheading';
  fontWeight?: 'normal' | 'bold';
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
  testID?: string;
}

export interface UseRepositories {
  repositories?: Repositories;
  loading?: boolean;
  fetchMore?: () => void;
}

export type AuthStorageInstance = InstanceType<typeof AuthStorage>;
