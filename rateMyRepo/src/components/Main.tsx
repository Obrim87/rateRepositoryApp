import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import { SubHeading } from './Text';
import AppBar from './AppBar';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1
  }
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <SubHeading>Rate Repository Application</SubHeading>
      <RepositoryList />
    </View>
  );
};

export default Main;
