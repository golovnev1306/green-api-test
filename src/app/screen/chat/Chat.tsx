import { FC, useEffect, useRef } from 'react';
import './Chat.scss';
import { Screen } from '../../common/layouts/screen/Screen';
import {
  getChatHistory,
  receiveNotificationStart,
  receiveNotificationStop,
  sendChatMessage,
} from '../../../store/chat/chatStoreApi';
import { useNavigate, useParams } from 'react-router-dom';
import { useChatStore } from '../../../store/chat/chatStore';
import { PageSpinner } from '../../common/page-spinner/PageSpinner';
import { useForm } from 'react-hook-form';
import { Input } from '../../common/input/Input';
import { Button } from '../../common/button/Button';
import { MessageList } from './message-list/MessageList';

interface IChatForm {
  message: string;
}

export const Chat: FC = () => {
  const { chatPhone } = useParams<{ chatPhone: string }>();
  const messageList = useChatStore((state) => state.messageList);
  const chatStatus = useChatStore((state) => state.chatStatus);
  const messageSendStatus = useChatStore((state) => state.messageSendStatus);
  const clearMessageList = useChatStore((state) => state.clearMessageList);

  const { register, handleSubmit, reset, watch } = useForm<IChatForm>();

  const isLoadingChat = chatStatus === 'loading';
  const isLoadingMessageSend = messageSendStatus === 'loading';

  const navigate = useNavigate();

  const currentMessage = watch('message');

  useEffect(() => {
    if (chatPhone != null) {
      getChatHistory(chatPhone).then(() => {
        receiveNotificationStart();
      });

      return () => {
        receiveNotificationStop();
        clearMessageList();
      };
    }
  }, []);

  const scrollBottomChat = () => {
    if (scrollContainerRef.current == null) {
      return;
    }
    scrollContainerRef.current.scrollTop =
      scrollContainerRef.current.scrollHeight;
  };

  useEffect(() => {
    scrollBottomChat();
  }, [messageList]);

  const submit = handleSubmit((validated) => {
    if (chatPhone != null) {
      sendChatMessage(chatPhone, validated.message).then(() => reset());
    }
  });

  const closeChatHandler = () => {
    navigate('/');
  };

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <Screen className="single--chat">
      <header className={'chat-header'}>
        <span>
          Чат с <strong>+{chatPhone}</strong>
        </span>{' '}
        <Button onClick={closeChatHandler} colorType={'secondary'}>
          Выйти из чата
        </Button>
      </header>
      <div className={'chat-list-scrollable'}>
        <div ref={scrollContainerRef} className={'chat-list-wrap'}>
          {messageList.length > 0 && (
            <MessageList
              className={'chat-message-list'}
              messageList={messageList}
              currentMessage={currentMessage}
            />
          )}
          {messageList.length === 0 && !isLoadingChat && (
            <span className={'chat-empty'}>
              Список сообщений пуст, начните чат с пользователем!
            </span>
          )}
        </div>
      </div>

      {isLoadingChat && <PageSpinner />}

      <footer className={'chat-footer'}>
        <form onSubmit={submit} className={'chat-footer-form'}>
          <Input
            placeholder={'Введите сообщение'}
            autoComplete="off"
            className={'chat-footer-input'}
            disableOnChange={isLoadingMessageSend}
            autoFocus={true}
            {...register('message', { required: true })}
          />
          <Button colorType={'secondary'} disabled={isLoadingMessageSend}>
            Отправить
          </Button>
        </form>
      </footer>
    </Screen>
  );
};
