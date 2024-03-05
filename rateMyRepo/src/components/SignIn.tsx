import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import { View, Pressable } from 'react-native';
import theme from '../theme';
import { Text, SubHeading } from './Text';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useApolloClient } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';
import { SignInContainerProps } from '../types';
import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required')
});

export const SignInContainer = ({
  signIn,
  data,
  handleSignOut
}: SignInContainerProps) => {
  return (
    <>
      {!data.me ? (
        <Formik
          initialValues={{ username: '', password: '' }}
          onSubmit={async ({ username, password }) => {
            console.log(username, password);
            try {
              await signIn({ username, password });
            } catch (error) {
              console.log(error);
            }
          }}
          validationSchema={validationSchema}>
          {(props) => (
            <View>
              <FormikTextInput
                name='username'
                placeholder='Username'
                value={props.values.username}
                onChange={props.handleChange}
              />
              <FormikTextInput
                name='password'
                placeholder='Password'
                value={props.values.password}
                onChange={props.handleChange}
                secureTextEntry={true}
              />
              <Pressable
                onPress={() => props.handleSubmit()}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? 'white' : theme.colors.primary,
                    alignItems: 'center',
                    margin: 10,
                    padding: 15,
                    borderRadius: 3,
                    shadowRadius: 5
                  }
                ]}>
                {({ pressed }) => (
                  <Text
                    color={pressed ? 'textPrimary' : 'textSecondary'}
                    fontWeight='bold'>
                    Sign In
                  </Text>
                )}
              </Pressable>
            </View>
          )}
        </Formik>
      ) : (
        <View>
          <SubHeading
            color='textPrimary'
            fontWeight='bold'
            style={{ textAlign: 'center', margin: 15 }}>
            You are currently signed in as {data.me.username}.
          </SubHeading>
          <Pressable
            onPress={handleSignOut}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? 'white' : theme.colors.primary,
                alignItems: 'center',
                margin: 10,
                padding: 15,
                borderRadius: 3,
                shadowRadius: 5
              }
            ]}>
            {({ pressed }) => (
              <Text
                color={pressed ? 'textPrimary' : 'textSecondary'}
                fontWeight='bold'>
                Sign Out
              </Text>
            )}
          </Pressable>
        </View>
      )}
    </>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const { currentUser } = useContext(CurrentUserContext);

  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const handleSignOut = () => {
    authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <SignInContainer
      signIn={signIn}
      data={currentUser}
      handleSignOut={handleSignOut}
    />
  );
};

export default SignIn;
