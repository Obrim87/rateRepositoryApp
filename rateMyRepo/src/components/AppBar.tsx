import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import { GET_ME } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground
  }
});

const AppBar = () => {
  const { data } = useQuery(GET_ME);
  console.log('data', data);

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab label='Repositories' route='/' />
        <AppBarTab label={!data.me ? 'Sign In' : 'Sign Out'} route='/signin' />
        <AppBarTab label='Info' route='/info' />
      </ScrollView>
    </View>
  );
};

export default AppBar;
