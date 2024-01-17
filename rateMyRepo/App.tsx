import { NativeRouter } from 'react-router-native';
import { StatusBar } from 'expo-status-bar';
import { ApolloProvider } from '@apollo/client';

import Main from './src/components/Main';
import createApolloClient from './src/utils/apolloClient';
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const App = () => {
  return (
    <>
      <NativeRouter>
        <AuthStorageContext.Provider value={authStorage}>
          <ApolloProvider client={apolloClient}>
            <Main />
          </ApolloProvider>
        </AuthStorageContext.Provider>
      </NativeRouter>
      <StatusBar style='auto' />
    </>
  );
};

export default App;
