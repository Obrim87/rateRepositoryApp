import {
  Text as NativeText,
  StyleProp,
  StyleSheet,
  TextStyle
} from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  defaultText: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary
  },
  colorPrimary: {
    color: theme.colors.primary
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold
  }
});

interface TextProps {
  color?: 'textPrimary' | 'textSecondary' | 'primary';
  fontSize?: 'body' | 'subheading';
  fontWeight?: 'normal' | 'bold';
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
}

export const Text = ({
  color,
  fontSize,
  fontWeight,
  style,
  ...props
}: TextProps) => {
  const textStyle = [
    styles.defaultText,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontWeight === 'bold' && styles.fontWeightBold,
    style
  ];

  return <NativeText style={textStyle} {...props} />;
};

export const SubHeading = ({ ...props }) => {
  return <Text fontSize='subheading' fontWeight='bold' {...props} />;
};
