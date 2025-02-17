export interface User {
  _id: string;
  role: 'user' | 'admin';
  email: string;
  username: string;
  fullName: string;
  gender: string;
  createdAt: string;
  updatedAt: string;
}
