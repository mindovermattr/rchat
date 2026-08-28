import { action, atom, computed } from "@reatom/core";
import type { Chat, Message, User } from "../types";
import {
  CURRENT_USER_ID,
  mockChats,
  mockMessages,
  mockUsers,
} from "../mocks/data";

export const currentUserIdAtom = atom(CURRENT_USER_ID, "currentUserIdAtom");

export const usersAtom = atom(mockUsers, "usersAtom");
export const userByIdAtom = computed(() => {
  const map: Record<string, User> = {};
  for (const u of usersAtom()) map[u.id] = u;
  return map;
}, "userByIdAtom");

export const chatsAtom = atom(mockChats, "chatsAtom");
export const messagesAtom = atom(mockMessages, "messagesAtom");

export const selectedChatIdAtom = atom<string | null>(
  mockChats[0]?.id ?? null,
  "selectedChatIdAtom",
);
export const searchQueryAtom = atom("", "searchQueryAtom");

export const selectedChatAtom = computed(
  () => chatsAtom().find((c) => c.id === selectedChatIdAtom()) ?? null,
  "selectedChatAtom",
);

export const filteredChatsAtom = computed(() => {
  const q = searchQueryAtom().trim().toLowerCase();
  const chats = chatsAtom();
  const users = userByIdAtom();
  if (!q) return chats;
  return chats.filter((c) => {
    const title = chatTitle(c, users);
    return (
      title.toLowerCase().includes(q) ||
      c.lastMessageText.toLowerCase().includes(q)
    );
  });
}, "filteredChatsAtom");

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

export const selectChat = action((id: string) => {
  selectedChatIdAtom.set(id);
  chatsAtom.set(
    chatsAtom().map((c) => (c.id === id ? { ...c, unread: 0 } : c)),
  );
}, "selectChat");

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
  chatsAtom.set(
    chatsAtom().map((c) =>
      c.id === chatId
        ? { ...c, lastMessageText: text, lastMessageAt: message.createdAt }
        : c,
    ),
  );
}, "sendMessage");

export function chatTitle(chat: Chat, users: Record<string, User>): string {
  if (chat.title) return chat.title;
  const others = chat.participantIds
    .map((id) => users[id])
    .filter((u): u is User => Boolean(u));
  return others.length > 1
    ? `Чат (${others.length})`
    : (others[0]?.name ?? "Диалог");
}
