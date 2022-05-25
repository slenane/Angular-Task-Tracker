import { User } from "./user.model";

export interface Auth {
  user?: User;
  token?: string;
  isLoggedIn: boolean;
  isLoading: boolean;
  errorMessage: string;
  hasError: boolean;
}
