interface MessageObj {
  conv_id: number;
  friend: {
    username: string;
    user_id: number;
  };
  data: {
    createdAt: string;
    message: string;
    user_id: number;
  }[];
}

export default MessageObj;
