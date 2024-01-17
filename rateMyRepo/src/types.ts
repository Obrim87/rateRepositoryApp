import { StyleProp, TextStyle } from 'react-native';
import AuthStorage from './utils/authStorage';

export interface SignInProps {
  username: string;
  password: string;
}

export interface Repositories {
  node: {
    id: string;
    fullName: string;
    description: string;
    language: string;
    forksCount: number;
    stargazersCount: number;
    ratingAverage: number;
    reviewCount: number;
    ownerAvatarUrl: string;
  };
}

export interface Repository {
  id: string;
  fullName: string;
  description: string;
  language: string;
  forksCount: number;
  stargazersCount: number;
  ratingAverage: number;
  reviewCount: number;
  ownerAvatarUrl: string;
}

export interface TextProps {
  color?: 'textPrimary' | 'textSecondary' | 'primary';
  fontSize?: 'body' | 'subheading';
  fontWeight?: 'normal' | 'bold';
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
}

export interface UseRepositories {
  repositories?: Repositories[];
  loading: boolean;
}

export type AuthStorageInstance = InstanceType<typeof AuthStorage>;
