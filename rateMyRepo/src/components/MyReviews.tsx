import { FlatList, View } from 'react-native';
import ReviewItem from './ReviewItem';
import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

const MyReviews = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const data = currentUser.me.reviews?.edges;

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ReviewItem review={item} repoOrReview='review' />
        )}
      />
    </View>
  );
};

export default MyReviews;
