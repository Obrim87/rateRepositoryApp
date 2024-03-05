import { Pressable, View } from 'react-native';
import { Text } from './Text';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import * as yup from 'yup';
import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

const validationSchema = yup.object().shape({
  username: yup.string().min(5).max(30).required('Username is required'),
  password: yup.string().min(5).max(30).required('Password is required'),
  confirmPassword: yup
    .string()
    .test('passwords-match', 'Passwords must match', (value, context) => {
      return context.parent.password === value;
    })
});

const initialValues = {
  username: '',
  password: '',
  confirmPassword: ''
};

const SignUpForm = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        console.log(values);
        try {
          await signUp(values);
          await signIn(values);
          navigate('/');
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
          <FormikTextInput
            name='confirmPassword'
            placeholder='Confirm Password'
            value={props.values.confirmPassword}
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
                Sign Up
              </Text>
            )}
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default SignUpForm;
