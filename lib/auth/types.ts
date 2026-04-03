export interface CurrentUser {
  id: string;
  name: string | null;
  email: string | null;
  isAnonymous: boolean;
}
