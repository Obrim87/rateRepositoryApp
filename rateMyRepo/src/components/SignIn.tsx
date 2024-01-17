import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import { View, Pressable } from 'react-native';
import theme from '../theme';
import { Text } from './Text';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useApolloClient, useQuery } from '@apollo/client';
import { GET_ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required')
});

const SignIn = () => {
  const [signIn] = useSignIn();
  const { data } = useQuery(GET_ME);
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const handleSignOut = () => {
    authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

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
      )}
    </>
  );
};

export default SignIn;
