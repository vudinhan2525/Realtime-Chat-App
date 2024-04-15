interface MessageObj {
  conv_id: number;
  friend: {
    username: string;
    user_id: number;
    isActive: boolean;
    lastActive: string;
  };
  data: {
    createdAt: string;
    message: string;
    user_id: number;
  }[];
}

export default MessageObj;
