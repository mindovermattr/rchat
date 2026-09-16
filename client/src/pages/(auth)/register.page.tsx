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

export const RegisterPage = reatomComponent(() => (
  <Center h="100vh">
    <Container w={"25%"} p={0}>
      <Paper radius="md" p="xl" withBorder shadow="md" style={{ width: "100%" }}>
        <Title order={2} ta="center" mb={5}>
          Create account
        </Title>
        <Text c="dimmed" size="sm" ta="center" mb={12}>
          Fill in the details to get started
        </Text>

        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Stack gap="md">
            <TextInput
              required
              label="Username"
              placeholder="Your username"
              size="md"
              radius="md"
            />

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

            <PasswordInput
              required
              label="Confirm password"
              placeholder="Repeat your password"
              size="md"
              radius="md"
            />

            <Button type="submit" fullWidth size="md" radius="md">
              Sign up
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
              Already have an account?{" "}
              <Anchor type="button" component="button" onClick={wrap(() => loginRoute.go())}>
                Sign in
              </Anchor>
            </Text>
          </Stack>
        </form>
      </Paper>
    </Container>
  </Center>
));
