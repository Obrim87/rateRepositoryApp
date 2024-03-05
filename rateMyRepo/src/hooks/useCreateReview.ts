import { useMutation } from '@apollo/client';
import { CreateReviewValues } from '../types';
import { CREATE_REVIEW } from '../graphql/mutations';
import { GET_LOGGED_IN_USER } from '../graphql/queries';

const useCreateReview = () => {
  const [mutate] = useMutation(CREATE_REVIEW, {
    refetchQueries: [GET_LOGGED_IN_USER]
  });

  const createReview = async (props: CreateReviewValues) => {
    const { data } = await mutate({
      variables: {
        review: {
          ownerName: props.repoOwnerName,
          rating: Number(props.repoRating),
          repositoryName: props.repoName,
          text: props.repoReview
        }
      }
    });
    return data.createReview.repositoryId;
  };

  return [createReview];
};

export default useCreateReview;
