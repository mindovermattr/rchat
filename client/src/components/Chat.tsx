import {
  Avatar,
  Box,
  Group,
  Paper,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import { useEffect, useRef } from "react";
import {
  chatInterlocutorsAtom,
  selectedChatAtom,
  selectedMessagesAtom,
} from "../model";
import { useAtom } from "@reatom/react";
import { initials } from "../utils";
import type { Message, User } from "../types";
import { MessageInput } from "./MessageInput";

export function Chat() {
  const [chat] = useAtom(selectedChatAtom);
  const [messages] = useAtom(selectedMessagesAtom);
  const [interlocutors] = useAtom(chatInterlocutorsAtom);

  if (!chat) {
    return (
      <Box p="xl" style={{ textAlign: "center" }}>
        <Text c="dimmed">Выберите диалог слева, чтобы начать</Text>
      </Box>
    );
  }

  return (
    <Stack h="100%" gap={0}>
      <ChatHeader interlocutors={interlocutors} />
      <MessageList messages={messages} />
      <MessageInput />
    </Stack>
  );
}

function ChatHeader({ interlocutors }: { interlocutors: User[] }) {
  const title =
    interlocutors.length > 1
      ? `Группа (${interlocutors.length})`
      : interlocutors[0]?.name ?? "Диалог";
  const status = interlocutors[0]?.status;
  const statusLabel =
    status === "online"
      ? "в сети"
      : status === "away"
        ? "огашёл"
        : "не в сети";

  return (
    <Group
      h={60}
      px="md"
      style={{ borderBottom: "1px solid var(--mantine-color-default-border)" }}
    >
      <Avatar color="blue" radius="xl">
        {initials(title)}
      </Avatar>
      <Box>
        <Text fw={600}>{title}</Text>
        <Text size="xs" c="dimmed">
          {interlocutors.length > 1
            ? interlocutors.map((u) => u.name).join(", ")
            : statusLabel}
        </Text>
      </Box>
    </Group>
  );
}

function MessageList({ messages }: { messages: Message[] }) {
  const viewport = useRef<HTMLDivElement>(null);

  useEffect(() => {
    viewport.current?.scrollTo({ top: viewport.current.scrollHeight });
  }, [messages.length]);

  return (
    <ScrollArea flex={1} p="md" viewportRef={viewport}>
      <Stack gap="sm">
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} own={m.senderId === "u-me"} />
        ))}
      </Stack>
    </ScrollArea>
  );
}

function MessageBubble({
  message,
  own,
}: {
  message: Message;
  own: boolean;
}) {
  return (
    <Group
      justify={own ? "flex-end" : "flex-start"}
      wrap="nowrap"
      style={{ width: "100%" }}
    >
      {!own && (
        <Avatar size="sm" radius="xl" color="grape">
          {initials(message.senderId)}
        </Avatar>
      )}
      <Paper
        p="xs"
        radius="md"
        withBorder={!own}
        bg={own ? "blue" : undefined}
        c={own ? "white" : undefined}
        maw="70%"
      >
        <Box
          className="tiptap-content"
          dangerouslySetInnerHTML={{ __html: message.html }}
        />
        <Text
          size="xs"
          c={own ? "blue.1" : "dimmed"}
          ta="right"
          mt={4}
          style={{ opacity: 0.8 }}
        >
          {new Date(message.createdAt).toLocaleTimeString("ru-RU", {
            hour: "2-digit",
            minute: "2-digit",
          })}
          {own && message.status === "read" ? " · ✓✓" : ""}
        </Text>
      </Paper>
    </Group>
  );
}
