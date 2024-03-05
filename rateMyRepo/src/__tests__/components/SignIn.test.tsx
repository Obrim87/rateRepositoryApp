import {
  render,
  screen,
  waitFor,
  userEvent
} from '@testing-library/react-native';
import { SignInContainer } from '../../components/SignIn';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('call onSubmit function with correct arguments when a valid form is submitted', async () => {
      const signIn = jest.fn();
      const data = { me: null };
      const handleSignOut = jest.fn();
      const credentials = userEvent.setup();

      render(
        <SignInContainer
          signIn={signIn}
          data={data}
          handleSignOut={handleSignOut}
        />
      );

      await credentials.type(screen.getByPlaceholderText('Username'), 'kalle');
      await credentials.type(
        screen.getByPlaceholderText('Password'),
        'password'
      );
      await credentials.press(screen.getByText('Sign In'));

      await waitFor(() => {
        expect(signIn).toHaveBeenCalledTimes(1);
      });
      expect(signIn.mock.calls[0][0].username).toBe('kalle');
      expect(signIn.mock.calls[0][0].password).toBe('password');
    });
  });
});
