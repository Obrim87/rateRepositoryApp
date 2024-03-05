import { NativeRouter } from 'react-router-native';
import { StatusBar } from 'expo-status-bar';
import { ApolloProvider } from '@apollo/client';

import Main from './src/components/Main';
import createApolloClient from './src/utils/apolloClient';
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';
import { useState } from 'react';
import { CurrentUser } from './src/types';
import CurrentUserContext from './src/contexts/CurrentUserContext';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const App = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>({ me: {} });

  return (
    <>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
            <AuthStorageContext.Provider value={authStorage}>
              <Main />
            </AuthStorageContext.Provider>
          </CurrentUserContext.Provider>
        </ApolloProvider>
      </NativeRouter>
      <StatusBar style='auto' />
    </>
  );
};

export default App;
