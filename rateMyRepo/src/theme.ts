import { Platform, TextStyle } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#24282e', // dark
    textSecondary: '#f7fafc', // light
    primary: '#0366d6', // light blue
    appBarBackground: '#24292e', // dark grey
    mainBackground: '#e1e4e8', // light grey
    error: '#d73a4a' // dark red
  },
  fontSizes: {
    body: 14,
    subheading: 16
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System'
    })
  },
  fontWeights: {
    normal: '400' as TextStyle['fontWeight'],
    bold: '700' as TextStyle['fontWeight']
  }
};

export default theme;
