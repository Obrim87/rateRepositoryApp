import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    backgroundColor: theme.colors.appBarBackground
  },
  button: {
    borderRadius: 5
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab label='Repositories' />
      <AppBarTab label='Contact' />
      <AppBarTab label='Info' />
    </View>
  );
};

export default AppBar;
