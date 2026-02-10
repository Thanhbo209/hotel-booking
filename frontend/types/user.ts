export type UserRole = "USER" | "OWNER" | "ADMIN";

export interface UserType {
  _id: string;
  fullName: string;
  email: string;
  role: UserRole;
  bio?: string;
  phone?: string;
  avatarURL?: string;
}
