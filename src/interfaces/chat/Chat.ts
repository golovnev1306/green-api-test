export enum EChatMessageType {
  Outgoing = 'outgoing',
  Incoming = 'incoming',
}

export interface ChatMessage {
  idMessage?: string;
  type: EChatMessageType;
  timestamp: number;
  textMessage: string;
}
