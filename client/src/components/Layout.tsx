import { AppShell, Burger, Group, Text, ThemeIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconMessages } from "@tabler/icons-react";
import { Sidebar } from "./Sidebar";
import { Chat } from "./Chat";

export function Layout() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 320,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding={0}
    >
      <AppShell.Header>
        <Group h="100%" px="md" gap="sm">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <ThemeIcon variant="light" color="blue" radius="md">
            <IconMessages size={18} />
          </ThemeIcon>
          <Text fw={700} size="lg">
            Чат
          </Text>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="xs">
        <Sidebar />
      </AppShell.Navbar>

      <AppShell.Main>
        <Chat />
      </AppShell.Main>
    </AppShell>
  );
}
