import { FC } from 'react';
import './Message.scss';
import { mergeClasses } from '../../../../utils/classnames';
import {
  getTimeFromTimestamp,
  toClientTimestamp,
} from '../../../../utils/date';
import { ChatMessage } from '../../../../interfaces/chat/Chat';

interface IMessageProps extends ChatMessage {
  loading?: boolean;
}

export const Message: FC<IMessageProps> = ({ loading, ...message }) => {
  return (
    <li
      className={mergeClasses(
        'single--message',
        message.type,
        loading && 'loading',
      )}
      key={message.idMessage}
    >
      {message.textMessage}
      <time>{getTimeFromTimestamp(toClientTimestamp(message.timestamp))}</time>
    </li>
  );
};
