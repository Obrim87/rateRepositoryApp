import { useState, useEffect } from 'react';
import { UseRepositories } from '../types';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useRepositories = (): UseRepositories => {
  const [repositories, setRepositories] = useState();
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network'
  });

  useEffect(() => {
    if (!loading) {
      setRepositories(data.repositories.edges);
    }
    if (error) {
      throw new Error(error.message);
    }
  }, [loading]);

  return { repositories, loading };
};

export default useRepositories;
