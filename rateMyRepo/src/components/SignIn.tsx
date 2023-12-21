import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import { View, Pressable } from 'react-native';
import theme from '../theme';
import { Text } from './Text';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required')
});

const SignIn = () => {
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={(values) => {
        console.log(values);
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
  );
};

export default SignIn;
