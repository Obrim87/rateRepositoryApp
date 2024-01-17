import { createContext } from 'react';
import { AuthStorageInstance } from '../types';

const AuthStorageContext = createContext<AuthStorageInstance>(
  {} as AuthStorageInstance
);

export default AuthStorageContext;
