import { createContext } from 'react';
import { CurrentUserContextType } from '../types';

const CurrentUserContext = createContext<CurrentUserContextType>(
  {} as CurrentUserContextType
);

export default CurrentUserContext;
