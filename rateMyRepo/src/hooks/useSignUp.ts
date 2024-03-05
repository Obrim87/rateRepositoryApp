import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';
import { SignInProps } from '../types';

const useSignUp = () => {
  const [mutate] = useMutation(CREATE_USER);

  const signUp = async ({ username, password }: SignInProps) => {
    await mutate({
      variables: {
        user: {
          username: username,
          password: password
        }
      }
    });
  };

  return [signUp];
};

export default useSignUp;
