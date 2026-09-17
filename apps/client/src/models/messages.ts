import { action, atom, computed } from "@reatom/core";
import { mockMessages } from "../mocks/data";
import type { Message, User } from "../types";
import { chatsAtom, selectedChatAtom, selectedChatIdAtom } from "./chats";
import { currentUserIdAtom, userByIdAtom } from "./users";

export const messagesAtom = atom(mockMessages, "messagesAtom");

export const selectedMessagesAtom = computed(() => {
  const chatId = selectedChatIdAtom();

  if (!chatId) return [];

  return messagesAtom()
    .filter((m) => m.chatId === chatId)
    .sort((a, b) => a.createdAt - b.createdAt);
}, "selectedMessagesAtom");

export const chatInterlocutorsAtom = computed(() => {
  const chat = selectedChatAtom();
  if (!chat) return [];

  const me = currentUserIdAtom();
  const users = userByIdAtom();

  return chat.participantIds
    .filter((id) => id !== me)
    .map((id) => users[id])
    .filter(Boolean) as User[];
}, "chatInterlocutorsAtom");

export const sendMessage = action((html: string) => {
  const chatId = selectedChatIdAtom();
  if (!chatId) return;

  const text = html.replace(/<[^>]*>/g, "").trim();
  if (!text) return;

  const message: Message = {
    id: `m-${Date.now()}`,
    chatId,
    senderId: currentUserIdAtom(),
    html,
    createdAt: Date.now(),
    status: "sent",
  };
  messagesAtom.set([...messagesAtom(), message]);
  chatsAtom.set(chatsAtom().map((c) => (c.id === chatId ? { ...c, lastMessageText: text, lastMessageAt: message.createdAt } : c)));
}, "sendMessage");
