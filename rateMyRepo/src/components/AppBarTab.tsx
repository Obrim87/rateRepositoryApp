import { Pressable, StyleSheet } from 'react-native';
import { Text } from './Text';
import theme from '../theme';
import { useNavigate } from 'react-router-native';

interface AppBarTabProps {
  label: string;
  route: string;
}

const styles = StyleSheet.create({
  tabs: {
    padding: 15
  },
  button: {
    borderRadius: 4
  }
});

const AppBarTab = ({ label, route }: AppBarTabProps) => {
  const navigate = useNavigate();

  return (
    <Pressable
      onPress={() => {
        navigate(route);
      }}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? 'white' : theme.colors.appBarBackground
        },
        styles.button
      ]}>
      {({ pressed }) => (
        <Text
          style={styles.tabs}
          fontWeight='bold'
          color={pressed ? 'textPrimary' : 'textSecondary'}>
          {label}
        </Text>
      )}
    </Pressable>
  );
};

export default AppBarTab;
