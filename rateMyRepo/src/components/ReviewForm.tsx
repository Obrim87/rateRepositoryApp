import { Pressable, View } from 'react-native';
import { Text } from './Text';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import * as yup from 'yup';
import { CreateReviewValues } from '../types';
import useCreateReview from '../hooks/useCreateReview';
import { useNavigate } from 'react-router-native';

const validationSchema = yup.object().shape({
  repoOwnerName: yup.string().required('Repository owner name is required'),
  repoName: yup.string().required('Repository name is required'),
  repoRating: yup
    .number()
    .min(0, 'Rating must be more than 0')
    .max(100, 'Rating must be less than 100')
    .required('Rating is required')
    .typeError('Please enter numbers only')
});

const initialValues: CreateReviewValues = {
  repoOwnerName: '',
  repoName: '',
  repoRating: '',
  repoReview: ''
};

const ReviewForm = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        try {
          const repoId = await createReview(values);
          navigate(`/repository/${repoId}`, { replace: true });
        } catch (error) {
          console.log(error);
        }
      }}
      validationSchema={validationSchema}>
      {(props) => (
        <View>
          <FormikTextInput
            name='repoOwnerName'
            placeholder='Repository owner name'
            value={props.values.repoOwnerName}
            onChange={props.handleChange}
          />
          <FormikTextInput
            name='repoName'
            placeholder='Repository name'
            value={props.values.repoName}
            onChange={props.handleChange}
          />
          <FormikTextInput
            name='repoRating'
            placeholder='Rating between 0 and 100'
            value={props.values.repoRating}
            onChange={props.handleChange}
          />
          <FormikTextInput
            name='repoReview'
            placeholder='Review'
            value={props.values.repoReview}
            onChange={props.handleChange}
            multiline={true}
          />
          <Pressable
            onPress={() => props.handleSubmit()}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? 'white' : theme.colors.primary,
                alignItems: 'center',
                margin: 10,
                padding: 15,
                borderRadius: 3,
                shadowRadius: 5
              }
            ]}>
            {({ pressed }) => (
              <Text
                color={pressed ? 'textPrimary' : 'textSecondary'}
                fontWeight='bold'>
                Create a Review
              </Text>
            )}
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default ReviewForm;
