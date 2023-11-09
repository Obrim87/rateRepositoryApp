import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { Text } from './Text';
import repositories from '../data/repositories';

const styles = StyleSheet.create({
  separator: {
    height: 10
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  return (
    <View>
      <FlatList
        data={repositories}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <RepositoryItem item={item} />}
      />
      <Text>hello</Text>
    </View>
  );
};

export default RepositoryList;
