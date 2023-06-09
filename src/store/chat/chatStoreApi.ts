import { chatStore } from './chatStore';
import { storeApiHandler } from '../_utils/storeApiHandler';
import { chatService } from '../../transport/services/chatService';
import {
  ChatMessage,
  EChatMessageType,
  ETypeWebhook,
} from '../../interfaces/chat/Chat';
import { toServerTimestamp } from '../../utils/date';

export const getChatHistory = (phone: string) => {
  const result = chatService.getChatHistory(phone);

  return storeApiHandler({
    result,
    store: chatStore,
    storeStatusProp: 'chatStatus',
    onSuccess: (responseData) => {
      chatStore.setState({ messageList: responseData.data });
    },
  });
};

export const sendChatMessage = (phone: string, message: string) => {
  const result = chatService.sendMessage(phone, message);

  return storeApiHandler({
    result,
    store: chatStore,
    storeStatusProp: 'messageSendStatus',
    onSuccess: (responseData) => {
      const messageList: ChatMessage[] = [
        {
          idMessage: responseData.data.idMessage,
          textMessage: message,
          timestamp: toServerTimestamp(Date.now()),
          type: EChatMessageType.Outgoing,
        },
        ...chatStore.getState().messageList,
      ];
      chatStore.setState({ messageList: messageList });
    },
    onError() {
      return void 0;
    },
  });
};

// eslint-disable-next-line prefer-const
let _do_request = false;

const receiveNotification = () => {
  const checkSeq = async () => {
    (async () => {
      try {
        let resData;
        while (
          (resData = (await chatService.receiveNotification()).data) != null
        ) {
          const messageList = chatStore.getState().messageList;
          const respMessageBody = resData.body;
          let addingMessageType: EChatMessageType | null = null;

          switch (respMessageBody.typeWebhook) {
            case ETypeWebhook.IncomingMessageReceived: {
              addingMessageType = EChatMessageType.Incoming;
              break;
            }
            case ETypeWebhook.OutgoingMessageReceived: {
              addingMessageType = EChatMessageType.Outgoing;
              break;
            }
          }

          if (addingMessageType != null) {
            chatStore.setState({
              messageList: [
                {
                  idMessage: respMessageBody.idMessage,
                  textMessage:
                    respMessageBody.messageData.textMessageData.textMessage,
                  type: addingMessageType,
                  timestamp: respMessageBody.timestamp,
                },
                ...messageList,
              ],
            });
          }

          return await chatService.deleteNotification(resData.receiptId);
        }
      } catch (e) {
        console.error(e);
      }
    })().then(() => {
      if (_do_request) {
        setTimeout(checkSeq, 1000);
      }
    });
  };

  checkSeq();
};

export const receiveNotificationStart = () => {
  _do_request = true;
  receiveNotification();
};

export const receiveNotificationStop = () => {
  _do_request = false;
};
