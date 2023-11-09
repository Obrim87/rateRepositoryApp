import { TextStyle } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#24282e', // dark
    textSecondary: '#f7fafc', // light
    primary: '#0366d6', // light blue
    appBarBackground: '#24292e' // dark grey
  },
  fontSizes: {
    body: 14,
    subheading: 16
  },
  fonts: {
    main: 'System'
  },
  fontWeights: {
    normal: '400' as TextStyle['fontWeight'],
    bold: '700' as TextStyle['fontWeight']
  }
};

export default theme;
