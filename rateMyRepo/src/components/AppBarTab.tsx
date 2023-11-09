import { Pressable, StyleSheet } from 'react-native';
import { Text } from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  tabs: {
    justifyContent: 'center',
    padding: 20
  },
  button: {
    borderRadius: 5
  }
});

const AppBarTab = ({ label }: { label: string }) => {
  return (
    <Pressable
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
