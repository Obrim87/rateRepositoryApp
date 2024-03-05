import { SortTypes, UseRepositories } from '../types';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

const determineSortType = (sortType: SortTypes | undefined) => {
  switch (sortType) {
    case 'Highest Rated Repositories':
      return { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' };
    case 'Lowest Rated Repositories':
      return { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' };
    default:
      return {};
  }
};

const sortOrSearch = (sortType?: SortTypes, searchKeyword?: string) => {
  if (sortType && !searchKeyword) {
    return determineSortType(sortType);
  } else if (!sortType && searchKeyword) {
    return { searchKeyword: searchKeyword };
  } else if (sortType && searchKeyword) {
    return { ...determineSortType(sortType), searchKeyword: searchKeyword };
  } else {
    return {};
  }
};

const useRepositories = (
  first?: number,
  sortType?: SortTypes,
  searchKeyword?: string
): UseRepositories => {
  const variables = {
    first: first,
    ...sortOrSearch(sortType, searchKeyword)
  };
  const [repositories, setRepositories] = useState();
  const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-first',
    variables: variables
  });

  useEffect(() => {
    if (!loading) {
      setRepositories(data.repositories);
    }
    if (error) {
      throw new Error(error.message);
    }
  }, [loading, data]);

  const handleFetchMore = async () => {
    const canFetchMore = !loading && data.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) return;

    await fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor
      }
    });
  };

  return {
    repositories: repositories,
    fetchMore: handleFetchMore
  };
};

export default useRepositories;
