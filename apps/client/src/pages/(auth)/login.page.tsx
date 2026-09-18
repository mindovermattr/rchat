import {
  Anchor,
  Button,
  Center,
  Container,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { wrap } from "@reatom/core";
import { reatomComponent } from "@reatom/react";
import { loginRoute } from "./login.route";
import { registerRoute } from "./register.route";

export const LoginPage = reatomComponent(() => {
  const loginForm = loginRoute.loader.data()?.loginForm;
  if (!loginForm) return <div>Loading login page...</div>;

  const { submit, fields } = loginForm;

  console.log(fields);
  return (
    <Center h="100vh">
      <Container w={"25%"} size={"md"} p={0}>
        <Paper radius="md" p="xl" withBorder shadow="md" style={{ width: "100%" }}>
          <Title order={2} ta="center" mb={5}>
            Welcome back!
          </Title>
          <Text c="dimmed" size="sm" ta="center" mb={12}>
            Enter your credentials to access your account
          </Text>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            <Stack gap="md">
              <TextInput
                required
                label="Email"
                placeholder="hello@example.com"
                size="md"
                radius="md"
              />

              <PasswordInput
                required
                label="Password"
                placeholder="Your password"
                size="md"
                radius="md"
              />

              <Group justify="space-between">
                <Anchor component="button" size="sm" onClick={() => {}}>
                  Forgot password?
                </Anchor>
              </Group>

              <Button type="submit" fullWidth size="md" radius="md">
                Sign in
              </Button>

              <Divider label="Or continue with" labelPosition="center" />

              <Group grow>
                <Button variant="default" size="md" radius="md">
                  Google
                </Button>
                <Button variant="default" size="md" radius="md">
                  GitHub
                </Button>
              </Group>

              <Text ta="center" size="sm" mt="md">
                Don't have an account?{" "}
                <Anchor type="button" component="button" onClick={wrap(() => registerRoute.go())}>
                  Create Account
                </Anchor>
              </Text>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Center>
  );
});
