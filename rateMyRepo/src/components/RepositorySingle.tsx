import { View, FlatList, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';
import useRepository from '../hooks/useRepository';

const styles = StyleSheet.create({
  separator: {
    height: 10
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositorySingle = () => {
  const { repoId } = useParams();
  const { repository, fetchMore } = useRepository(repoId);

  const onEndReached = async () => {
    fetchMore();
  };

  return (
    <View style={{ flex: 1 }}>
      {repository && (
        <RepositoryItem
          item={{ node: { ...repository } }}
          showGithubButton={true}
        />
      )}
      <FlatList
        data={repository ? repository.reviews.edges : []}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <ReviewItem review={item} repoOrReview='repo' />
        )}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

export default RepositorySingle;
