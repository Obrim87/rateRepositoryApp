import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';
import { GET_LOGGED_IN_USER } from '../graphql/queries';

const useDeleteReview = () => {
  const [mutation] = useMutation(DELETE_REVIEW, {
    refetchQueries: [GET_LOGGED_IN_USER]
  });

  const deleteReview = (id: string) => {
    mutation({
      variables: {
        deleteReviewId: id
      }
    });
  };

  return [deleteReview];
};

export default useDeleteReview;
