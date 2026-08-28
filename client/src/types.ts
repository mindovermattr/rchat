export type UserStatus = "online" | "offline" | "away";

export interface User {
  id: string;
  name: string;
  avatarColor: string;
  status: UserStatus;
}

export interface Chat {
  id: string;
  participantIds: string[];
  title?: string;
  lastMessageText: string;
  lastMessageAt: number;
  unread: number;
}

export type MessageStatus = "sent" | "read";

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  html: string;
  createdAt: number;
  status: MessageStatus;
}
