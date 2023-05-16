import { getUrlWithInstanceData, request } from '../index';
import { EChatMessageType, ETypeWebhook } from '../../interfaces/chat/Chat';

interface ChatMessageDto {
  idMessage: string;
  type: EChatMessageType;
  timestamp: number;
  textMessage: string;
}

type GetChatHistoryRes = ChatMessageDto[];
interface SendMessageRes {
  idMessage: string;
}

interface IReceiveNotificationRes {
  receiptId: string;
  body: {
    typeWebhook: ETypeWebhook;
    timestamp: number;
    idMessage: string;
    messageData: {
      textMessageData: {
        textMessage: string;
      };
    };
  };
}

export const chatService = {
  getChatHistory(phone: string) {
    return request.post<GetChatHistoryRes>(
      getUrlWithInstanceData('GetChatHistory'),
      {
        chatId: `${phone}@c.us`,
        count: 10,
      },
    );
  },

  sendMessage(phone: string, message: string) {
    return request.post<SendMessageRes>(getUrlWithInstanceData('SendMessage'), {
      chatId: `${phone}@c.us`,
      message,
    });
  },

  receiveNotification() {
    return request.get<IReceiveNotificationRes | null>(
      getUrlWithInstanceData('ReceiveNotification'),
    );
  },

  deleteNotification(receiptId: string) {
    return request.delete(
      getUrlWithInstanceData('DeleteNotification') + `/${receiptId}`,
    );
  },
};
