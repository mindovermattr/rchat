import { Avatar, Box, Group, Paper, ScrollArea, Stack, Text } from "@mantine/core";
import { useAtom } from "@reatom/react";
import DOMPurify from "dompurify";
import { useEffect, useRef } from "react";
import { chatInterlocutorsAtom, selectedChatAtom, selectedMessagesAtom } from "../../model";
import type { Message, User } from "../../types";
import { initials } from "../../utils";
import { MessageInput } from "../MessageInput";

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
    <Stack flex={1} h="100%" gap={0}>
      <ChatHeader interlocutors={interlocutors} />
      <Box
        flex={1}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: 0,
          overflow: "hidden",
        }}
      >
        <MessageList messages={messages} />
        <MessageInput />
      </Box>
    </Stack>
  );
}

function ChatHeader({ interlocutors }: { interlocutors: User[] }) {
  const title = interlocutors.length > 1 ? `Группа (${interlocutors.length})` : (interlocutors[0]?.name ?? "Диалог");
  const status = interlocutors[0]?.status;
  const statusLabel = status === "online" ? "в сети" : status === "away" ? "отошёл" : "не в сети";

  return (
    <Group h={60} px="md" style={{ borderBottom: "1px solid var(--mantine-color-default-border)" }}>
      <Avatar color="blue" radius="xl">
        {initials(title)}
      </Avatar>
      <Box>
        <Text fw={600}>{title}</Text>
        <Text size="xs" c="dimmed">
          {interlocutors.length > 1 ? interlocutors.map((u) => u.name).join(", ") : statusLabel}
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
    <ScrollArea flex={1} p="md" style={{ minHeight: 0 }} viewportRef={viewport}>
      <Stack gap="sm">
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} own={m.senderId === "u-me"} />
        ))}
      </Stack>
    </ScrollArea>
  );
}

function MessageBubble({ message, own }: { message: Message; own: boolean }) {
  const sanitizedHTML = DOMPurify.sanitize(message.html);
  const formattedTime = new Date(message.createdAt).toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Group justify={own ? "flex-end" : "flex-start"} wrap="nowrap" gap={"sm"}>
      {!own && (
        <Avatar size="sm" radius="xl" color="grape">
          {initials(message.senderId)}
        </Avatar>
      )}
      <Paper
        p="xs"
        radius="md"
        withBorder={!own}
        maw="70%"
        className="chat-message"
        bg={own ? "blue" : "white"}
        c={own ? "gray.2" : "black"}
        dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
      />
      <Text size="xs" c={own ? "blue.7" : "dimmed"} ta="right" mt={4}>
        {formattedTime}
        {own && message.status === "read" ? " · ✓✓" : ""}
      </Text>
    </Group>
  );
}
