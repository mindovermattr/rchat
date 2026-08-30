import { action, atom, computed } from "@reatom/core";
import type { Chat, User } from "../types";
import { mockChats } from "../mocks/data";
import { userByIdAtom } from "./users";

export const chatsAtom = atom(mockChats, "chatsAtom");

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

export const selectChat = action((id: string) => {
  selectedChatIdAtom.set(id);
  chatsAtom.set(
    chatsAtom().map((c) => (c.id === id ? { ...c, unread: 0 } : c)),
  );
}, "selectChat");

export function chatTitle(chat: Chat, users: Record<string, User>): string {
  if (chat.title) return chat.title;
  const others = chat.participantIds
    .map((id) => users[id])
    .filter((u): u is User => Boolean(u));
  return others.length > 1
    ? `Чат (${others.length})`
    : (others[0]?.name ?? "Диалог");
}
