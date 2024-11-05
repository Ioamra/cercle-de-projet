import React, { createContext, ReactNode, useContext, useReducer } from 'react';

interface User {
  id: number;
  username: string;
  email: string;
  role: 'user' | 'admin';
  points: number;
}

interface AuthState {
  token: string | null;
  user: User | null;
}

type AuthAction = { type: 'SET_AUTH'; payload: { token: string; user: User } } | { type: 'LOGOUT' };

const initialState: AuthState = {
  token: null,
  user: null,
};

interface AuthContextProps {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_AUTH':
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
  }
  return context;
};
