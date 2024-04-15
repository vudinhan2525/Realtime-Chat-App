interface IUser {
  user_id?: number;
  username: string;
  email: string;
  password: string;
  confirmPassword: string | undefined;
  isActive?: boolean;
  lastActive?: Date;
}
export default IUser;
