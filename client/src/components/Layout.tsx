import {
  ActionIcon,
  AppShell,
  Burger,
  Flex,
  Group,
  Text,
  ThemeIcon,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconMessages, IconMoon, IconSun } from "@tabler/icons-react";
import { Chat } from "./Chat/Chat";
import { Sidebar } from "./Sidebar";

export function Layout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light");

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
        <Flex h="100%" px="md" gap="sm" justify="space-between" align="center">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <ThemeIcon variant="light" color="blue" radius="md">
              <IconMessages size={18} />
            </ThemeIcon>
            <Text fw={700} size="lg">
              Чат
            </Text>
          </Group>
          <ActionIcon
            onClick={() => setColorScheme(computedColorScheme === "light" ? "dark" : "light")}
            variant="subtle"
            size="lg"
            aria-label="Toggle color scheme"
          >
            <IconSun
              style={{ display: computedColorScheme === "dark" ? "block" : "none" }}
              size={20}
            />
            <IconMoon
              style={{ display: computedColorScheme === "light" ? "block" : "none" }}
              size={20}
            />
          </ActionIcon>
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar p="xs">
        <Sidebar />
      </AppShell.Navbar>

      <AppShell.Main style={{ height: "100dvh" }}>
        <Chat />
      </AppShell.Main>
    </AppShell>
  );
}
