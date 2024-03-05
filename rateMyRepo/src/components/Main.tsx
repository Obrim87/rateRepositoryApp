import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from '../theme';
import { Navigate, Route, Routes } from 'react-router-native';
import SignIn from './SignIn';
import Info from './Info';
import RepositorySingle from './RepositorySingle';
import ReviewForm from './ReviewForm';
import SignUpForm from './SignUpForm';
import { useQuery } from '@apollo/client';
import { GET_LOGGED_IN_USER } from '../graphql/queries';
import { useContext, useEffect } from 'react';
import MyReviews from './MyReviews';
import CurrentUserContext from '../contexts/CurrentUserContext';
// import useCurrentUser from '../hooks/useCurrentUser';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1
  }
});

const Main = () => {
  const { setCurrentUser } = useContext(CurrentUserContext);
  const { loading, data, error } = useQuery(GET_LOGGED_IN_USER, {
    variables: {
      includeReviews: true
    }
  });

  useEffect(() => {
    if (!loading) setCurrentUser(data);
    if (error) throw new Error(error.message);
  });

  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path='/' element={<RepositoryList />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signUp' element={<SignUpForm />} />
        <Route path='/createReview' element={<ReviewForm />} />
        <Route path='/myReviews' element={<MyReviews />} />
        <Route path='/info' element={<Info />} />
        <Route path='/repository/:repoId' element={<RepositorySingle />} />
        {/* Navigates to home if no path found */}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </View>
  );
};

export default Main;
