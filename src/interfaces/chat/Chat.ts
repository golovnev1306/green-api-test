export enum EChatMessageType {
  Outgoing = 'outgoing',
  Incoming = 'incoming',
}

export enum ETypeWebhook {
  IncomingMessageReceived = 'incomingMessageReceived',
  OutgoingMessageReceived = 'outgoingMessageReceived',
}

export interface ChatMessage {
  idMessage?: string;
  type: EChatMessageType;
  timestamp: number;
  textMessage: string;
}
