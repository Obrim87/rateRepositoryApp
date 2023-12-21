import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground
    // alignItems: 'center'
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab label='Repositories' route='/' />
        <AppBarTab label='Sign In' route='/signin' />
        <AppBarTab label='Info' route='/' />
      </ScrollView>
    </View>
  );
};

export default AppBar;
