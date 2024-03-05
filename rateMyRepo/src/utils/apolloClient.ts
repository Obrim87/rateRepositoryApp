import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Constants from 'expo-constants';
import { setContext } from '@apollo/client/link/context';
import { AuthStorageInstance } from '../types';
import { relayStylePagination } from '@apollo/client/utilities';
// import { relayStylePagination } from '@apollo/client/utilities';

const apollo_uri = Constants.expoConfig?.extra?.apollo_uri;

const httpLink = createHttpLink({
  uri: apollo_uri
});

// use window.__APOLLO_CLIENT__.cache.data.data in console see Apollo cache
// relayStylePagination originally was not working as I was not updating the UI
// adding 'data' to the useEffect refreshed the UI when the data was updated by the cache update
// leaving the 'merge' code for future reference

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        repositories: relayStylePagination([
          'orderBy',
          'orderDirection',
          'searchKeyword'
        ])
        // {
        //   keyArgs: ['orderBy', 'orderDirection', 'searchKeyword'],
        //   merge: (existing, incoming) =>
        //   {
        //     try {
        //       if (existing) {
        //         return {
        //           ...incoming,
        //           edges: [...existing.edges, ...incoming.edges]
        //         };
        //       }
        //       return incoming;
        //     } catch (error) {
        //       console.log(`Error ${error}`);
        //     }
        //   }
        // }
      }
    },
    Repository: {
      fields: {
        reviews: relayStylePagination()
        // {
        //   merge: (existing, incoming) => {
        //     console.log('existing', existing);
        //     console.log('incoming', incoming);
        //     try {
        //       if (existing) {
        //         return {
        //           ...incoming,
        //           edges: [...existing.edges, ...incoming.edges]
        //         };
        //       }
        //       return incoming;
        //     } catch (error) {
        //       console.log(`Error ${error}`);
        //     }
        //   }
        // }
      }
    }
  }
});

const createApolloClient = (authStorage: AuthStorageInstance) => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : ''
        }
      };
    } catch (error) {
      console.log(error);
      return {
        headers
      };
    }
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache
  });
};

export default createApolloClient;
