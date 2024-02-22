import { User, userResponse } from './User';

export interface AuthProvider {
  token: string | null;
  userInfo: User | null;
  signOut: () => void;
  signIn: (dataUser: userResponse) => void;
  searchValue: string;
  onSearchValue: (value: string) => void;
}

export interface FormLogin {
  identifier: string;
  password: string;
}
