export interface User {
  _id: string;
  role: 'user' | 'admin';
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}
