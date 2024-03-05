import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground
  }
});

const AppBar = () => {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab label='Repositories' route='/' />
        {currentUser.me && (
          <AppBarTab label='Create a Review' route='/createReview' />
        )}
        {currentUser.me && <AppBarTab label='My Reviews' route='/myReviews' />}
        <AppBarTab
          label={!currentUser || !currentUser.me ? 'Sign In' : 'Sign Out'}
          route='/signin'
        />
        {!currentUser.me && <AppBarTab label='Sign Up' route='/signUp' />}
        <AppBarTab label='Info' route='/info' />
      </ScrollView>
    </View>
  );
};

export default AppBar;
