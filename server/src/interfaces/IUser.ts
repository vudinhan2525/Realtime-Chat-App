interface IUser {
  user_id?: number;
  username: string;
  email: string;
  password: string;
  confirmPassword: string | undefined;
}
export default IUser;
