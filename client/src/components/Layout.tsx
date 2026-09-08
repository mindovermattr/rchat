import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export function Layout({ children }: { children: React.ReactNode }) {
  const [opened] = useDisclosure();
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
      {children}
    </AppShell>
  );
}
