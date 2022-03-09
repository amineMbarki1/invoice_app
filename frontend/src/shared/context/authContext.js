import { createContext } from 'react';

const AuthContext = createContext({
  isLoggedIn: null,
  userId: null,
  token: null,
  login: () => {},
  logout: () => {},
});

export default AuthContext;
