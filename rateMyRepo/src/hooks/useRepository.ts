import { useEffect, useState } from 'react';
import { SingleViewRepository } from '../types';
import { GET_REPOSITORY } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useRepository = (repoId: string | undefined) => {
  const variables = {
    repositoryId: repoId,
    first: 5
  };
  const [repository, setRepository] = useState<SingleViewRepository>();
  const { data, loading, error, fetchMore } = useQuery(GET_REPOSITORY, {
    variables: variables,
    fetchPolicy: 'cache-first'
  });

  useEffect(() => {
    if (!loading) {
      setRepository(data.repository);
    }
    if (error) {
      throw new Error(error.message);
    }
  }, [loading, data]);

  const handleFetchMore = async () => {
    const canFetchMore =
      !loading && data.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) return;

    await fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor
      }
    });
  };

  return {
    repository: repository,
    fetchMore: handleFetchMore
  };
};

export default useRepository;
