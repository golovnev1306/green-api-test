import createHook from 'zustand';
import createStore from 'zustand/vanilla';
import { ChatMessage } from '../../interfaces/chat/Chat';
import { ScreenStatus } from '../../interfaces/_common/common';

export interface IAuthStore {
  messageList: ChatMessage[];
  chatStatus: ScreenStatus;
  messageSendStatus: ScreenStatus;
  clearMessageList: () => void;
}

export const chatStore = createStore<IAuthStore>((setState) => ({
  messageList: [],
  chatStatus: 'ok',
  messageSendStatus: 'ok',
  clearMessageList: () => {
    setState({ messageList: [] });
  },
}));

export const useChatStore = createHook(chatStore);
