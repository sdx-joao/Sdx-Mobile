export type MobileUser = {
  id: string;
  username: string;
  fullName: string | null;
  role: string;
  department: string | null;
};

export type LoginResponse = {
  token: string;
  user: MobileUser;
};
