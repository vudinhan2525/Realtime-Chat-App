interface IMessage {
  msg_id?: number;
  conv_id: number;
  user_id: number;
  message: string;
}
export default IMessage;
