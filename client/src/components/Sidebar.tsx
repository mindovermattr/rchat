import { Avatar, Badge, Box, Group, ScrollArea, Stack, Text, TextInput } from "@mantine/core";
import { useAction, useAtom } from "@reatom/react";
import { IconSearch } from "@tabler/icons-react";
import { chatTitle, filteredChatsAtom, searchQueryAtom, selectChat, selectedChatIdAtom, userByIdAtom } from "../model";
import type { Chat } from "../types";
import { formatRelative, initials } from "../utils";

export function Sidebar() {
  const [chats] = useAtom(filteredChatsAtom);
  const [users] = useAtom(userByIdAtom);
  const [selectedId] = useAtom(selectedChatIdAtom);
  const [search] = useAtom(searchQueryAtom);
  const setSearch = useAction(searchQueryAtom.set);
  const handleSelect = useAction(selectChat);

  return (
    <Stack h="100%" gap={0}>
      <Box p="xs">
        <TextInput
          placeholder="Поиск диалогов"
          leftSection={<IconSearch size={16} />}
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
      </Box>
      <ScrollArea flex={1}>
        <Stack gap={2}>
          {chats.map((chat) => (
            <ConversationItem
              key={chat.id}
              chat={chat}
              title={chatTitle(chat, users)}
              selected={chat.id === selectedId}
              onClick={() => handleSelect(chat.id)}
            />
          ))}
          {chats.length === 0 && (
            <Text c="dimmed" size="sm" ta="center" py="md">
              Ничего не найдено
            </Text>
          )}
        </Stack>
      </ScrollArea>
    </Stack>
  );
}

function ConversationItem({ chat, title, selected, onClick }: { chat: Chat; title: string; selected: boolean; onClick: () => void }) {
  return (
    <Group
      wrap="nowrap"
      onClick={onClick}
      p="xs"
      style={{
        borderRadius: 8,
        cursor: "pointer",
        backgroundColor: selected ? "var(--mantine-color-blue-light)" : undefined,
      }}
    >
      <Avatar color={chat.participantIds.length > 2 ? "red" : "blue"} radius="xl">
        {initials(title)}
      </Avatar>
      <Box style={{ flex: 1, minWidth: 0 }}>
        <Group justify="space-between" wrap="nowrap">
          <Text fw={600} truncate>
            {title}
          </Text>
          <Text size="xs" c="dimmed" style={{ whiteSpace: "nowrap" }}>
            {formatRelative(chat.lastMessageAt)}
          </Text>
        </Group>
        <Group justify="space-between" wrap="nowrap" mt={2}>
          <Text size="sm" c="dimmed" truncate>
            {chat.lastMessageText}
          </Text>
          {chat.unread > 0 && (
            <Badge color="blue" circle size="sm">
              {chat.unread}
            </Badge>
          )}
        </Group>
      </Box>
    </Group>
  );
}
