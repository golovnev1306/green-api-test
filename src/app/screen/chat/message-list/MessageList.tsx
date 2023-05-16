import { FC, useMemo } from 'react';
import './MessageList.scss';
import { toServerTimestamp } from '../../../../utils/date';
import {
  ChatMessage,
  EChatMessageType,
} from '../../../../interfaces/chat/Chat';
import { useChatStore } from '../../../../store/chat/chatStore';
import { Message } from '../message/Message';
import { mergeClasses } from '../../../../utils/classnames';

interface IMessageListProps {
  messageList: ChatMessage[];
  currentMessage: string;
  className?: string;
}

export const MessageList: FC<IMessageListProps> = ({
  messageList,
  currentMessage,
  className,
}) => {
  const messageSendStatus = useChatStore((state) => state.messageSendStatus);

  const isLoadingMessageSend = messageSendStatus === 'loading';

  const processedMessageList = useMemo(() => {
    const uniqueMessageList = Array.from(
      new Map(
        messageList.map((message) => [message.idMessage, message]),
      ).values(),
    );

    return uniqueMessageList
      .filter((message) => message.idMessage != null)
      .sort((a, b) => {
        if (a.timestamp > b.timestamp) {
          return 1;
        } else {
          return -1;
        }
      });
  }, [messageList]);

  return (
    <ul className={mergeClasses('single--message-list', className)}>
      {processedMessageList.map((message) => {
        return <Message key={message.idMessage} {...message} />;
      })}
      {isLoadingMessageSend && (
        <Message
          key={'__sending-message__'}
          loading={isLoadingMessageSend}
          type={EChatMessageType.Outgoing}
          timestamp={toServerTimestamp(Date.now())}
          textMessage={currentMessage}
          idMessage={'__sending-message-id__'}
        />
      )}
    </ul>
  );
};
