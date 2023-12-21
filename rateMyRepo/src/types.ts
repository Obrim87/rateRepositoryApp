import { StyleProp, TextStyle } from 'react-native';

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
