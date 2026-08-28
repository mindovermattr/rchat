import type { Chat, Message, User } from "../types";

export const CURRENT_USER_ID = "u-me";

export const mockUsers: User[] = [
  { id: CURRENT_USER_ID, name: "Вы", avatarColor: "blue", status: "online" },
  { id: "u-anna", name: "Анна", avatarColor: "grape", status: "online" },
  { id: "u-bob", name: "Боб", avatarColor: "teal", status: "away" },
  { id: "u-carol", name: "Кэрол", avatarColor: "orange", status: "offline" },
  { id: "u-team", name: "Команда", avatarColor: "red", status: "online" },
];

const now = Date.now();
const min = 60 * 1000;

export const mockChats: Chat[] = [
  {
    id: "c-anna",
    participantIds: [CURRENT_USER_ID, "u-anna"],
    lastMessageText: "Привет! Как дела с планом?",
    lastMessageAt: now - 2 * min,
    unread: 2,
  },
  {
    id: "c-bob",
    participantIds: [CURRENT_USER_ID, "u-bob"],
    lastMessageText: "Ок, скинь когда будет готово",
    lastMessageAt: now - 35 * min,
    unread: 0,
  },
  {
    id: "c-carol",
    participantIds: [CURRENT_USER_ID, "u-carol"],
    lastMessageText: "Спасибо большое!",
    lastMessageAt: now - 5 * 60 * min,
    unread: 0,
  },
  {
    id: "c-team",
    participantIds: [CURRENT_USER_ID, "u-anna", "u-bob", "u-carol"],
    title: "Рабочая группа",
    lastMessageText: "Анна: обновил моки",
    lastMessageAt: now - 12 * 60 * min,
    unread: 5,
  },
];

export const mockMessages: Message[] = [
  {
    id: "m-1",
    chatId: "c-anna",
    senderId: "u-anna",
    html: "Привет! 👋",
    createdAt: now - 12 * min,
    status: "read",
  },
  {
    id: "m-2",
    chatId: "c-anna",
    senderId: CURRENT_USER_ID,
    html: "Привет! Сейчас соберу <b>план</b> по чату",
    createdAt: now - 10 * min,
    status: "read",
  },
  {
    id: "m-3",
    chatId: "c-anna",
    senderId: "u-anna",
    html: "Супер, жду. Можно с <i>сайдбаром</i> и списком диалогов?",
    createdAt: now - 4 * min,
    status: "read",
  },
  {
    id: "m-4",
    chatId: "c-anna",
    senderId: "u-anna",
    html: "И не забудь про <a href='https://mantine.dev'>Mantine</a>",
    createdAt: now - 2 * min,
    status: "sent",
  },
  {
    id: "m-5",
    chatId: "c-bob",
    senderId: CURRENT_USER_ID,
    html: "Боб, глянь <code>AppShell</code> из Mantine",
    createdAt: now - 40 * min,
    status: "read",
  },
  {
    id: "m-6",
    chatId: "c-bob",
    senderId: "u-bob",
    html: "Ок, скинь когда будет готово",
    createdAt: now - 35 * min,
    status: "read",
  },
  {
    id: "m-7",
    chatId: "c-carol",
    senderId: "u-carol",
    html: "Помогла с <b>моками</b>? Спасибо!",
    createdAt: now - 5 * 60 * min,
    status: "read",
  },
  {
    id: "m-8",
    chatId: "c-carol",
    senderId: CURRENT_USER_ID,
    html: "Всегда пожалуйста 😊",
    createdAt: now - 5 * 60 * min + 1 * min,
    status: "read",
  },
  {
    id: "m-9",
    chatId: "c-team",
    senderId: "u-bob",
    html: "Выкатил первую версию",
    createdAt: now - 14 * 60 * min,
    status: "read",
  },
  {
    id: "m-10",
    chatId: "c-team",
    senderId: "u-anna",
    html: "обновил моки",
    createdAt: now - 12 * 60 * min,
    status: "read",
  },
];
