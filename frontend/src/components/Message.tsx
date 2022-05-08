import React from 'react';
import { Alert } from 'react-bootstrap';

type MessageProps = {
  variant?: string;
  children?: React.ReactNode;
};

const Message: React.FC<MessageProps> = ({ variant = 'blue', children }) => (
  <Alert {...{ variant }}>{children}</Alert>
);
export default Message;
