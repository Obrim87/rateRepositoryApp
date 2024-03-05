import { Alert, Pressable, StyleSheet, View } from 'react-native';
import { Text } from './Text';
import { RepoOrReview, Review } from '../types';
import theme from '../theme';
import { formatDate } from '../utils';
import { useNavigate } from 'react-router-native';
import useDeleteReview from '../hooks/useDeleteReview';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  rating: {
    width: 40,
    height: 40,
    borderColor: theme.colors.primary,
    borderRadius: 20,
    borderStyle: 'solid',
    borderWidth: 2,
    paddingTop: 10,
    margin: 10
  },
  name: {
    marginTop: 5
  },
  date: {
    marginTop: 5,
    color: 'grey'
  },
  text: {
    marginTop: 5,
    marginBottom: 10,
    marginRight: 15
  }
});

const ReviewItem = ({
  review,
  repoOrReview
}: {
  review: Review;
  repoOrReview: RepoOrReview;
}) => {
  const navigate = useNavigate();
  const [deleteReview] = useDeleteReview();

  const deleteAlert = () => {
    Alert.alert(
      'Delete Review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          onPress: () => deleteReview(review.node.id)
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.rating}>
        <Text
          color='primary'
          fontWeight='bold'
          style={{ textAlign: 'center', alignItems: 'center' }}>
          {review.node.rating}
        </Text>
      </View>
      <View style={{ flexShrink: 1 }}>
        <Text fontWeight='bold' style={styles.name}>
          {repoOrReview === 'repo'
            ? review.node.user.username
            : review.node.repository.fullName}
        </Text>
        <Text style={styles.date}>{formatDate(review.node.createdAt)}</Text>
        <Text style={styles.text}>{review.node.text}</Text>
        <View style={{ flexDirection: 'row' }}>
          {repoOrReview === 'review' && (
            <>
              <Pressable
                onPress={() => {
                  navigate(`/repository/${review.node.repositoryId}`);
                }}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? 'white' : theme.colors.primary,
                    alignItems: 'center',
                    margin: 10,
                    padding: 15,
                    borderRadius: 3,
                    shadowRadius: 5,
                    width: 150
                  }
                ]}>
                {({ pressed }) => (
                  <Text
                    color={pressed ? 'textPrimary' : 'textSecondary'}
                    fontWeight='bold'>
                    View Repository
                  </Text>
                )}
              </Pressable>
              <Pressable
                onPress={deleteAlert}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? 'white' : theme.colors.error,
                    alignItems: 'center',
                    margin: 10,
                    padding: 15,
                    borderRadius: 3,
                    shadowRadius: 5,
                    width: 150
                  }
                ]}>
                {({ pressed }) => (
                  <Text
                    color={pressed ? 'textPrimary' : 'textSecondary'}
                    fontWeight='bold'>
                    Delete Review
                  </Text>
                )}
              </Pressable>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default ReviewItem;
